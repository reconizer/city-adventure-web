<template lang="pug">
  .ratings-stars(:title="title")
    .icon.icon--full-star.icon--pad-right(v-for="i in fullStars")
    .icon.icon--half-star.icon--pad-right(v-if="hasHalfStar")
    .icon.icon--empty-star.icon--pad-right(v-for="i in emptyStars")
    .analytics-stars__label(v-if="withLabel") {{ title }}
</template>

<script>
export default {
  name: 'RatingStars',
  props: {
    rating: {
      type: Number,
      default: () => 0
    },
    withLabel: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    title () {
      return this.$t("stars.label", { value: this.rating });
    },

    starPart () {
      return this.rating - Math.floor(this.rating);
    },
    hasExtraStar () {
      return this.starPart >= 0.75;
    },
    hasHalfStar () {
      return 0.25 <= this.starPart && this.starPart < 0.75;
    },
    fullStars () {
      return Math.floor(this.rating) + (this.hasExtraStar ? 1 : 0);
    },
    emptyStars () {
      return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
    }
  }
}
</script>
