<template lang="pug">
  .adventure-panel
    .adventure-panel__inner(v-if="adventure.id")
      .adventure-panel__header
        router-link.icon.icon--back.icon--pad-right.adventure-panel__back(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        span(v-if="existingClue") Edit Clue
        span(v-else) New Clue

        a.button.button--pink.adventure-panel__remove(v-if="existingClue" @click="destroyClue()") Remove

      .row
        .col-1-2
          .form-control
            .form-label Clue Type
            v-select(placeholder="Clue Type" :clearable="false" :value="clueType" :options="clueTypes" @input="updateType($event)")

          .form-control
            .row.row--align-center
              .col-1-2
                label.form-label
                  span Is a Tip?
                  .icon.icon--question-mark.icon--pad-left
                    .icon__tooltip-wrapper
                      .icon__tooltip Tips are optional, on-demand clues
              .col-1-2
                .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': clue.tip }" @click="updateTip(!clue.tip)")
                  .form-checkbox__toggle

          .form-control(v-if="clue.type != 'image'")
            .form-label.form-label--required(v-if="clue.type == 'text'") Content
            .form-label(v-else) Description
            textarea.form-input(v-model="clue.description")

          //TODO file upload
          .form-control(v-if="clue.type != 'text'")
            .form-label.form-label--required URL
            input.form-input(v-model="clue.url")

          .form-control
            a.button.button--blue.button--large.button--full(@click="submit()") Submit
</template>

<script>
import { mapState } from 'vuex'

import { CREATE_CLUE, UPDATE_CLUE, DESTROY_CLUE } from '@/store/action-types'

import vSelect from 'vue-select'

import { clueTypes } from '@/config'

import cloneDeep from 'lodash.clonedeep'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureClueForm',
  components: {
    vSelect
  },
  data () {
    return {
      clueData: {
        id: null,
        type: 'text',
        tip: false,
        url: null,
        description: null,
        order: 0
      }
    };
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),
    clueTypes() {
      return clueTypes;
    },
    clue () {
      let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

      if(this.$route.params.clueId) {
        if(point) {
          let clueObject = point.clues.find(clue => clue.id == this.$route.params.clueId);

          if(clueObject) {
            //eslint-disable-next-line
            this.clueData = cloneDeep(clueObject);
          }
        }
      }
      return this.clueData;
    },
    clueType () {
      return this.clueTypes.find(clueType => clueType.value == this.clue.type);
    },
    existingClue () {
      return this.clue.id != null;
    }
  },
  methods: {
    updateType (evt) {
      this.clueData.type = evt.value;
    },
    updateTip (value) {
      this.clueData.tip = value;
    },

    submit () {
      let id = this.clueData.id;
      let data = this.clueData;

      delete data['id'];

      if(id) {
        delete data['order']; //no need to set order in currently edited clue

        this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_CLUE}`, {
          pointId: this.$route.params.pointId,
          clueId: id,
          data: data
        });
      } else {
        let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

        data.order = point.clues.length

        this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_CLUE}`, {
          pointId: this.$route.params.pointId,
          data: data
        });
      }
    },

    destroyClue () {
      if(this.clue.id) {
        if(confirm("Are you sure you want to remove this clue?")) {
          this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_CLUE}`, {
            pointId: this.$route.params.pointId,
            clueId: this.clue.id
          });
        }
      }
    }
  }
}
</script>
