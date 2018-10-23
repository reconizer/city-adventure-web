<template lang="pug">
  .adventure-list-item
    .col-1-6
      .adventure-list-item__cover
        img(:src="adventure.cover_url")

    .col-2-6
      .adventure-list-item__name {{ adventure.name }}

    .col-1-6
      div
        .adventure-list-item__label Status
        .adventure-list-item__status(:class="{'adventure-list-item__status--published': adventure.status == 'published' }") {{ adventureStatus }}

    .col-1-6
      div
        .adventure-list-item__label Rating
        span {{ adventure.rating }}

    .col-1-6
      .text-right
        router-link.button.button--blue(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }") Edit
</template>

<script>
export default {
  name: 'AdventureListItem',
  props: {
    adventure: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    adventureStatus () {
      switch(this.adventure.status) {
        case "published":
          return "Published";
        case "unpublished":
        default:
          return "Unpublished";
      }
    }
  }
}
</script>
