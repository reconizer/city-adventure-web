<template lang="pug">
  Paginate(
    :page-count="totalPages"
    :value="page"
    :click-handler="paginationClick"
    :no-li-surround="true"
    :first-last-button="true"

    container-class="pagination"
    page-link-class="pagination__page"
    prev-link-class="pagination__page"
    next-link-class="pagination__page"
    break-view-link-class="pagination__break"
    disabled-class="pagination__page--disabled"
    active-class="pagination__page--active"

    :prev-text="$t('pagination.prev')"
    :next-text="$t('pagination.next')"
    :first-button-text="$t('pagination.first')"
    :last-button-text="$t('pagination.last')"
  )
</template>

<script>
import Paginate from 'vuejs-paginate'

export default {
  name: 'Pagination',
  components: {
    Paginate
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    paginationClick: {
      type: Function,
      default: () => { }
    }
  }
}
</script>
