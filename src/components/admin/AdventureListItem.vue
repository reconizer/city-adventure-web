<template lang="pug">
  .row.adventure-list-item
    .col-1-12
      .adventure-list-item__cover
        img(:src="adventure.cover_url")

    .col-2-12
      .adventure-list-item__name {{ adventure.name }}

    .col-2-12
      .adventure-list-item__label {{ $t("adventures.adventure_status") }}
      .adventure-list-item__status(
        :class="{ 'adventure-list-item__status--published': published, 'adventure-list-item__status--in-review': inReview }"
      )
        span {{ publishedLabel }}

    .col-2-12
      .adventure-list-item__label {{ $t("adventures.adventure_rating") }}
      RatingStars(v-if="adventure.rating" :rating="adventure.rating" :withLabel="false")
      span(v-else) -

    .col-1-12
      .adventure-list-item__label {{ $t("adventures.adventure_visibility") }}
      span(v-if="adventure.hidden") {{ $t("adventures.adventure_hidden") }}
      span(v-else) {{ $t("adventures.adventure_public") }}

    .col-1-12
      .adventure-list-item__label Published At
      span {{ publishedDate }}

    .col-3-12
      .text-right
        router-link.button.button--blue(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--sm.icon--pencil-white.icon--pad-right
          span {{ $t("general.edit") }}
</template>

<script>
import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED
} from '@/config'

import RatingStars from '@/components/shared/RatingStars.vue'

import moment from 'moment'

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

    publishedLabel () {
      if(this.adventure.status == ADVENTURES_PUBLISHED) {
        return this.$t("adventures.adventure_published");
      } else if (this.adventure.status == ADVENTURES_IN_REVIEW) {
        return this.$t("adventures.adventure_in_review");
      } else {
        return this.$t("adventures.adventure_unpublished");
      }
    },

    publishedDate () {
      return moment(this.adventure.published_at).format('DD/MM/YYYY');
    }
  }
}
</script>
