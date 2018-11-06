<template lang="pug">
  .adventure-map-marker
    gmap-marker(
      :position="point.position"
      :clickable="true"
      :draggable="!loading"
      :label="label"
      :icon="marker"
      :zIndex="1"
      @click="scrollToPoint()"
      @rightclick="openOptions()"
      @drag="updatePosition($event.latLng)"
      @dragend="savePosition($event.latLng)"
    )
    gmap-circle(
      :center="point.position"
      :radius="point.radius"
      :options="circle"
      @mouseover="setEditable(true)"
      @mouseout="setEditable(false)"
      ref="circle"
    )

    // Drag resize controls for point radius
    div(v-if="circleEditable")
      gmap-marker(
        :position="top"
        :draggable="!loading"
        :icon="dragMarker(6, 2)"
        @drag="updateRadius($event.latLng)"
        @dragend="saveRadius($event.latLng)"
      )

      gmap-marker(
        :position="bottom"
        :draggable="!loading"
        :icon="dragMarker(6, 10)"
        @drag="updateRadius($event.latLng)"
        @dragend="saveRadius($event.latLng)"
      )

      gmap-marker(
        :position="left"
        :draggable="!loading"
        :icon="dragMarker(2, 6)"
        @drag="updateRadius($event.latLng)"
        @dragend="saveRadius($event.latLng)"
      )

      gmap-marker(
        :position="right"
        :draggable="!loading"
        :icon="dragMarker(10, 6)"
        @drag="updateRadius($event.latLng)"
        @dragend="saveRadius($event.latLng)"
      )
</template>

<script>
import { mapState } from 'vuex'

import VueScrollTo from 'vue-scrollto'

import defaultMarker from '@/assets/images/marker_default.png'
import hiddenMarker from '@/assets/images/marker_hidden.png'
import startMarker from '@/assets/images/marker_start.png'
import dragControlMarker from '@/assets/images/marker_drag_control.png'

import { UPDATE_POINT } from '@/store/action-types'

import { gmapApi } from 'vue2-google-maps'

import { RADIUS_CONSTRAINTS } from '@/config'

const ACTION_NAMESPACE = 'adventure';

export default {
  name: "AdventureMapPoint",
  props: {
    point: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      circleEditable: false
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      loading: state => state.adventure.loading
    }),
    google: gmapApi,
    label () {
      if(this.index == 0) {
        return {
          text: 'S',
          color: 'white'
        };
      } else {
        return {
          text: this.index + '',
          color: 'white'
        };
      }
    },
    marker () {
      let img = {
        size: { width: 30, height: 30 },
        origin: { x: 0, y: 0 },
        anchor: { x: 15, y: 15 }
      }
      if(this.index == 0) {
        img.url = startMarker;
      } else {
        if(this.point.hidden) {
          img.url = hiddenMarker;
        } else {
          img.url = defaultMarker;
        }
      }

      return img;
    },

    circle () {
      if(this.index == 0) {
        return {
          strokeWeight: 0,
          fillOpacity: 0.6,
          fillColor: "#FF94BB"
        };
      } else {
        return {
          strokeWeight: 0,
          fillOpacity: 0.6,
          fillColor: "#5E81FF"
        };
      }
    },

    circleObject () {
      if(this.$refs.circle) {
        return this.$refs.circle.$circleObject;
      }
    },

    top () {
      let latLng = {
        lat: this.point.position.lat,
        lng: this.point.position.lng
      };

      if(this.circleObject) {
        latLng.lat = this.circleObject.getBounds().getNorthEast().lat();
      }

      return latLng;
    },

    bottom () {
      let latLng = {
        lat: this.point.position.lat,
        lng: this.point.position.lng
      };

      if(this.circleObject) {
        latLng.lat = this.circleObject.getBounds().getSouthWest().lat();
      }

      return latLng;
    },

    left () {
      let latLng = {
        lat: this.point.position.lat,
        lng: this.point.position.lng
      };

      latLng.lng = this.circleObject.getBounds().getSouthWest().lng();

      return latLng;
    },

    right () {
      let latLng = {
        lat: this.point.position.lat,
        lng: this.point.position.lng
      };

      latLng.lng = this.circleObject.getBounds().getNorthEast().lng();

      return latLng;
    }
  },
  methods: {
    dragMarker (xOffset, yOffset) {
      return {
        size: { width: 12, height: 12 },
        origin: { x: 0, y: 0 },
        anchor: { x: xOffset, y: yOffset },
        url: dragControlMarker
      };
    },

    setEditable (value) {
      if(value && this.$refs.circle) {
        if(this.$refs.circle.$map.zoom < 17) { // do not show controls on more zoomed out camera when hovering
          value = false;
        }
      }

      this.circleEditable = value;
    },

    scrollToPoint () {
      let id = `#point-${this.point.id}`;

      VueScrollTo.scrollTo(id, 500, {
        container: '.adventure-structure'
      });
    },
    openOptions () {
      if(this.index == 0) {
        return;
      }

      this.$root.$emit('right-click-marker', this.point);
    },

    updatePosition (latLng) {
      this.point.position = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };
    },
    savePosition (latLng) {
      this.updatePosition(latLng);

      let params = {
        position: this.point.position
      };

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_POINT}`, {
        adventureId: this.adventure.id,
        pointId: this.point.id,
        params: params
      })
    },

    updateRadius (latLng) {
      let lat = this.point.position.lat;
      let lng = this.point.position.lng;

      let center = {
        lat () { return lat },
        lng () { return lng }
      };

      let distance = this.google.maps.geometry.spherical.computeDistanceBetween(center, latLng);

      if(distance < RADIUS_CONSTRAINTS.MIN) {
        distance = RADIUS_CONSTRAINTS.MIN;
      }

      if(distance > RADIUS_CONSTRAINTS.MAX) {
        distance = RADIUS_CONSTRAINTS.MAX;
      }

      distance = Math.round(distance);

      this.point.radius = distance;
    },

    saveRadius (latLng) {
      this.updateRadius(latLng);

      let params = {
        radius: this.point.radius
      };

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_POINT}`, {
        adventureId: this.adventure.id,
        pointId: this.point.id,
        params: params
      })
    }
  }
}
</script>
