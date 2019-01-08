<template lang="pug">
  .publishment-history-item
    .publishment-history-item__date {{ historyItemDate }}
    .publishment-history-item__content-wrapper
      .publishment-history-item__sender
      .publishment-history-item__content
        span {{ historyItem.id }}
        span &nbsp;
        span {{ historyItem.type }}
        span &nbsp;
</template>

<script>
import moment from 'moment'

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
    }
  }
}
</script>
