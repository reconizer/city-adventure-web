<template lang="pug">
  .adventure-panel
    div(v-if="point.id")
      .adventure-panel__header
        router-link.icon.icon--back.icon--pad-right.adventure-panel__back(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        span(v-if="puzzleIndex == 0") Edit Starting Point
        span(v-else) Edit Puzzle 
        span(v-if="puzzleIndex > 0") \#{{ puzzleIndex }}

        a.button.button--pink.adventure-panel__remove(v-if="puzzleIndex > 0" @click="destroyPuzzle()") Remove

      .row(v-if="puzzleIndex == 0")
        .col-1-2
          .puzzle-component.puzzle-component--left
            .puzzle-component__header
              .puzzle-component__name Location

            .row.row--align-center
              .col-1-2
                span Location Hidden?
              .col-1-2
                .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': point.hidden }")
                  .form-checkbox__toggle

      .row(v-else)
        .col-1-2
          .puzzle-component.puzzle-component--left
            .puzzle-component__header
              .puzzle-component__name Password Required

              .form-checkbox(:class="{ 'form-checkbox--active': passwordRequired }" @click="togglePasswordRequired")
                .form-checkbox__toggle

            div(v-show="passwordRequired")
              .form-control
                .form-label Password Type
                v-select(placeholder="Password Type" :clearable="false" :value="passwordType" :options="passwordTypes" @input="updatePasswordType($event)")

              .form-control(v-if="passwordAnswer.details.password_type == 'text'")
                input.form-input(:value="passwordAnswer.details.password" @input="updatePassword")

          .puzzle-component.puzzle-component--left
            .puzzle-component__header
              .puzzle-component__name Time Constraint

              .form-checkbox(:class="{ 'form-checkbox--active': timeConstraint }" @click="toggleTimeConstraint")
                .form-checkbox__toggle

        .col-1-2
          .puzzle-component.puzzle-component--right
            .puzzle-component__header
              .puzzle-component__name Location

            .align-items-center
              span Location Hidden?
              .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': point.hidden }")
                .form-checkbox__toggle
</template>

<script>
import { mapState } from 'vuex'

import { UPDATE_POINT, DESTROY_POINT } from '@/store/action-types'

import { passwordTypes } from '@/config'

import vSelect from 'vue-select'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventurePointForm',
  components: {
    vSelect
  },
  data () {
    return {
      pointData: {
        id: null,
        radius: null,
        hidden: false,
        answers: []
      }
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),
    passwordTypes () {
      return passwordTypes;
    },
    passwordType () {
      let answer = this.passwordAnswer;

      if(!answer) {
        return this.passwordTypes[0];
      } else {
        return this.passwordTypes.find(passwordType => passwordType.value == answer.details.password_type);
      }
    },
    passwordAnswer () {
      return this.point.answers.find(answer => answer.type == 'password') || { details: { } };
    },
    puzzleIndex () {
      return this.$store.state.adventure.points.findIndex(point => point.id == this.$route.params.pointId);
    },
    point () {
      let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

      if(point) {
        this.pointData = {
          id: point.id,
          radius: point.radius,
          hidden: point.hidden,
          answers: point.answers
        };
      }

      return this.pointData;
    },
    passwordRequired () {
      return this.point.answers.findIndex(answer => answer.type == 'password') >= 0;
    },
    timeConstraint () {
      return this.point.answers.findIndex(answer => answer.type == 'time') >= 0;
    }
  },
  methods: {
    togglePasswordRequired () {
    },
    
    toggleTimeConstraint () {
    },

    updatePasswordType (evt) {
      let answer = this.pointData.answers.find(answer => answer.type == 'password');

      answer.details.password_type = evt.value;
    },
    updatePassword (evt) {
      this.passwordAnswer.password = evt.target.value;
    },
  }
}
</script>
