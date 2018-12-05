<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="point.id")
      .adventure-panel__header
        router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--back

        .adventure-panel__title {{ formTitle }}

        a.button.button--pink.adventure-panel__remove(v-if="puzzleIndex > 0 && !adventure.published" @click="destroyPuzzle()") {{ $t("general.remove") }}

      .row(v-if="puzzleIndex == 0")
        .col-1-2
          AdventurePointFormLocation(
            :point="point"
            :pointHideable="false"
          )

      .row(v-else)
        .col-1-2
          AdventurePointFormPassword(
            :passwordAnswer="passwordAnswer"
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
            :timeAnswer="timeAnswer"
            :timeConstraint="timeConstraint"
            @toggle-time-constraint="toggleTimeConstraint"
          )

      .form-control-separator(v-if="!adventure.published")
      .row(v-if="!adventure.published")
        .col-1-2
          .form-control
            a.button.button--blue.button--large.button--full(@click="submit") {{ $t("general.submit") }}
</template>

<script>
import { mapState } from 'vuex'

import { UPDATE_POINT, DESTROY_POINT } from '@/store/action-types'

import { TIME_CONSTRAINT_OPTIONS } from '@/config'

import cloneDeep from 'lodash.clonedeep'

import AdventurePointFormPassword from '@/components/AdventurePointFormPassword.vue'
import AdventurePointFormTimeConstraint from '@/components/AdventurePointFormTimeConstraint.vue'
import AdventurePointFormLocation from '@/components/AdventurePointFormLocation.vue'

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
        hidden: false,
        answers: []
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

    passwordAnswer () {
      return this.point.answers.find(answer => answer.type == 'password') || null;
    },
    timeAnswer () {
      return this.point.answers.find(answer => answer.type == 'time') || null;
    },

    puzzleIndex () {
      return this.$store.state.adventure.points.findIndex(point => point.id == this.$route.params.pointId);
    },
    point () {
      let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

      if(point && !this.pointData.id) {
        //eslint-disable-next-line
        this.pointData = cloneDeep(point);

        //eslint-disable-next-line
        this.passwordRequired = this.pointData.answers.findIndex(answer => answer.type == 'password') >= 0;

        //eslint-disable-next-line
        this.timeConstraint = this.pointData.answers.findIndex(answer => answer.type == 'time') >= 0;
      }

      return this.pointData;
    },
    formTitle () {
      if(this.puzzleIndex == 0) {
        if(this.adventure.published) {
          return this.$t("adventure_point.start_title");
        } else {
          return this.$t("adventure_point.edit_start_title");
        }
      } else {
        if(this.adventure.published) {
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
      if(this.adventure.published) {
        return;
      }

      this.passwordRequired = !this.passwordRequired;

      let answer = this.passwordAnswer;

      if(!answer) {
        this.point.answers.push({ type: 'password', details: { password_type: 'text', password: "" } });
      }
    },
    
    toggleTimeConstraint () {
      if(this.adventure.published) {
        return;
      }

      this.timeConstraint = !this.timeConstraint;

      let answer = this.timeAnswer;

      if(!answer) {
        this.point.answers.push({ type: 'time', details: { starting_time: 0, duration: TIME_CONSTRAINT_OPTIONS.INTERVAL } });
      }
    },

    destroyPuzzle () {
      if(confirm(this.$t("adventure.remove_puzzle_confirm"))) {
        this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_POINT}`, { pointId: this.pointData.id })
          .then( (response) => {
            if(this.$router.currentRoute.name == "adventurePoint" ||
                this.$router.currentRoute.name == "adventureClue" ||
                this.$router.currentRoute.name == "newAdventureClue") {

              if(router.currentRoute.params.pointId == this.point.id) {
                setTimeout(() => {
                  router.replace({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
                }, 0);
              }
            }
          });
      }
    },

    submit () {
      //TODO validate form
      let params = cloneDeep(this.pointData);

      if(!this.passwordRequired) {
        let answerIndex = params.answers.findIndex(answer => answer.type == 'password');

        if(answerIndex >= 0) {
          params.answers.splice(answerIndex, 1);
        }
      }

      if(!this.timeConstraint) {
        let answerIndex = params.answers.findIndex(answer => answer.type == 'time');

        if(answerIndex >= 0) {
          params.answers.splice(answerIndex, 1);
        }
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
