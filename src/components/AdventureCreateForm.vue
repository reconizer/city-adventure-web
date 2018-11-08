<template lang="pug">
  .new-adventure-form
    .new-adventure-form__contents
      .new-adventure-form__header
        router-link.icon.icon--back.icon--pad-right.adventure-panel__back(:to="{ name: 'home' }")
        span Create New Adventure

      .form-control
        label.form-label.form-label--required Name
        input.form-input(type="text" placeholder="Name" v-model="adventure.name")

      .form-control
        label.form-label Description
        textarea.form-input(type="text" placeholder="Name" v-model="adventure.description")

      .form-control
        a.button.button--blue.button--full(@click="submit") Submit

    .new-adventure-form__map-controls
      .row
        .col-1
          gmap-autocomplete(
            class="form-input"
            @place_changed="setPlace"
          )

    gmap-map(
      class="new-adventure-form__map"
      :center="center",
      :zoom="zoom",
      :options="options"
      @click="closeDialog"
      @rightclick="startingPointDialog"
    )
      gmap-info-window(
        :position="dialogPosition"
        :opened="addPointOpened"
        @closeclick="closeDialog"
      )
        a.map-window-option(@click="createPoint") Set starting point here

      gmap-info-window(
        :position="dialogPosition"
        :opened="movePointOpened"
        @closeclick="closeDialog"
      )
        a.map-window-option(@click="movePoint") Move starting point here

      gmap-marker(
        v-if="startingPointSet"
        :position="startingPointPosition"
        :draggable="true"
        :label="label"
        :icon="marker"
        @drag="updatePosition($event.latLng)"
        @dragend="updatePosition($event.latLng)"
      )
</template>

<script>
import { mapState } from 'vuex'

import startMarker from '@/assets/images/marker_start.png'

import { CREATE_ADVENTURE } from '@/store/action-types'

const ACTION_NAMESPACE = 'adventures';

export default {
  name: 'AdventureCreateForm',
  data () {
    return {
      adventure: {
        name: null,
        description: null,
      },
      zoom: 17,
      center: { lat: 0, lng: 0 },

      startingPointPosition: { lat: 0, lng: 0 },
      startingPointSet: false,

      dialogPosition: { lat: 0, lng: 0 },
      addPointOpened: false,
      movePointOpened: false
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

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_ADVENTURE}`, { params });
    }
  }
}
</script>
