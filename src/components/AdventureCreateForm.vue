<template lang="pug">
  .new-adventure-form
    .new-adventure-form__contents
      .new-adventure-form__header
        router-link.button.button--icon(:to="{ name: 'home' }")
          .icon.icon--back

        .new-adventure-form__title {{ $t("adventures.create_new_adventure") }}

      .form-control
        label.form-label.form-label--required {{ $t("general.name") }}
        input.form-input(type="text" :placeholder="$t('general.name')" v-model="adventure.name")

      .form-control
        a.button.button--blue.button--full(@click="submit") {{ $t("general.submit") }}

    gmap-map(
      class="new-adventure-form__map"
      :center="center",
      :zoom="zoom",
      :options="options"
      @click="closeDialog"
      @rightclick="startingPointDialog"
      ref="googleMap"
    )
      gmap-info-window(
        :position="dialogPosition"
        :opened="addPointOpened"
        @closeclick="closeDialog"
      )
        a.map-window-option(@click="createPoint") {{ $t("adventures.set_starting_point") }}

      gmap-info-window(
        :position="dialogPosition"
        :opened="movePointOpened"
        @closeclick="closeDialog"
      )
        a.map-window-option(@click="movePoint") {{ $t("adventures.move_starting_point") }}

      gmap-marker(
        v-if="startingPointSet"
        :position="startingPointPosition"
        :draggable="true"
        :label="label"
        :icon="marker"
        @drag="updatePosition($event.latLng)"
        @dragend="updatePosition($event.latLng)"
      )

    .google-map-controls
      .google-map-controls__item
        gmap-autocomplete(
          class="form-input form-input--google"
          :placeholder="$t('adventures.set_place')"
          @place_changed="setPlace"
        )

      .google-map-controls__item
        .button.button--blue(
          @click="showHelpModal"
        )
          .icon.icon--question-mark-white.icon--pad-right
          span {{ $t("adventure.help") }}

    Modal(v-if="showHelp" @close="closeHelpModal")
      div(slot="header") {{ $t("adventures.new_adventure_help_header") }}

      p {{ $t("adventures.new_adventure_help_content_1") }}

      p {{ $t("adventures.new_adventure_help_content_2") }}

      .text-center
        a.button.button--blue(@click="closeHelpModal") {{ $t("adventures.new_adventure_help_confirm") }}
</template>

<script>
import { mapState } from 'vuex'

import startMarker from '@/assets/images/marker_start.png'

import { CREATE_ADVENTURE } from '@/store/action-types'

import Modal from '@/components/Modal.vue'

const ACTION_NAMESPACE = 'adventures';

export default {
  name: 'AdventureCreateForm',
  components: {
    Modal,
  },
  data () {
    return {
      adventure: {
        name: null,
      },
      zoom: 17,
      center: { lat: 0, lng: 0 },

      startingPointPosition: { lat: 0, lng: 0 },
      startingPointSet: false,

      dialogPosition: { lat: 0, lng: 0 },
      addPointOpened: false,
      movePointOpened: false,

      showHelp: false
    }
  },
  computed: {
    options () {
      return {
        fullscreenControl: false,
        rotateControl: false,
        streetViewControl: false
      }
    },
    label () {
      return {
        text: 'S',
        color: 'white'
      };
    },
    marker () {
      return {
        size: { width: 30, height: 30 },
        origin: { x: 0, y: 0 },
        anchor: { x: 15, y: 15 },
        url: startMarker
      };
    },
    ...mapState({
      loading: state => state.adventures.loading,
      error: state => state.adventures.error
    })
  },
  mounted () {
    this.geolocate();

    let mapHelpShown = localStorage.getItem('createAdventureMapHelpShown');

    if(!mapHelpShown) {
      this.showHelpModal();
    }
  },
  methods: {
    closeDialog () {
      this.addPointOpened = false;
      this.movePointOpened = false;
    },
    geolocate () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    setPlace (place) {
      this.center = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      if(this.$refs.googleMap) {
        this.$refs.googleMap.$mapObject.setCenter(this.center);
      }
    },

    startingPointDialog (evt) {
      if(this.startingPointSet) {
        this.movePointOpened = true;
      } else {
        this.addPointOpened = true;
      }

      this.dialogPosition = {
        lat: evt.latLng.lat(),
        lng: evt.latLng.lng()
      };
    },

    updatePosition (latLng) {
      this.dialogPosition = {
        lat: latLng.lat(),
        lng: latLng.lng()
      };
    },

    createPoint () {
      this.startingPointSet = true;
      this.closeDialog();

      this.startingPointPosition = Object.assign({}, this.dialogPosition);
    },

    movePoint () {
      this.closeDialog();

      this.startingPointPosition = Object.assign({}, this.dialogPosition);
    },

    submit () {
      //TODO form validation
      if(!this.startingPointSet) {
        return;
      }

      let params = {
        adventure: this.adventure,
        startingPointPosition: this.startingPointPosition
      };

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_ADVENTURE}`, { params }).then((response) => {
        this.$router.push({
          name: 'adventureMap',
          params: {
            adventureId: response.data.id
          }
        });
      });
    },

    showHelpModal () {
      this.showHelp = true;
    },

    closeHelpModal () {
      this.showHelp = false;

      localStorage.setItem('createAdventureMapHelpShown', true);
    }
  }
}
</script>
