<template lang="pug">
  transition(name="modal")
    .modal-mask(@click="$emit('close')")
      .modal-wrapper
        .modal(@click.stop="")
          .modal__header
            slot(name="header")

          .modal__close(@click="$emit('close')")
            .icon.icon--close

          .modal__body
            slot
  
          .modal__footer(v-if="!!$slots.footer")
            slot(name="footer")
</template>

<script>
export default {
  name: 'Modal'
}
</script>
