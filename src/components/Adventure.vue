<template lang="pug">
  div
    Loader(v-if="loading || analyticsLoading")

    .adventure-structure(:class="{ 'adventure-structure--expanded': this.expanded }")
      .adventure-structure__header
        router-link.adventure-structure__title(
          v-if="adventure.id"
          :to="{ name: 'adventureMap', params: { adventureId: adventure.id } }"
        ) {{ adventure.name }}

        .adventure-structure__label(v-if="adventure.published") {{ $t("adventures.adventure_published") }}

        .adventure-structure__edit(
          v-if="adventure.id"
          @click="openSubmenu"
        )
          .icon.icon--settings

      AdventurePointList

    transition(name="submenu" v-if="submenu")
      .submenu-mask(@click="closeSubmenu")
        .adventure-header-submenu
          router-link.adventure-header-submenu__item(
            :to="{ name: 'adventureSettings', params: { adventureId: adventure.id } }"
          ) 
            span(v-if="adventure.published") {{ $t("adventure.adventure_details") }}
            span(v-else) {{ $t("adventure.edit_adventure") }}

          router-link.adventure-header-submenu__item(
            :to="{ name: 'adventurePublishing', params: { adventureId: adventure.id } }"
          ) {{ $t("adventure_publishing.title") }}

          router-link.adventure-header-submenu__item(
            v-if="adventure.published"
            :to="{ name: 'adventureAnalytics', params: { adventureId: adventure.id } }"
          ) {{ $t("adventure_analytics.title") }}

          router-link.adventure-header-submenu__item(
            :to="{ name: 'adventureTesting', params: { adventureId: adventure.id } }"
          ) {{ $t("adventure_testing.title") }}

    //.adventure-structure-expander(@click="toggleExpand")
      span Expand

    AdventureMap

    router-view(:key="$route.fullPath")
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURE } from '@/store/action-types'

import AdventureMap from '@/components/AdventureMap.vue'
import AdventurePointList from '@/components/AdventurePointList.vue'

import Loader from '@/views/Loader.vue'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'Adventure',
  components: {
    AdventurePointList,
    AdventureMap,

    Loader
  },
  data () {
    return {
      expanded: true,
      submenu: false
    }
  },
  computed: mapState({
    adventure: state => state.adventure.item,
    points: state => state.adventure.points,

    loading: state => state.adventure.loading,
    analyticsLoading: state => state.analytics.loading,
    error: state => state.adventure.error
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURE}`, { id: this.$route.params.adventureId })
      .then(() => {
        if(this.$router.currentRoute.params.pointId) {
          let pointId = this.$router.currentRoute.params.pointId;

          let point = this.points.find(point => point.id == pointId);

          if(point) {
            if(this.$router.currentRoute.params.clueId) {
              let clue = point.clues.find(clue => clue.id == this.$router.currentRoute.params.clueId);

              if(!clue) {
                this.$router.replace({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
              }
            }
          } else {
            this.$router.replace({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
          }
        }
      })
      .catch( error => {
        this.$router.replace({ name: 'home' });
      });
  },
  methods: {
    toggleExpand () {
      this.expanded = !this.expanded;
    },

    openSubmenu () {
      this.submenu = true;
    },
    closeSubmenu () {
      this.submenu = false;
    }
  }
}
</script>
