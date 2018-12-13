<template lang="pug">
  div
    form.adventure-list__filters(@submit="filtersSubmit")
      .form-control.form-control--inline
        input.form-input(type="text" v-model="query" :placeholder="$t('general.query')")

      .form-control.form-control--inline.filter-select
        v-select(
          :placeholder="$t('general.sort_placeholder')"
          :clearable="false"
          :value="sorting"
          :options="sortingOptions"
          @input="updateSort($event)"
        )

      .form-control.form-control--inline
        input.button.button--blue(type="submit" :value="$t('general.filter')")

    AdventureListItem(
      v-for="adventureItem in adventures"
      :key="adventureItem.id"
      :adventure="adventureItem"
    )

    .pagination-container(v-if="totalPages > 1")
      Pagination(
        :totalPages="totalPages"
        :page="page"
        :paginationClick="paginationClick"
      )
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURES } from '@/store/action-types'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,

  ADVENTURE_SORTING_OPTIONS
} from '@/config'

import AdventureListItem from '@/components/admin/AdventureListItem.vue'

import Pagination from '@/components/shared/Pagination'

import Loader from '@/views/Loader.vue'

import vSelect from 'vue-select'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'AdventureList',
  components: {
    AdventureListItem,
    Pagination,

    Loader,

    vSelect
  },
  props: {
    listType: {
      type: String,
      required: true,
      validator: (value) => {
        return [
          ADVENTURES_PUBLISHED,
          ADVENTURES_IN_REVIEW,
          ADVENTURES_UNPUBLISHED
        ].indexOf(value) != -1
      }
    }
  },
  data () {
    return {
      page: +(this.$route.query.page || 1),
      query: this.$route.query.query || "",
      sortValue: ""
    }
  },
  computed: {
    ...mapState({
      adventures: state => state.adventures.list,
      totalPages: state => state.adventures.totalPages,

      loading: state => state.adventures.loading,
      error: state => state.adventures.error
    }),

    sorting () {
      return this.sortingOptions.find(opt => opt.value == (this.$route.query.sort || ADVENTURE_SORTING_OPTIONS[0]));
    },
    sortingOptions () {
      return ADVENTURE_SORTING_OPTIONS.map(option => {
        return {
          value: option,
          label: this.$t(`adventures.sorting_${option}`)
        };
      });
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`, {
      adventureType: this.listType,
      page: this.page,
      query: this.query,
      sort: this.sorting.value
    });
  },
  methods: {
    updateSort (evt) {
      this.sortValue = evt.value;
    },

    search () {
      this.$router.push({
        name: this.$router.currentRoute.name,
        query: {
          page: this.page,
          query: this.query,
          sort: this.sortValue
        }
      });
    },

    filtersSubmit () {
      this.page = 1;
      this.search();
    },

    paginationClick (page) {
      this.page = page;

      this.search();
    }
  }
}
</script>
