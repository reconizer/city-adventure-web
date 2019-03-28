<template lang="pug">
  .user-list
    form.user-list-filters(@submit="filtersSubmit")
      .form-control.form-control--inline
        input.form-input(type="text" v-model="query" :placeholder="$t('general.query')")

      .form-control.form-control--inline
        input.button.button--blue(type="submit" :value="$t('general.filter')")

    .user-list-empty(v-if="totalPages == 0 && !loading") {{ $t("admin_users.empty") }}

    PlayerListItem(
      v-for="player in players"
      :key="player.id"
      :player="player"
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

import { LOAD_PLAYERS } from '@/store/action-types'

import PlayerListItem from '@/components/admin/users/PlayerListItem'

import Pagination from '@/components/shared/Pagination'

const ACTION_NAMESPACE = 'players'

export default {
  name: 'PlayerList',
  components: {
    PlayerListItem,
    Pagination
  },
  data () {
    return {
      page: +(this.$route.query.page || 1),
      query: this.$route.query.query || ""
    }
  },
  computed: {
    ...mapState({
      players: state => state.players.list,
      totalPages: state => state.players.totalPages,

      error: state => state.players.errors[LOAD_PLAYERS]
    })
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PLAYERS}`, {
      page: this.page,
      query: this.query
    });
  },
  methods: {
    search () {
      this.$router.push({
        name: this.$router.currentRoute.name,
        query: {
          page: this.page,
          query: this.query
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
