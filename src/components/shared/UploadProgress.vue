<template lang="pug">
  .file-upload-progress(v-if="upload.inProgress")
    .file-upload-progress__info
      span(v-if="upload.totalUploads > 1") {{ $t('uploads.label') }} {{ $t('uploads.info', { current: upload.currentUpload, total: upload.totalUploads }) }}
      span(v-else) {{ $t('uploads.label') }}

    .file-upload-progress__progress(:class="'file-upload-progress__progress--' + upload.progress")
      .file-upload-progress__label {{ upload.progress }}%
</template>

<script>
export default {
  name: 'UploadProgress',
  props: {
    upload: {
      type: Object,
      required: true
    }
  }
}
</script>
