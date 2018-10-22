<template lang="pug">
  .google-map-wrapper
    span {{ pointMarker(0) }}
    gmap-map(class="adventure-map" :center="center", :zoom="12")
      gmap-marker(
        :key="point.id"
        v-for="(point, index) in points"
        :position="point.position"
        :draggable="!loading"
        :clickable="!loading"
        :label="pointLabel(index)"
        :icon="pointMarker(index)"
        @click="center=point.position"
        @dragend="updatePointPosition(point, $event.latLng)"
      )
</template>

<script>
import { mapState } from 'vuex'

import defaultMarker from '@/assets/images/marker_default.png'
import startMarker from '@/assets/images/marker_start.png'

export default {
  name: "AdventureMap",
  data() {
    return {
      center: { lat: 0, lng: 0 },
    };
  },
  computed: mapState({
    points: state => state.adventures.points,

    loading: state => state.adventures.loading
  }),
  mounted () {
    this.geolocate();
  },
  methods: {
    pointLabel (index) {
      if(index == 0) {
        return {
					text: 'S',
          color: 'white'
				};
      }

			return {
				text: index + '',
				color: 'white'
			};
    },
    pointMarker (index) {
      let img = {
        size: { width: 45, height: 45 },
        origin: { x: 0, y: 0 },
        anchor: { x: 22, y: 22 }
      }
      if(index == 0) {
        img.url = startMarker;
      } else {
        img.url = defaultMarker;
      }

      return img;
    },
    geolocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    updatePointPosition (point, latLng) {
      console.log(point);
      console.log(latLng);
    }
  }
}
</script>
