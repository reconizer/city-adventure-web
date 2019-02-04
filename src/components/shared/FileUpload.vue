<template lang="pug">
  .file-upload(
    @click="openFileSelection"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
    :class="{ 'file-upload--highlight': highlight, 'file-upload--disabled': !enabled }"
  )
    div(v-if="!!$slots.placeholder")
      slot(name="placeholder")

    span(v-else) {{ computedTitle }}

    input.file-upload__input(
      ref="fileInput"
      type="file"
      :multiple="multiple"
      @change="onFileChanged"
    )
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    enabled: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      highlight: false
    }
  },
  computed: {
    computedTitle () {
      if(this.title) {
        return this.title;
      } else {
        return this.$t("general.upload_files");
      }
    }
  },
  methods: {
    openFileSelection () {
      if(!this.enabled) {
        return;
      }

      this.$refs.fileInput.click();
    },

    onDragOver (evt) {
      if(!this.enabled) {
        return;
      }

      evt.preventDefault();

      this.highlight = true;
    },

    onDragLeave (evt) {
      if(!this.enabled) {
        return;
      }

      this.highlight = false;
    },

    onDrop (evt) {
      if(!this.enabled) {
        return;
      }

      evt.preventDefault();

      const files = evt.dataTransfer.files;

      let result = [];

      let length = this.multiple ? files.length : 1;

      for(var i = 0; i < length; i++) {
        result.push(files.item(i));
      }

      this.$emit('filesAdded', result);

      this.highlight = false;
    },

    onFileChanged (evt) {
      let result = [];

      let files = evt.target.files;

      let length = this.multiple ? files.length : 1;

      for(var i = 0; i < length; i++) {
        result.push(files.item(i));
      }

      this.$emit('filesAdded', result);
    }
  }
}
</script>
