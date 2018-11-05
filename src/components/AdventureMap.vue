<template lang="pug">
  .google-map-wrapper
    gmap-map(
      class="adventure-map"
      :center="center",
      :zoom="zoom"
      :options="options"
      @click="closeWindows"
      @rightclick="pointDialog"
      ref="googleMap"
    )
      gmap-info-window(
        :position="addPointWindowPosition"
        :opened="addPointWindowOpened"
        @closeclick="closeAddPointWindow"
      )
        a.map-window-option(@click="createPointFromDialog") Create new Puzzle

      gmap-info-window(
        :position="pointOptionsWindowPosition"
        :opened="pointOptionsWindowOpened"
        @closeclick="closePointOptionsWindow"
      )
        a.map-window-option(@click="editPointFromDialog") Edit Puzzle
        a.map-window-option(@click="removePointFromDialog") Remove Puzzle

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

</template>

<script>
import { mapState } from 'vuex';

import { CREATE_POINT, DESTROY_POINT } from '@/store/action-types';

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
      mapLoaded: false,

      addPointWindowPosition: { lat: 0, lng: 0 },
      addPointWindowOpened: false,

      pointOptionsWindowPosition: { lat: 0, lng: 0 },
      pointOptionsWindowOpened: false,
      currentPoint: null
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

    this.$root.$on('right-click-marker', (point) => {
      this.pointOptionsWindowOpened = true;

      this.currentPoint = point;

      this.pointOptionsWindowPosition = point.position;
    });

    this.$refs.googleMap.$mapPromise.then(() => {
      this.mapLoaded = true;
    });
  },
  methods: {
    centerCamera ( { lat, lng }) {
      this.center = { lat, lng };

      this.$refs.googleMap.$mapObject.setCenter(this.center);
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
    },

    removePointFromDialog () {
      if(!this.currentPoint) {
        return;
      }

      this.pointOptionsWindowOpened = false;

      if(confirm("Are you sure you want to remove this puzzle? It will also remove all clues attached to it")) {
        this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_POINT}`, { pointId: this.currentPoint.id });
      }
    },

    editPointFromDialog () {
      if(!this.currentPoint) {
        return;
      }

      this.$router.push({ name: 'adventurePoint', params: { adventureId: this.adventure.id, pointId: this.currentPoint.id } });

      this.pointOptionsWindowOpened = false;
    },

    pointDialog (evt) {
      this.addPointWindowOpened = true;

      this.addPointWindowPosition = {
        lat: evt.latLng.lat(),
        lng: evt.latLng.lng()
      };
    },

    closeAddPointWindow () {
      this.addPointWindowOpened = false;
    },

    closePointOptionsWindow () {
      this.pointOptionsWindowOpened = false;
    },

    closeWindows () {
      this.addPointWindowOpened = this.pointOptionsWindowOpened = false;
    },

    createPointFromDialog () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_POINT}`, {
        adventureId: this.adventure.id,
        parentId: this.points[this.points.length - 1].id,
        lat: this.addPointWindowPosition.lat,
        lng: this.addPointWindowPosition.lng
      });

      this.addPointWindowOpened = false;
    }
  }
}
</script>
