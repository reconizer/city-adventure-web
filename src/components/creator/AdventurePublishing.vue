<template lang="pug">
  .adventure-publishment
    .adventure-panel__header
      router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      .adventure-panel__title {{ $t("adventure_publishing.title") }}

    PublishingHistoryHeader

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
</template>

<script>
import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'publishment'

import PublishingHistoryItem from '@/components/shared/PublishingHistoryItem.vue'
import PublishingHistoryHeader from '@/components/creator/PublishingHistoryHeader.vue'

import {
  LOAD_PUBLISHMENT_HISTORY,
  CREATE_PUBLISHMENT_MESSAGE
} from '@/store/action-types'

export default {
  name: 'AdventurePublishing',
  components: {
    PublishingHistoryItem,
    PublishingHistoryHeader
  },
  data () {
    return {
      page: 1,
      message: null,
      timestamp: (+new Date())/1000|0 //used for timestamp-based pagination
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
    }
  },
  created () {
    this.$root.$on('new-history-message', () => {
      setTimeout(() => {
        this.$refs.historyContainer.scrollTop = this.$refs.historyContainer.scrollHeight;
      }, 0);
    });
  },
  methods: {
    loadDataHandler($state) {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PUBLISHMENT_HISTORY}`, {
        adventureId: this.$route.params.adventureId,
        timestamp: this.timestamp,
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

        this.$root.$emit('new-history-message');
      });
    }
  }
}
</script>
