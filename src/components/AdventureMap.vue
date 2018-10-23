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
    points: state => state.adventures.points,

    loading: state => state.adventures.loading
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
  },
  methods: {
    geolocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
}
</script>
