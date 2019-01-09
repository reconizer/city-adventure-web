<template lang="pug">
  .publishment-history-item(
    :class="containerClass"
  )
    .publishment-history-item__date {{ historyItemDate }}
    .publishment-history-item__content-wrapper
      .publishment-history-item__sender
        span(v-if="isComment && isSenderComment") {{ $t("adventure_publishing.history_you") }}
        span(v-else) {{ $t("adventure_publishing.history_qa") }}
      .publishment-history-item__content {{ content }}
</template>

<script>
import moment from 'moment'

import {
  MESSAGE_CREATED, MESSAGE_PUBLISHMENT_REQUEST,
  MESSAGE_REJECTED, MESSAGE_COMMENT,
  MESSAGE_PUBLISHED, MESSAGE_ACCEPTED,
  MESSAGE_CANCELLED, MESSAGE_BACK_TO_EDIT,

  MESSAGE_TYPE_CREATOR, MESSAGE_TYPE_QA
} from '@/config'

export default {
  name: 'PublishingHistoryItem',
  props: {
    historyItem: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    historyItemDate () {
      return moment(this.historyItem.timestamp).format('DD/MM/YYYY HH:mm');
    },

    isStatusMessage () {
      return !this.isComment;
    },

    isComment () {
      return this.historyItem.type == MESSAGE_COMMENT;
    },

    isSenderComment () {
      return this.isComment && this.historyItem.details.from_type == MESSAGE_TYPE_CREATOR;
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
        'publishment-history-item--sender-message': this.isSenderComment
      }
    },

    content () {
      switch(this.historyItem.type) {
          case MESSAGE_COMMENT:
            return this.historyItem.details.content;

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
