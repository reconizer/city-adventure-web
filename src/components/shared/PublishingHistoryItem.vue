<template lang="pug">
  .publishment-history-item(
    :class="containerClass"
  )
    .publishment-history-item__date {{ historyItemDate }}
    .publishment-history-item__content-wrapper
      .publishment-history-item__sender
        span(v-if="isSenderComment") {{ yourLabel }}
        span(v-else) {{ otherLabel }}
      .publishment-history-item__content {{ content }}
</template>

<script>
import moment from 'moment'

import {
  MESSAGE_CREATED,

  MESSAGE_COMMENT_QA, MESSAGE_COMMENT_CREATOR,

  MESSAGE_PUBLISHMENT_REQUEST, MESSAGE_REJECTED,
  MESSAGE_PUBLISHED, MESSAGE_ACCEPTED,
  MESSAGE_CANCELLED, MESSAGE_BACK_TO_EDIT,
} from '@/config'

export default {
  name: 'PublishingHistoryItem',
  props: {
    historyItem: {
      type: Object,
      default: () => {}
    },
    receiverType: {
      type: String,
      default: () => MESSAGE_COMMENT_CREATOR
    }
  },
  computed: {
    historyItemDate () {
      return moment(this.historyItem.created_at * 1000).format('DD/MM/YYYY HH:mm');
    },

    isStatusMessage () {
      return !this.isComment;
    },

    isComment () {
      return this.historyItem.type == MESSAGE_COMMENT_QA || this.historyItem.type == MESSAGE_COMMENT_CREATOR
    },

    isSenderComment () {
      return this.isComment && this.historyItem.type == this.receiverType;
    },

    yourLabel () {
      return this.$t("adventure_publishing.history_you");
    },

    otherLabel () {
      if(this.receiverType == MESSAGE_COMMENT_QA) {
        return this.$t("adventure_publishing.history_author");
      } else {
        return this.$t("adventure_publishing.history_qa");
      }
    },

    containerClass () {
      return {
        'publishment-history-item--status': this.isStatusMessage,

        'publishment-history-item--status-created': this.historyItem.type == MESSAGE_CREATED,
        'publishment-history-item--status-review-request': this.historyItem.type == MESSAGE_PUBLISHMENT_REQUEST,
        'publishment-history-item--status-rejected': this.historyItem.type == MESSAGE_REJECTED,
        'publishment-history-item--status-published': this.historyItem.type == MESSAGE_PUBLISHED,
        'publishment-history-item--status-accepted': this.historyItem.type == MESSAGE_ACCEPTED,
        'publishment-history-item--status-cancelled': this.historyItem.type == MESSAGE_CANCELLED,
        'publishment-history-item--status-back-to-edit': this.historyItem.type == MESSAGE_BACK_TO_EDIT,

        'publishment-history-item--received-message': this.isComment && !this.isSenderComment,
        'publishment-history-item--sender-message': this.isComment && this.isSenderComment
      }
    },

    content () {
      switch(this.historyItem.type) {
          case MESSAGE_COMMENT_QA:
          case MESSAGE_COMMENT_CREATOR:
            return this.historyItem.content;

          case MESSAGE_CREATED:
          case MESSAGE_PUBLISHMENT_REQUEST:
          case MESSAGE_REJECTED:
          case MESSAGE_ACCEPTED:
          case MESSAGE_PUBLISHED:
          case MESSAGE_CANCELLED:
          case MESSAGE_BACK_TO_EDIT:
            return this.$t(`adventure_publishing.history_${this.historyItem.type}`);
      }
    }
  }
}
</script>
