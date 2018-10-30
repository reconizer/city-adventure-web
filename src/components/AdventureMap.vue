<template lang="pug">
  .google-map-wrapper
    gmap-map(
      class="adventure-map"
      :center="center",
      :zoom="zoom"
      :options="options"
      ref="googleMap"
    )
      AdventureMapPoint(
        :key="point.id"
        v-for="(point, index) in points"
        :point="point"
        :index="index"
      )

    .google-map-controls(v-if="mapLoaded")
      .google-map-controls__item
        .button.button--blue(
          @click="locatePoints()"
        )
          .icon.icon--reposition.icon--pad-right
          span Reposition

      .google-map-controls__item
        .button.button--blue(
          @click="createPoint()"
        )
          .icon.icon--add-white.icon--pad-right
          span Add new puzzle

</template>

<script>
import { mapState } from 'vuex';

import { CREATE_POINT } from '@/store/action-types';

import AdventureMapPoint from '@/components/AdventureMapPoint.vue';

const ACTION_NAMESPACE = 'adventure';

export default {
  name: "AdventureMap",
  components: {
    AdventureMapPoint
  },
  data() {
    return {
      center: { lat: 0, lng: 0 },
      zoom: 17,
      mapLoaded: false
    };
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      points: state => state.adventure.points,

      loading: state => state.adventure.loading
    }),
    options () {
      return {
        fullscreenControl: false,
        rotateControl: false,
        streetViewControl: false
      }
    },
    newPointLabel () {
      return {
        text: this.points.length + '',
        color: 'white'
      };
    }
  },
  mounted () {
    this.geolocate();

    this.$root.$on('center-camera', (position) => {
      this.centerCamera(position);
    });

    this.$root.$on('add-new-point', () => {
      this.createPoint()
    });

    this.$refs.googleMap.$mapPromise.then((map) => {
      this.mapLoaded = true;
    });
  },
  methods: {
    centerCamera ( { lat, lng }) {
      this.center = { lat, lng };
    },
    geolocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.centerCamera({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    },
    locatePoints () {
      if(this.points.length == 0)
        return;

      let bounds = this.$refs.googleMap.$mapObject.getBounds();

      this.points.forEach( (point) => {
        bounds.extend(point.position);
      });

      this.$refs.googleMap.fitBounds(bounds, 0);
    },
    createPoint () {
      let center = this.$refs.googleMap.$mapObject.center;

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_POINT}`, {
        adventureId: this.adventure.id,
        parentId: this.points[this.points.length - 1].id,
        lat: center.lat(),
        lng: center.lng()
      });
    }
  }
}
</script>
