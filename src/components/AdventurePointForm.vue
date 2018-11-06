<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="point.id")
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

            .form-control
              label.form-label.form-label--required
                span Radius (in meters)

                .icon.icon--question-mark.icon--pad-left
                  .icon__tooltip-wrapper
                    .icon__tooltip Range in which player can access the puzzle

              .slider-wrapper
                vue-slider(
                  v-model="point.radius"
                  v-bind="sliderOptions"
                )

      .row(v-else)
        .col-1-2
          .puzzle-component.puzzle-component--left
            .puzzle-component__header
              .puzzle-component__name Password Required

              .form-checkbox(:class="{ 'form-checkbox--active': passwordRequired }" @click="togglePasswordRequired")
                .form-checkbox__toggle

            div(v-if="passwordRequired")
              .form-control
                .form-label Password Type
                v-select(placeholder="Password Type" :clearable="false" :value="passwordType" :options="passwordTypes" @input="updatePasswordType($event)")

              .form-control(v-if="passwordAnswer.details.password_type != 'text'")
                .form-label.form-label--required Length Variant
                v-select(placeholder="Length Variant" :clearable="false" :options="lengthOptions" :value="passwordLength" @input="updatePasswordLength")

              .form-control(v-if="passwordAnswer.details.password_type != 'directionLock'")
                .form-label.form-label--required Enter password
                input.form-input(type="text" placeholder="Password" :value="passwordAnswer.details.password" @input="updatePassword")

              .form-control(v-if="passwordAnswer.details.password_type == 'directionLock'")
                .form-control
                  .form-label.form-label--required Enter password by pressing buttons below
 
                .form-control
                  .row
                    .col-1-2
                      a.button.button--circle.button--blue(@click="onArrow('l')") ←
                      a.button.button--circle.button--blue(@click="onArrow('u')") ↑
                      a.button.button--circle.button--blue(@click="onArrow('d')") ↓
                      a.button.button--circle.button--blue(@click="onArrow('r')") →

                    .col-1-2.text-right
                      a.button.button--pink(@click="clearArrows()") Clear

                .form-control
                  span Password: {{ transformedPassword }}

            .puzzle-component-filler(v-else)
              .puzzle-component-filler__header No password is required to complete this puzzle

          .puzzle-component.puzzle-component--left
            .puzzle-component__header
              .puzzle-component__name Time Constraint

              .form-checkbox(:class="{ 'form-checkbox--active': timeConstraint }" @click="toggleTimeConstraint")
                .form-checkbox__toggle

            .form-control(v-if="timeConstraint")
              .row
                .col-1-2
                  .form-control
                    .form-label Start Time
                    v-select(placeholder="Start Time" :clearable="false" :value="startingTime" :options="timeOptions" @input="updateStartingTime($event)")

                  .form-control
                    .form-label Duration (hours:minutes)
                    v-select(placeholder="Duration" :clearable="false" :value="duration" :options="durationOptions" @input="updateDuration($event)")

                .col-1-2
                  .form-control
                    .form-label End Time
                    .form-static-text {{ endingTime }}

            .puzzle-component-filler(v-else)
              .puzzle-component-filler__header There is no time constraint to complete this puzzle

        .col-1-2
          .puzzle-component.puzzle-component--right
            .puzzle-component__header
              .puzzle-component__name Location

            .form-control
              .row.row--align-center
                .col-2-3
                  span Location Hidden?
                .col-1-3
                  .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': point.hidden }" @click="updateHidden(!point.hidden)")
                    .form-checkbox__toggle

            .form-control
              label.form-label.form-label--required
                span Radius (in meters)

                .icon.icon--question-mark.icon--pad-left
                  .icon__tooltip-wrapper
                    .icon__tooltip Range in which player can access the puzzle

              .slider-wrapper
                vue-slider(
                  v-model="point.radius"
                  v-bind="sliderOptions"
                )

      .form-control-separator
      .row
        .col-1-2
          .form-control
            a.button.button--blue.button--large.button--full(@click="submit") Submit
</template>

<script>
import { mapState } from 'vuex'

import { UPDATE_POINT, DESTROY_POINT } from '@/store/action-types'

import { TIME_CONSTRAINT_OPTIONS, RADIUS_CONSTRAINTS, passwordTypes } from '@/config'

import { pad, arrowUnicodeToChar, charToArrowUnicode } from '@/utils'

import cloneDeep from 'lodash.clonedeep'

import vSelect from 'vue-select'
import vueSlider from 'vue-slider-component'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventurePointForm',
  components: {
    vSelect,
    vueSlider
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
      passwordRequired: false,
      transformedPassword: ""
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),

    sliderOptions () {
      return {
        min: RADIUS_CONSTRAINTS.MIN,
        max: RADIUS_CONSTRAINTS.MAX,
        interval: 1
      }
    },

    passwordTypes () {
      return passwordTypes;
    },
    passwordType () {
      let answer = this.passwordAnswer;

      if(answer && answer.details.password_type) {
        return this.passwordTypes.find(passwordType => passwordType.value == answer.details.password_type);
      } else {
        return this.passwordTypes[0];
      }
    },
    passwordLength () {
      let answer = this.passwordAnswer;

      if(answer && answer.details.password_length) {
        return answer.details.password_length
      } else {
        return this.lengthOptions[0] || null;
      }
    },

    lengthOptions () {
      let type = this.passwordType;

      switch(type.value) {
          case 'numberLock':
            return [3, 4, 5, 6];
          case 'cryptex':
            return [3, 4, 5, 6, 7, 8, 9, 10];
          case 'directionLock':
            return [4, 5, 6, 7, 8, 9, 10];
          case 'numberPushLock':
            return [3, 4]
          case 'text':
          default:
            return [];
      }
    },

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
        this.pointData = {
          id: point.id,
          radius: point.radius,
          hidden: point.hidden,
          answers: point.answers.slice()
        };

        let passwordAnswer = this.pointData.answers.find(answer => answer.type == 'password');

        if(passwordAnswer) {
          //eslint-disable-next-line
          this.passwordRequired = true;

          if(passwordAnswer.details.password_type == 'directionLock') {
            //eslint-disable-next-line
            this.transformedPassword = this.decodeDirectionPassword(passwordAnswer.details.password);
          }
        }

        //eslint-disable-next-line
        this.timeConstraint = this.pointData.answers.findIndex(answer => answer.type == 'time') >= 0;
      }

      return this.pointData;
    },
    startingTime () {
      let answer = this.timeAnswer;

      if(answer && answer.details.starting_time) {
        return this.timeOptions.find(option => option.value == answer.details.starting_time);
      } else {
        return this.timeOptions[0];
      }
    },

    endingTime () {
      let start = this.startingTime.value;

      let endingTime = start + this.duration.value;

      let hour = Math.floor(endingTime / 3600);
      let minutes = (endingTime % 3600) / TIME_CONSTRAINT_OPTIONS.INTERVAL * (TIME_CONSTRAINT_OPTIONS.INTERVAL / 60);

      if(hour >= 24) {
        hour -= 24;

        if(minutes == 0) {
          return `${pad(hour, 2)}:${pad(minutes, 2)}`;
        } else {
          return `Next day on ${pad(hour, 2)}:${pad(minutes, 2)}`;
        }
      } else {
        return `${pad(hour, 2)}:${pad(minutes, 2)}`;
      }
    },

    timeOptions () {
      let options = 24*(60*60/TIME_CONSTRAINT_OPTIONS.INTERVAL);

      let optionsMap = [...Array(options)].map((_, i) => {
        let current = i * TIME_CONSTRAINT_OPTIONS.INTERVAL;

        let hour = Math.floor(current / 3600);
        let minutes = (current % 3600) / TIME_CONSTRAINT_OPTIONS.INTERVAL * (TIME_CONSTRAINT_OPTIONS.INTERVAL / 60);

        return {
          value: current,
          label: `${pad(hour, 2)}:${pad(minutes, 2)}`
        };
      });

      return optionsMap;
    },

    durationOptions () {
      return this.timeOptions.filter(item => 0 < item.value && item.value <= 23*60*60);
    },
    duration () {
      let answer = this.timeAnswer;

      if (answer && answer.details.duration) {
        return this.durationOptions.find(option => option.value == answer.details.duration);
      } else {
        return this.durationOptions[0];
      }
    }
  },
  methods: {
    togglePasswordRequired () {
      this.passwordRequired = !this.passwordRequired;

      let answer = this.passwordAnswer;

      if(!answer) {
        this.point.answers.push({ type: 'password', details: { password_type: null, password: null, password_length: null } });
      }
    },
    
    toggleTimeConstraint () {
      this.timeConstraint = !this.timeConstraint;

      let answer = this.timeAnswer;

      if(!answer) {
        this.point.answers.push({ type: 'time', details: { starting_time: null, duration: null } });
      }
    },

    updatePasswordType (evt) {
      if(!evt) {
        return;
      }

      let answer = this.passwordAnswer;

      answer.details.password_type = evt.value;

      answer.details.password_length = this.lengthOptions[0] || null;
    },

    updatePassword (evt) {
      this.passwordAnswer.details.password = evt.target.value;
    },

    updateHidden (value) {
      this.point.hidden = value;
    },

    updateRadius (evt) {
      if(evt.target.value.length == 0) {
        this.point.radius = null;
      } else {
        this.point.radius = +evt.target.value;
      }
    },

    updateStartingTime (evt) {
      if(!evt) {
        return;
      }

      let answer = this.timeAnswer;

      answer.details.starting_time = evt.value;
    },

    updateDuration (evt) {
      if(!evt) {
        return;
      }

      let answer = this.timeAnswer;

      answer.details.duration = evt.value;
    },

    updatePasswordLength (evt) {
      if(!evt) {
        return;
      }

      let answer = this.passwordAnswer;

      answer.details.password_length = evt;
    },

    encodeDirectionPassword (password) {
      let str = '';

      for(let i = 0; i < password.length; i++) {
        str += arrowUnicodeToChar[password.charAt(i)];
      }

      return str;
    },

    onArrow (direction) {
      let answer = this.passwordAnswer;

      if(this.transformedPassword.length < answer.details.password_length) {
        this.transformedPassword += charToArrowUnicode[direction];
      }
    },

    clearArrows () {
      this.transformedPassword = "";
    },

    decodeDirectionPassword (password) {
      let str = '';

      for(let i = 0; i < password.length; i++) {
        str += charToArrowUnicode[password.charAt(i)];
      }

      return str;
    },

    submit () {
      //TODO validate form
      let params = cloneDeep(this.pointData);

      let answerIndex = params.answers.findIndex(answer => answer.type == 'password');

      if(!this.passwordRequired) {
        if(answerIndex >= 0) {
          params.answers.splice(answerIndex, 1);
        }
      } else if(answerIndex >= 0) {
        if(params.answers[answerIndex].details.password_type == 'directionLock') {
          params.answers[answerIndex].details.password = this.encodeDirectionPassword(this.transformedPassword);
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
