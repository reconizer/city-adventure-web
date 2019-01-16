<template lang="pug">
  div
    .adventure-point-list(
      v-if="startingPoint"
      :class="{ 'adventure-point-list--non-editable': !editable }"
    )
      .adventure-point-list__line

      .adventure-point-start-wrapper(
        :id="elementId(startingPoint)"
        :class="{ 'adventure-point-start-wrapper--only': points.length == 0 }"
      )
        .adventure-point
          router-link.button.button--pink.adventure-point__name(
            :to="{ name: 'adventurePoint', params: { adventureId: adventure.id, pointId: startingPoint.id } }"
            exact-active-class="adventure-point__name--active"
          ) {{ $t("adventure.start") }}

          .adventure-point__controls
            router-link.button.button--blue.adventure-point__control(
              :to="{ name: 'adventureMap', params: { adventureId: adventure.id } }"
              @click.native="goToPoint(startingPoint)"
            )
              .icon.icon--sm.icon--marker.icon--pad-right
              span {{ $t("adventure.go_to_puzzle") }}

        AdventurePointClueList(:point="startingPoint")

      draggable(
        v-model="points"
        :options="{ draggable: '.adventure-point-wrapper', group: 'points', disabled: !editable }"
      )
        .adventure-point-wrapper(
          v-for="(point, pointIndex) in points"
          :key="point.id"
          :id="elementId(point)"
        )
          .adventure-point
            router-link.button.button--gray.adventure-point__name(
              :to="{ name: 'adventurePoint', params: { adventureId: adventure.id, pointId: point.id } }"
              exact-active-class="adventure-point__name--active"
            )
              span {{ pointIndex + 1 }}
              .icon.icon--eye-inactive.icon--pad-left(v-if="point.hidden")
                .icon__tooltip-wrapper
                  .icon__tooltip {{ $t("adventure.hidden") }}
              .icon.icon--eye.icon--pad-left(v-if="!point.hidden")
                .icon__tooltip-wrapper
                  .icon__tooltip {{ $t("adventure.visible") }}
              .icon.icon--lock-white.icon--pad-left(v-if="hasPassword(point)")
                .icon__tooltip-wrapper
                  .icon__tooltip {{ $t("adventure.password_required") }}
              .icon.icon--clock.icon--pad-left(v-if="hasTimeConstraint(point)")
                .icon__tooltip-wrapper
                  .icon__tooltip {{ $t("adventure.time_constraint") }}

            .adventure-point__controls
              router-link.button.button--blue.adventure-point__control(
                :to="{ name: 'adventureMap', params: { adventureId: adventure.id } }"
                @click.native="goToPoint(point)"
              )
                .icon.icon--sm.icon--marker.icon--pad-right
                span {{ $t("adventure.go_to_puzzle") }}

              .button.button--blue.adventure-point__control(v-if="editable" @click="destroyPoint(point)")
                .icon.icon--sm.icon--close-white.icon--pad-right
                span {{ $t("general.remove") }}

          AdventurePointClueList(:point="point")

    .adventure-point-new-wrapper(v-if="startingPoint && editable")
      .adventure-point.adventure-point--new
        router-link.button.button--blue.adventure-point__name(
          :to="{ name: 'adventureMap', params: { adventureId: adventure.id } }"
          @click.native="addNewPuzzle()"
        )
          .icon.icon--add-white.icon--pad-right
          span {{ $t("adventure.add_new_puzzle") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { UPDATE_POINTS, DESTROY_POINT } from '@/store/action-types'

import draggable from 'vuedraggable'

import AdventurePointClueList from '@/components/shared/AdventurePointClueList.vue'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventurePointList',
  components: {
    AdventurePointClueList,
    draggable
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      loading: state => state.adventure.loading
    }),
    ...mapGetters('adventure', {
      startingPoint: 'startingPoint',
      puzzlePoints: 'puzzlePoints',
      editable: 'editable'
    }),

    points: {
      get () { return this.puzzlePoints },
      set (value) {
        let payload = value.map(point => { 
          return { id: point.id }
        });

        for(let i = 0; i < payload.length; i++) {
          let prev = payload[i - 1];

          if(prev == undefined) {
            payload[i].parent_id = this.startingPoint.id;
          } else {
            payload[i].parent_id = payload[i-1].id;
          }
        }

        this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_POINTS}`, { payload: payload })
      }
    }
  },
  methods: {
    elementId (point) {
      return `point-${point.id}`;
    },
    hasPassword (point) {
      return point.answers.filter((el) => {
        return el.type == "password"
      }).length > 0;
    },
    hasTimeConstraint (point) {
      return point.answers.filter((el) => {
        return el.type == "time"
      }).length > 0;
    },
    goToPoint (point) {
      // Handle map centering in AdventureMap component
      this.$root.$emit('center-camera', point.position);
    },
    addNewPuzzle () {
      // Handle new point creation in AdventureMap component
      this.$root.$emit('add-new-point');
    },

    destroyPoint (point) {
      this.$root.$emit('remove-point', point);
    }
  }
}
</script>
