<template lang="pug">
  .adventure-publishment
    .adventure-panel__header
      router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      .adventure-panel__title {{ $t("adventure_publishing.title") }}

    .adventure-publishment__header
      .adventure-publishment__summary {{ publishingSummary }}
      a.button.button--green.adventure-publishment__action(v-if="canRequestReview" @click="showReviewModal") {{ $t("adventure_publishing.action_request_review") }}
      a.button.button--blue.adventure-publishment__action(v-if="canEdit" @click="showEditModal") {{ $t("adventure_publishing.action_edit") }}
      a.button.button--green.adventure-publishment__action(v-if="canPublish" @click="showPublishModal") {{ $t("adventure_publishing.action_publish") }}

    .adventure-publishment__history(:class="{ 'adventure-publishment__history--with-messaging': canSendMessages }" ref="historyContainer")
      infinite-loading(direction="top" @infinite="loadDataHandler")
        // Empty slots to not display infinite loading plugin's messages and spinner
        div(slot="spinner")
        div(slot="no-more")
        div(slot="no-results")

      PublishingHistoryItem(v-for="historyItem in history" :key="historyItem.id" :historyItem="historyItem")

    .adventure-publishment__form
      textarea.form-input.adventure-publishment__input(
        :placeholder="$t('adventure_publishing.input_placeholder')"
        v-model="message"
        @keydown.enter="handleNewMessage"
      )

    Modal(v-if="showConfirmEdit" @close="closeModals")
      div(slot="header") {{ $t("adventure_publishing.action_edit") }}

      p {{ $t("adventure_publishing.modal_edit_1") }}
      p {{ $t("adventure_publishing.modal_edit_2") }}

      .text-center
        a.button.button--blue.button--push-right(@click="backToEdit") {{ $t("general.i_understand_confirm") }}
        a.button.button--light-gray(@click="closeModals") {{ $t("general.cancel") }}

    Modal(v-if="showRequestReview" @close="closeModals")
      div(slot="header") {{ $t("adventure_publishing.action_request_review") }}

      p {{ $t("adventure_publishing.modal_review_1") }}
      p {{ $t("adventure_publishing.modal_review_2") }}
      p {{ $t("adventure_publishing.modal_review_3") }}

      .text-center
        a.button.button--blue.button--push-right(@click="requestReview") {{ $t("general.i_understand_confirm") }}
        a.button.button--light-gray(@click="closeModals") {{ $t("general.cancel") }}

    Modal(v-if="showConfirmPublish" @close="closeModals")
      div(slot="header") {{ $t("adventure_publishing.action_publish") }}

      p {{ $t("adventure_publishing.modal_publish_1") }}

      .text-center
        a.button.button--blue.button--push-right(@click="publish") {{ $t("general.i_understand_confirm") }}
        a.button.button--light-gray(@click="closeModals") {{ $t("general.cancel") }}
</template>

<script>
import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'publishment'

import { LOAD_PUBLISHMENT_HISTORY, CREATE_PUBLISHMENT_MESSAGE } from '@/store/action-types'

import PublishingHistoryItem from '@/components/creator/PublishingHistoryItem.vue'
import Modal from '@/components/shared/Modal.vue'

import {
  REQUEST_REVIEW,
  PUBLISH,
  START_EDITING
} from '@/store/action-types'

import {
  ADVENTURES_PUBLISHED, ADVENTURES_PENDING,
  ADVENTURES_REJECTED, ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED, ADVENTURES_CANCELLED
} from '@/config'

export default {
  name: 'AdventurePublishing',
  components: {
    PublishingHistoryItem,
    Modal
  },
  data () {
    return {
      page: 1,
      message: null,
      showRequestReview: false,
      showConfirmEdit: false,
      showConfirmPublish: false
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      history: state => state.publishment.history,

      loading: state => state.publishment.loading,
      error: state => state.publishment.error
    }),

    canSendMessages () {
      //TODO when can you send messages?
      return true;
    },

    publishingSummary () {
      return this.$t(`adventure_publishing.summary_${this.adventure.status}`);
    },

    canRequestReview () {
      return this.adventure.status == ADVENTURES_PENDING;
    },

    canEdit () {
      return this.adventure.status == ADVENTURES_UNPUBLISHED || this.adventure.status == ADVENTURES_REJECTED;
    },

    canPublish () {
      return this.adventure.status == ADVENTURES_UNPUBLISHED;
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PUBLISHMENT_HISTORY}`, { adventureId: this.$route.params.adventureId });
  },
  methods: {
    loadDataHandler($state) {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PUBLISHMENT_HISTORY}`, {
        adventureId: this.$route.params.adventureId,
        page: this.page
      }).then( (response) => {
        if(response.data.length) {
          this.page += 1;

          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },

    handleNewMessage (evt) {
      if(evt.shiftKey || this.loading || !this.canSendMessages) {
        return;
      }

      evt.preventDefault();

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_PUBLISHMENT_MESSAGE}`, {
        adventureId: this.$route.params.adventureId,
        message: this.message
      }).then( () => {
        this.message = null;

        // Scroll to bottom when new message is written
        setTimeout(() => {
          this.$refs.historyContainer.scrollTop = this.$refs.historyContainer.scrollHeight;
        }, 0);
      });
    },

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
        setTimeout(() => {
          this.$refs.historyContainer.scrollTop = this.$refs.historyContainer.scrollHeight;
        }, 0);
      });
    },

    requestReview (evt) {
      this.closeModals();

      this.$store.dispatch(`${ACTION_NAMESPACE}/${REQUEST_REVIEW}`, {
        adventureId: this.$route.params.adventureId
      }).then( () => {
        setTimeout(() => {
          this.$refs.historyContainer.scrollTop = this.$refs.historyContainer.scrollHeight;
        }, 0);
      });
    },

    publish (evt) {
      this.closeModals();

      this.$store.dispatch(`${ACTION_NAMESPACE}/${PUBLISH}`, {
        adventureId: this.$route.params.adventureId
      }).then( () => {
        setTimeout(() => {
          this.$refs.historyContainer.scrollTop = this.$refs.historyContainer.scrollHeight;
        }, 0);
      });
    }
  }
}
</script>
