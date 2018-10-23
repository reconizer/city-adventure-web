<template lang="pug">
  .adventure-map-marker
    gmap-marker(
      :position="point.position"
      :draggable="!loading"
      :clickable="!loading"
      :label="label"
      :icon="marker"
      @click="center=point.position"
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

import defaultMarker from '@/assets/images/marker_default.png'
import startMarker from '@/assets/images/marker_start.png'

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
      loading: state => state.adventures.loading
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
        img.url = defaultMarker;
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
    updatePosition (latLng) {
      this.point.position = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };
    },
    savePosition (latLng) {
      this.updatePosition(latLng);

      //TODO save point
    }
  }
}
</script>
