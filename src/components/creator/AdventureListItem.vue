<template lang="pug">
  .adventure-list-item
    .col-1-6
      .adventure-list-item__cover
        img(:src="adventure.cover_url")

    .col-1-6
      .adventure-list-item__name {{ adventure.name }}

    .col-1-6
      .adventure-list-item__label {{ $t("adventures.adventure_status") }}
      .adventure-list-item__status(
        :class="{ 'adventure-list-item__status--published': published, 'adventure-list-item__status--in-review': inReview }"
      )
        span {{ publishedLabel }}

    .col-1-6
      .adventure-list-item__label {{ $t("adventures.adventure_rating") }}
      RatingStars(v-if="adventure.rating" :rating="adventure.rating" :withLabel="false")
      span(v-else) -

    .col-1-6
      .adventure-list-item__label {{ $t("adventures.adventure_visibility") }}
      span(v-if="!adventure.shown") {{ $t("adventures.adventure_hidden") }}
      span(v-else) {{ $t("adventures.adventure_public") }}

    .col-1-6
      .text-right
        router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--pencil
            .icon__tooltip-wrapper
              .icon__tooltip {{ $t("general.edit") }}

        .button.button--icon(v-if="removable" @click.prevent="confirmRemove")
          .icon.icon--close
            .icon__tooltip-wrapper
              .icon__tooltip {{ $t("general.remove") }}
</template>

<script>
import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_PENDING,
  ADVENTURES_CANCELLED,
  ADVENTURES_REJECTED
} from '@/config'

import RatingStars from '@/components/shared/RatingStars.vue'

export default {
  name: 'AdventureListItem',
  components: {
    RatingStars
  },
  props: {
    adventure: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    published () {
      return this.adventure.status == ADVENTURES_PUBLISHED;
    },

    inReview () {
      return this.adventure.status == ADVENTURES_IN_REVIEW;
    },

    removable () {
      return this.adventure.status == ADVENTURES_PENDING || this.adventure.status == ADVENTURES_UNPUBLISHED;
    },

    publishedLabel () {
      switch(this.adventure.status) {
        default:
        case ADVENTURES_PUBLISHED:
          return this.$t("adventures.adventure_published");
        case ADVENTURES_IN_REVIEW:
          return this.$t("adventures.adventure_in_review");
        case ADVENTURES_UNPUBLISHED:
          return this.$t("adventures.adventure_unpublished");
        case ADVENTURES_REJECTED:
          return this.$t("adventures.adventure_rejected");
        case ADVENTURES_CANCELLED:
          return this.$t("adventures.adventure_cancelled");
        case ADVENTURES_PENDING:
          return this.$t("adventures.adventure_pending");
      }
    }
  },
  methods: {
    confirmRemove () {
      this.$root.$emit('confirm-remove', this.adventure.id);
    }
  }
}
</script>
