<template lang="pug">
  .adventure-publishment__header
    .adventure-publishment__summary {{ $t("adventure_publishing.change_status") }}

    v-select.adventure-publishment__select(
      :placeholder="$t('adventure_publishing.status')" 
      :clearable="false" 
      :options="statuses" 
      :value="currentStatus" 
      @input="changeStatus"
    )

    a.button.button--blue.adventure-publishment__action(@click="confirmStatusChange") {{ $t("general.submit") }}
</template>

<script>
import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'publishment'

import { LOAD_PUBLISHMENT_HISTORY, CREATE_PUBLISHMENT_MESSAGE } from '@/store/action-types'

import vSelect from 'vue-select'

import Modal from '@/components/shared/Modal.vue'

import {
  START_EDITING, REJECT,
  UNPUBLISH, CANCEL,
  PUBLISH, REQUEST_REVIEW
} from '@/store/action-types'

import {
  ADVENTURES_PENDING, ADVENTURES_REJECTED,
  ADVENTURES_UNPUBLISHED, ADVENTURES_CANCELLED,
  ADVENTURES_PUBLISHED, ADVENTURES_IN_REVIEW
} from '@/config'

export default {
  name: 'PublishingHistoryHeader',
  components: {
    vSelect,

    Modal
  },
  data () {
    return {
      status: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.publishment.loading,
      error: state => state.publishment.error
    }),

    adventure () {
      let adventure = this.$store.state.adventure.item;

      this.status = adventure.status;

      return adventure;
    },

    statuses () {
      return [
        {
          value: ADVENTURES_PENDING,
          label: this.$t('adventure_publishing.history_back_to_edit')
        },
        {
          value: ADVENTURES_IN_REVIEW,
          label: this.$t('adventure_publishing.history_review_request')
        },
        {
          value: ADVENTURES_REJECTED,
          label: this.$t('adventure_publishing.history_rejected')
        },
        {
          value: ADVENTURES_UNPUBLISHED,
          label: this.$t('adventure_publishing.history_accepted')
        },
        {
          value: ADVENTURES_PUBLISHED,
          label: this.$t('adventure_publishing.history_published')
        },
        {
          value: ADVENTURES_CANCELLED,
          label: this.$t('adventure_publishing.history_cancelled')
        }
      ];
    },

    currentStatus () {
      return this.statuses.find(st => st.value == this.adventure.status);
    }
  },
  methods: {
    changeStatus (evt) {
      this.status = evt.value;
    },

    confirmStatusChange () {
      let action = '';

      switch(this.status) {
        case ADVENTURES_PENDING:
          action = START_EDITING;
          break;

        case ADVENTURES_IN_REVIEW:
          action = REQUEST_REVIEW;
          break;

        case ADVENTURES_REJECTED:
          action = REJECT;
          break;

        case ADVENTURES_UNPUBLISHED:
          action = UNPUBLISH;
          break;

        case ADVENTURES_PUBLISHED:
          action = PUBLISH;
          break;
        
        case ADVENTURES_CANCELLED:
          action = CANCEL;
          break;
      }

      this.$store.dispatch(`${ACTION_NAMESPACE}/${action}`, {
        adventureId: this.$route.params.adventureId
      }).then( () => {
        this.$root.$emit('new-history-message');
      });
    }
  }
}
</script>

