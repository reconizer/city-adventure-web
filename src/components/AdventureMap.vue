<template lang="pug">
  .google-map-wrapper
    gmap-map(
      class="adventure-map"
      :center="center",
      :zoom="15"
      :options="options"
    )
      AdventureMapPoint(
        :key="point.id"
        v-for="(point, index) in points"
        :point="point"
        :index="index"
      )
</template>

<script>
import { mapState } from 'vuex'

import AdventureMapPoint from '@/components/AdventureMapPoint.vue'

export default {
  name: "AdventureMap",
  components: {
    AdventureMapPoint
  },
  data() {
    return {
      center: { lat: 0, lng: 0 },
    };
  },
  computed: {
    ...mapState({
      points: state => state.adventure.points,

      loading: state => state.adventure.loading
    }),
    options () {
      return {
        fullscreenControl: false,
        rotateControl: false,
        streetViewControl: false
      }
    }
  },
  mounted () {
    this.geolocate();

    this.$root.$on('center-camera', (position) => {
      this.centerCamera(position);
    });
  },
  methods: {
    centerCamera ( {lat, lng }) {
      this.center = { lat, lng };
    },
    geolocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.centerCamera({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }
}
</script>
