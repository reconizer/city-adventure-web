<template lang="pug">
  div
    Loader(v-if="loading")

    .adventure-structure(:class="{ 'adventure-structure--expanded': this.expanded }")
      .adventure-structure__header
        router-link.adventure-structure__title(
          v-if="adventure.id"
          :to="{ name: 'adventureMap', params: { adventureId: adventure.id } }"
        ) {{ adventure.name }}

        router-link.adventure-structure__label(
          :to="{ name: 'adventurePublishing', params: { adventureId: adventure.id } }"
          v-if="adventure.id"
          :class="labelClass"
        )
          span {{ publishedLabel }}
          .icon.icon--sm.icon--lock-white.icon--pad-left(v-if="!editable")
            .icon__tooltip-wrapper.icon__tooltip-wrapper--bottom
              .icon__tooltip {{ $t("adventure.editing_disabled") }}

        .adventure-structure__menu-toggle(
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
            span(v-if="!editable") {{ $t("adventure.adventure_details") }}
            span(v-else) {{ $t("adventure.edit_adventure") }}

          router-link.adventure-header-submenu__item(
            :to="{ name: 'adventurePublishing', params: { adventureId: adventure.id } }"
          ) {{ $t("adventure_publishing.title") }}

          router-link.adventure-header-submenu__item(
            v-if="published"
            :to="{ name: 'adventureAnalytics', params: { adventureId: adventure.id } }"
          ) {{ $t("adventure_analytics.title") }}

          router-link.adventure-header-submenu__item(
            :to="{ name: 'adventureTesting', params: { adventureId: adventure.id } }"
          ) {{ $t("adventure_testing.title") }}

    //.adventure-structure-expander(@click="toggleExpand")
      span Expand

    AdventureMap

    Modal(v-if="removePointModalShown" @close="closeModals")
      div(slot="header") {{ $t("adventure.remove_puzzle") }}

      p {{ $t("adventure.remove_puzzle_confirm") }}

      .text-center
        a.button.button--blue(@click="destroyPoint") {{ $t("general.submit") }}

    router-view(:key="$route.fullPath")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { LOAD_ADVENTURE } from '@/store/action-types'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_PENDING,
  ADVENTURES_CANCELLED
} from '@/config'

import AdventureMap from '@/components/shared/AdventureMap.vue'
import AdventurePointList from '@/components/shared/AdventurePointList.vue'
import Modal from '@/components/shared/Modal'

import Loader from '@/views/Loader.vue'

const ACTION_NAMESPACE = 'adventure'

import { DESTROY_POINT } from '@/store/action-types'

export default {
  name: 'Adventure',
  components: {
    AdventurePointList,
    AdventureMap,
    Modal,

    Loader
  },
  data () {
    return {
      expanded: true,
      submenu: false,
      removePointModalShown: false,
      currentPoint: null
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      points: state => state.adventure.points,

      loading: state => state.adventure.loading || state.analytics.loading || state.publishment.loading,
      error: state => state.adventure.error
    }),
    ...mapGetters('adventure', {
      published: 'published',
      inReview: 'inReview',
      editable: 'editable',
      publishedLabel: 'publishedStatusLabel'
    }),

    labelClass () {
      switch(this.adventure.status) {
        default:
        case ADVENTURES_PUBLISHED:
          return 'adventure-structure__label--published';
        case ADVENTURES_IN_REVIEW:
          return 'adventure-structure__label--in-review';
        case ADVENTURES_UNPUBLISHED:
          return 'adventure-structure__label--unpublished';
        case ADVENTURES_REJECTED:
          return 'adventure-structure__label--rejected';
        case ADVENTURES_PENDING:
          return 'adventure-structure__label--pending';
        case ADVENTURES_CANCELLED:
          return 'adventure-structure__label--cancelled';
      }
    }
  },
  created () {
    this.$root.$on('remove-point', (point) => {
      this.currentPoint = point;

      this.removePointModalShown = true;
    });

    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURE}`, { id: this.$route.params.adventureId })
      .then(() => {
        if(this.$router.currentRoute.params.pointId) {
          let point = this.points.find(point => point.id == this.$router.currentRoute.params.pointId);

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
    },

    closeModals () {
      this.removePointModalShown = false;
    },

    destroyPoint () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_POINT}`, { pointId: this.currentPoint.id })
        .then( (response) => {
          if(this.$router.currentRoute.name == "adventurePoint" ||
              this.$router.currentRoute.name == "adventureClue" ||
              this.$router.currentRoute.name == "newAdventureClue") {

            if(this.$router.currentRoute.params.pointId == this.currentPoint.id) {
              setTimeout(() => {
                this.$router.replace({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
              }, 0);
            }
          }

          this.$root.$emit('point-removed', this.currentPoint.id);

          this.currentPoint = null;
          
          this.closeModals();
        });
    }
  }
}
</script>
