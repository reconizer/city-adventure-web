<template lang="pug">
  .adventure-map-marker
    gmap-marker(
      :position="point.position"
      :clickable="true"
      :draggable="!loading"
      :label="label"
      :icon="marker"
      @click="scrollToPoint()"
      @drag="updatePosition($event.latLng)"
      @dragend="savePosition($event.latLng)"
    )
    gmap-circle(
      :center="point.position"
      :radius="point.radius"
      :options="circle"
    )
</template>

<script>
import { mapState } from 'vuex'

import VueScrollTo from 'vue-scrollto'

import defaultMarker from '@/assets/images/marker_default.png'
import hiddenMarker from '@/assets/images/marker_hidden.png'
import startMarker from '@/assets/images/marker_start.png'

import { UPDATE_POINT } from '@/store/action-types'

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
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      loading: state => state.adventure.loading
    }),
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
    }
  },
  methods: {
    scrollToPoint () {
      let id = `#point-${this.point.id}`;

      VueScrollTo.scrollTo(id, 500, {
        container: '.adventure-structure'
      });
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
        parent_id: this.point.parent_id,
        position: this.point.position,
        radius: this.point.radius,
        hidden: this.point.hidden,
        clues: this.point.clues,
        answers: this.point.answers
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
