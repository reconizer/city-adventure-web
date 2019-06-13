<template lang="pug">
  .adventure-publishment__header
    .adventure-publishment__summary {{ publishingSummary }}

    button.button.button--green.adventure-publishment__action(v-if="canRequestReview" @click="showReviewModal") {{ $t("adventure_publishing.action_request_review") }}
    button.button.button--blue.adventure-publishment__action(v-if="canGoToEdit" @click="showEditModal") {{ $t("adventure_publishing.action_edit") }}
    button.button.button--green.adventure-publishment__action(v-if="canPublish" @click="showPublishModal") {{ $t("adventure_publishing.action_publish") }}

    Modal(v-if="showConfirmEdit" @close="closeModals")
      div(slot="header") {{ $t("adventure_publishing.action_edit") }}

      p {{ $t("adventure_publishing.modal_edit_1") }}
      p {{ $t("adventure_publishing.modal_edit_2") }}

      .text-center(slot="footer")
        button.button.button--blue.button--push-right(@click="backToEdit") {{ $t("general.i_understand_confirm") }}
        button.button.button--light-gray(@click="closeModals") {{ $t("general.cancel") }}

    Modal(v-if="showRequestReview" @close="closeModals")
      div(slot="header") {{ $t("adventure_publishing.action_request_review") }}

      p {{ $t("adventure_publishing.modal_review_1") }}
      p {{ $t("adventure_publishing.modal_review_2") }}
      p {{ $t("adventure_publishing.modal_review_3") }}

      .text-center(slot="footer")
        button.button.button--blue.button--push-right(@click="requestReview") {{ $t("general.i_understand_confirm") }}
        button.button.button--light-gray(@click="closeModals") {{ $t("general.cancel") }}

    Modal(v-if="showConfirmPublish" @close="closeModals")
      div(slot="header") {{ $t("adventure_publishing.action_publish") }}

      p {{ $t("adventure_publishing.modal_publish_1") }}

      .text-center(slot="footer")
        button.button.button--blue.button--push-right(@click="publish") {{ $t("general.i_understand_confirm") }}
        button.button.button--light-gray(@click="closeModals") {{ $t("general.cancel") }}
</template>

<script>
import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'publishment'

import { LOAD_PUBLISHMENT_HISTORY, CREATE_PUBLISHMENT_MESSAGE } from '@/store/action-types'

import Modal from '@/components/shared/Modal.vue'

import {
  REQUEST_REVIEW,
  PUBLISH,
  START_EDITING
} from '@/store/action-types'

import {
  ADVENTURES_PENDING,
  ADVENTURES_REJECTED,
  ADVENTURES_UNPUBLISHED
} from '@/config'

export default {
  name: 'PublishingHistoryHeader',
  components: {
    Modal
  },
  data () {
    return {
      showRequestReview: false,
      showConfirmEdit: false,
      showConfirmPublish: false
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.publishment.loading,
      error: state => state.publishment.error
    }),

    publishingSummary () {
      return this.$t(`adventure_publishing.summary_${this.adventure.status}`);
    },

    canRequestReview () {
      return this.adventure.status == ADVENTURES_PENDING;
    },

    canGoToEdit () {
      return this.adventure.status == ADVENTURES_UNPUBLISHED || this.adventure.status == ADVENTURES_REJECTED;
    },

    canPublish () {
      return this.adventure.status == ADVENTURES_UNPUBLISHED;
    }
  },
  methods: {
    showEditModal () {
      this.showConfirmEdit = true;
    },

    showReviewModal () {
      this.showRequestReview = true;
    },

    showPublishModal () {
      this.showConfirmPublish = true;
    },

    closeModals (evt) {
      this.showConfirmEdit = this.showRequestReview = this.showConfirmPublish = false;
    },

    backToEdit (evt) {
      this.closeModals();

      this.$store.dispatch(`${ACTION_NAMESPACE}/${START_EDITING}`, {
        adventureId: this.$route.params.adventureId
      }).then( () => {
        this.$root.$emit('new-history-message');
      });
    },

    requestReview (evt) {
      this.closeModals();

      this.$store.dispatch(`${ACTION_NAMESPACE}/${REQUEST_REVIEW}`, {
        adventureId: this.$route.params.adventureId
      }).then( () => {
        this.$root.$emit('new-history-message');
      });
    },

    publish (evt) {
      this.closeModals();

      this.$store.dispatch(`${ACTION_NAMESPACE}/${PUBLISH}`, {
        adventureId: this.$route.params.adventureId
      }).then( () => {
        this.$root.$emit('new-history-message');
      });
    }
  }
}
</script>
