<template lang="pug">
  .wrapper.wrapper--constrained
    .adventure-list
      .adventure-list__header {{ $t("top_menu.adventures") }}

      div(v-if="counters.published")
        .tabs.tabs--simple
          router-link.tabs__item(
            active-class="tabs__item--active"
            :to="{ name: 'adventuresPublished' }"
          ) {{ $t("adventures.adventure_published") }} ({{ published }})

          router-link.tabs__item(
            active-class="tabs__item--active"
            :to="{ name: 'adventuresUnpublished' }"
          ) {{ $t("adventures.adventure_unpublished") }} ({{ unpublished }})

          router-link.tabs__item(
            active-class="tabs__item--active"
            :to="{ name: 'adventuresInReview' }"
          ) {{ $t("adventures.adventure_in_review") }} ({{ inReview }})

          router-link.tabs__item(
            active-class="tabs__item--active"
            :to="{ name: 'adventuresRejected' }"
          ) {{ $t("adventures.adventure_rejected") }} ({{ rejected }})

          router-link.tabs__item(
            active-class="tabs__item--active"
            :to="{ name: 'adventuresCancelled' }"
          ) {{ $t("adventures.adventure_cancelled") }} ({{ cancelled }})

          router-link.tabs__item(
            active-class="tabs__item--active"
            :to="{ name: 'adventuresPending' }"
          ) {{ $t("adventures.adventure_pending") }} ({{ pending }})

        router-view(:key="$route.fullPath")

    Loader(v-if="counters.published == null || loading")
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_COUNTERS } from '@/store/action-types'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

import Loader from '@/views/Loader'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'Adventures',
  components: {
    Loader
  },
  computed: {
    ...mapState({
      counters: state => state.adventures.counters,

      loading: state => state.adventures.loading
    }),
    published () {
      return this.counters[ADVENTURES_PUBLISHED];
    },
    inReview () {
      return this.counters[ADVENTURES_IN_REVIEW];
    },
    unpublished () {
      return this.counters[ADVENTURES_UNPUBLISHED];
    },
    rejected () {
      return this.counters[ADVENTURES_REJECTED];
    },
    cancelled () {
      return this.counters[ADVENTURES_CANCELLED];
    },
    pending () {
      return this.counters[ADVENTURES_PENDING];
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_COUNTERS}`);
  }
}
</script>
