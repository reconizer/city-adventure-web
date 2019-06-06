<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="point.id")
      .adventure-panel__header
        router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--back

        .adventure-panel__title {{ formTitle }}

        button.button.button--pink.adventure-panel__remove(v-if="puzzleIndex > 0 && editable" @click="destroyPuzzle()") {{ $t("general.remove") }}

      .row(v-if="puzzleIndex == 0")
        .col-1-2
          AdventurePointFormLocation(
            :point="point"
            :pointHideable="false"
          )

      .row(v-else)
        .col-1-2
          AdventurePointFormPassword(
            :passwordAnswer="point.password_answer"
            :passwordRequired="passwordRequired"
            @toggle-password="togglePasswordRequired"
          )

        .col-1-2
          AdventurePointFormLocation(
            :point="point"
            :pointHideable="true"
          )

        .col-1
          AdventurePointFormTimeConstraint(
            :timeAnswer="point.time_answer"
            :timeConstraint="timeConstraint"
            @toggle-time-constraint="toggleTimeConstraint"
          )

      .form-control-separator(v-if="editable")
      .row(v-if="editable")
        .col-1-2
          .form-control
            button.button.button--blue.button--large.button--full(@click="submit") {{ $t("general.submit") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { UPDATE_POINT, DESTROY_POINT } from '@/store/action-types'

import { TIME_CONSTRAINT_OPTIONS } from '@/config'

import cloneDeep from 'lodash.clonedeep'

import AdventurePointFormPassword from '@/components/shared/AdventurePointFormPassword.vue'
import AdventurePointFormTimeConstraint from '@/components/shared/AdventurePointFormTimeConstraint.vue'
import AdventurePointFormLocation from '@/components/shared/AdventurePointFormLocation.vue'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventurePointForm',
  components: {
    AdventurePointFormPassword,
    AdventurePointFormTimeConstraint,
    AdventurePointFormLocation
  },
  data () {
    return {
      pointData: {
        id: null,
        radius: null,
        shown: true,
        time_answer: null,
        password_answer: null,
        position: null
      },
      timeConstraint: false,
      passwordRequired: false
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),

    ...mapGetters('adventure', {
      editable: 'editable'
    }),

    puzzleIndex () {
      return this.$store.state.adventure.points.findIndex(point => point.id == this.$route.params.pointId);
    },
    point () {
      let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

      if(point && !this.pointData.id) {
        //eslint-disable-next-line
        this.pointData = cloneDeep(point);

        //eslint-disable-next-line
        this.passwordRequired = this.pointData.password_answer != null;

        //eslint-disable-next-line
        this.timeConstraint = this.pointData.time_answer != null;
      }

      return this.pointData;
    },
    formTitle () {
      if(this.puzzleIndex == 0) {
        if(!this.editable) {
          return this.$t("adventure_point.start_title");
        } else {
          return this.$t("adventure_point.edit_start_title");
        }
      } else {
        if(!this.editable) {
          return this.$t("adventure_point.title", { index: this.puzzleIndex });
        } else {
          return this.$t("adventure_point.edit_title", { index: this.puzzleIndex });
        }
      }
    }
  },
  mounted () {
    if(this.adventure.id && !this.loading) {
      if(!this.point.id) {
        this.$router.push({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
      }
    }
  },
  methods: {
    togglePasswordRequired () {
      if(!this.editable) {
        return;
      }

      this.passwordRequired = !this.passwordRequired;

      let answer = this.point.password_answer;

      if(!answer) {
        this.point.password_answer = { type: 'text', password: "" };
      }
    },
    
    toggleTimeConstraint () {
      if(!this.editable) {
        return;
      }

      this.timeConstraint = !this.timeConstraint;

      let answer = this.point.time_answer;

      if(!answer) {
        this.point.time_answer = { start_time: 0, duration: TIME_CONSTRAINT_OPTIONS.INTERVAL };
      }
    },

    destroyPuzzle () {
      // Handle point removing in Adventure component
      this.$root.$emit('remove-point', this.pointData);
    },

    submit () {
      //TODO validate form
      let params = cloneDeep(this.pointData);

      if(!this.passwordRequired) {
        params.password_answer = null;
      }

      if(!this.timeConstraint) {
        params.time_answer = null;
      }

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_POINT}`, {
        adventureId: this.adventure.id,
        pointId: this.point.id,
        params: params
      })
    }
  }
}
</script>
