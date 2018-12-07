<template lang="pug">
  .adventure-list-item
    .col-1-6
      .adventure-list-item__cover
        img(:src="adventure.cover_url")

    .col-2-6
      .adventure-list-item__name {{ adventure.name }}

    .col-1-6
      .adventure-list-item__label {{ $t("adventures.adventure_status") }}
      .adventure-list-item__status(:class="{'adventure-list-item__status--published': adventure.published }")
        span(v-if="adventure.published") {{ $t("adventures.adventure_published") }}
        span(v-else) {{ $t("adventures.adventure_unpublished") }}

    .col-1-6
      .row
        .col-1-2
          .adventure-list-item__label {{ $t("adventures.adventure_rating") }}
          span {{ adventure.rating }}

        .col-1-2
          .adventure-list-item__label {{ $t("adventures.adventure_visibility") }}
          span(v-if="adventure.hidden") {{ $t("adventures.adventure_hidden") }}
          span(v-else) {{ $t("adventures.adventure_public") }}

    .col-1-6
      .text-right
        router-link.button.button--blue(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--sm.icon--pencil-white.icon--pad-right
          span {{ $t("general.edit") }}
</template>

<script>
export default {
  name: 'AdventureListItem',
  props: {
    adventure: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
