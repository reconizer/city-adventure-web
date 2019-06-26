<template lang="pug">
  .wrapper.wrapper--constrained
    .adventure-list
      .adventure-list__header {{ $t("top_menu.adventures") }}

      form.adventure-list__filters(@submit="search")
        .form-control.form-control--inline
          input.form-input(type="text" v-model="searchParams.filters.by_name" :placeholder="$t('adventures.query_by_name')")

        .form-control.form-control--inline
          input.form-input(type="text" v-model="searchParams.filters.by_creator_name" :placeholder="$t('adventures.query_by_author')")

        .form-control.form-control--inline.filter-select
          v-select(
            :placeholder="$t('adventure_publishing.status')"
            :clearable="false"
            :value="currentStatus"
            :options="statuses"
            @input="changeStatus"
          )

        .form-control.form-control--inline
          input.button.button--blue(type="submit" :value="$t('general.submit')")

      AdventureListItem(
        v-for="adventureItem in adventures"
        :key="adventureItem.id"
        :adventure="adventureItem"
      )

      infinite-loading(:identifier="identifier" @infinite="loadDataHandler")
        div(slot="spinner")
        div(slot="no-more")
        div(slot="no-results")

    Loader(v-if="loading")
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURES } from '@/store/action-types'

import { CLEAR_ADVENTURES } from '@/store/mutation-types'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

import AdventureListItem from '@/components/admin/AdventureListItem.vue'

import Loader from '@/views/Loader'

import vSelect from 'vue-select'

import cloneDeep from 'lodash.clonedeep'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'Adventures',
  components: {
    AdventureListItem,

    Loader,

    vSelect
  },
  data () {
    return {
      searchParams: {
        page: 1,
        filters: { 
          by_status: null,
          by_creator_name: null,
          by_name: null
        }
      },
      identifier: 0
    }
  },
  computed: {
    ...mapState({
      adventures: state => state.adventures.list,
      totalPages: state => state.adventures.totalPages,

      loading: state => state.adventures.loading,
      error: state => state.adventures.error
    }),

    statuses () {
      return [
        {
          value: null,
          label: this.$t('general.all')
        },
        {
          value: ADVENTURES_PENDING,
          label: this.$t('adventure_publishing.history_pending')
        },
        {
          value: ADVENTURES_IN_REVIEW,
          label: this.$t('adventure_publishing.history_in_review')
        },
        {
          value: ADVENTURES_REJECTED,
          label: this.$t('adventure_publishing.history_rejected')
        },
        {
          value: ADVENTURES_UNPUBLISHED,
          label: this.$t('adventure_publishing.history_unpublished')
        },
        {
          value: ADVENTURES_PUBLISHED,
          label: this.$t('adventure_publishing.history_published')
        },
        {
          value: ADVENTURES_CANCELLED,
          label: this.$t('adventure_publishing.history_cancelled')
        }
      ];
    },

    currentStatus () {
      return this.statuses.find(st => st.value == this.searchParams.filters.by_status);
    }
  },
  mounted () {
    this.$store.commit(`${ACTION_NAMESPACE}/${CLEAR_ADVENTURES}`);
  },
  methods: {
    loadDataHandler($state) {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`, {
        page: this.page,
        searchParams: this.searchParams
      }).then( (response) => {
        if(response.data.length) {
          this.searchParams.page += 1;

          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },

    changeStatus (evt) {
      if(evt.value == this.searchParams.filters.by_status) {
        return;
      }

      this.searchParams.page = 1;
      this.searchParams.filters.by_status = evt.value;

      this.$store.commit(`${ACTION_NAMESPACE}/${CLEAR_ADVENTURES}`);

      this.identifier += 1;
    },

    search () {
      this.searchParams.page = 1;

      this.$store.commit(`${ACTION_NAMESPACE}/${CLEAR_ADVENTURES}`);

      this.identifier += 1;
    }
  }
}
</script>
