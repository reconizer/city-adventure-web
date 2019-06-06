<template lang="pug">
  .google-map-wrapper.adventure-edit-map
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
        a.map-window-option(@click="createPointFromDialog") {{ $t("adventure.add_new_puzzle") }}

      gmap-info-window(
        :position="pointOptionsWindowPosition"
        :opened="pointOptionsWindowOpened"
        @closeclick="closePointOptionsWindow"
      )
        a.map-window-option(@click="editPointFromDialog")
          span(v-if="!editable") {{ $t("adventure.puzzle_details") }}
          span(v-else) {{ $t("adventure.edit_puzzle") }}
        a.map-window-option(v-if="editable" @click="removePointFromDialog") {{ $t("adventure.remove_puzzle") }}

      AdventureMapPoint(
        :key="point.id"
        v-for="(point, index) in points"
        :point="point"
        :index="index"
        :showCircle="showCircles"
      )

    .google-map-controls(v-if="mapLoaded")
      .google-map-controls__item
        gmap-autocomplete(
          class="form-input form-input--google"
          :placeholder="$t('adventures.set_place')"
          @place_changed="setPlace"
        )

      .google-map-controls__item
        .button.button--blue(
          @click="locatePoints()"
        )
          .icon.icon--reposition.icon--pad-right
          span {{ $t("adventure.reposition") }}

      .google-map-controls__item
        .button.button--blue(
          @click="showHelpModal"
        )
          .icon.icon--question-mark-white.icon--pad-right
          span {{ $t("adventure.help") }}

      .google-map-controls__radius
        .button.button--blue(
          @click="togglePointsRadius"
        )
          span {{ $t("adventure.show_radiuses") }}
          .form-checkbox.form-checkbox--small.form-checkbox--pad-left(
            :class="{ 'form-checkbox--active': showCircles }"
          )
            .form-checkbox__toggle

    Modal(v-if="showHelp" @close="closeHelpModal")
      div(slot="header") {{ $t("adventure.help_header") }}

      p {{ $t("adventure.help_paragraph_1") }}

      p {{ $t("adventure.help_paragraph_2") }}

      p {{ $t("adventure.help_paragraph_3") }}

      p {{ $t("adventure.help_paragraph_4") }}

      .text-center(slot="footer")
        button.button.button--blue(@click="closeHelpModal") {{ $t("adventure.help_confirm") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import { CREATE_POINT, DESTROY_POINT } from '@/store/action-types';

import Modal from '@/components/shared/Modal.vue'
import AdventureMapPoint from '@/components/shared/AdventureMapPoint.vue';

const ACTION_NAMESPACE = 'adventure';

export default {
  name: "AdventureMap",
  components: {
    AdventureMapPoint,
    Modal
  },
  data() {
    return {
      center: { lat: 0, lng: 0 },
      zoom: 16,
      mapLoaded: false,

      addPointWindowPosition: { lat: 0, lng: 0 },
      addPointWindowOpened: false,

      pointOptionsWindowPosition: { lat: 0, lng: 0 },
      pointOptionsWindowOpened: false,
      currentPoint: null,

      showHelp: false,
      showCircles: true
    };
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      points: state => state.adventure.points,

      loading: state => state.adventure.loading
    }),
    ...mapGetters('adventure', {
      editable: 'editable'
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

    // Clear map info window for this point if any are present
    this.$root.$on('point-removed', (pointId) => {
      if(this.currentPoint && this.currentPoint.id == pointId) {
        this.pointOptionsWindowOpened = false;
      }
    });

    this.$root.$on('right-click-marker', (point) => {
      this.pointOptionsWindowOpened = true;
      this.addPointWindowOpened = false;

      this.currentPoint = point;

      this.pointOptionsWindowPosition = point.position;
    });

    this.$root.$on('marker-interaction', () => {
      this.closeWindows();
    });

    this.$refs.googleMap.$mapPromise.then(() => {
      this.mapLoaded = true;

      let mapHelpShown = localStorage.getItem('mapHelpShown');

      if(!mapHelpShown) {
        this.showHelpModal();
      }
    });

  },
  methods: {
    centerCamera ({ lat, lng }) {
      this.center = { lat, lng };

      if(this.$refs.googleMap && this.mapLoaded) {
        this.$refs.googleMap.$mapObject.setCenter(this.center);
      }
    },

    setPlace (place) {
      this.centerCamera({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    },

    geolocate () {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.centerCamera({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        failure => {
          this.centerCamera({
            lat: this.points[0].position.lat,
            lng: this.points[0].position.lng
          });
        }
      );
    },

    togglePointsRadius () {
      this.showCircles = !this.showCircles;
    },

    locatePoints () {
      if(this.points.length == 0)
        return;

      if(this.$refs.googleMap && this.mapLoaded) {
        let bounds = this.$refs.googleMap.$mapObject.getBounds();

        this.points.forEach( (point) => {
          bounds.extend(point.position);
        });

        this.$refs.googleMap.fitBounds(bounds, 0);
      }
    },

    createPoint () {
      let center = this.$refs.googleMap.$mapObject.center;

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_POINT}`, {
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

      this.$root.$emit('remove-point', this.currentPoint);
    },

    editPointFromDialog () {
      if(!this.currentPoint) {
        return;
      }

      this.$router.push({ name: 'adventurePoint', params: { adventureId: this.adventure.id, pointId: this.currentPoint.id } });

      this.pointOptionsWindowOpened = false;
    },

    pointDialog (evt) {
      if(!this.editable) {
        return;
      }

      this.addPointWindowOpened = true;
      this.pointOptionsWindowOpened = false;

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
        parentId: this.points[this.points.length - 1].id,
        lat: this.addPointWindowPosition.lat,
        lng: this.addPointWindowPosition.lng
      });

      this.addPointWindowOpened = false;
    },

    showHelpModal () {
      this.showHelp = true;
    },

    closeHelpModal () {
      this.showHelp = false;

      localStorage.setItem('mapHelpShown', true);
    }
  }
}
</script>
