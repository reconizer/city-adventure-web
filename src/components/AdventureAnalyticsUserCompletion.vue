<template lang="pug">
  .adventure-analytics
    .row
      .col-1-2(v-if="participants.completed != undefined")
        .analytics-chart-header
          span {{ $t("adventure_analytics.completion_participants", { value: totalParticipants }) }}
          .icon.icon--question-mark.icon--pad-left
            .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
              .icon__tooltip {{ $t("adventure_analytics.completion_abandoned_tip") }}

        PieChart(:chart-data="participantsData" :styles="pieChartStyles" :options="pieChartOptions")

      .col-1-2(v-if="rankings.length")
        .analytics-chart-header {{ $t("adventure_analytics.completion_clear_times") }}
        .row.analytics-chart-subheader
          .col-1-2
            .analytics-time
              .analytics-time__label {{ $t("adventure_analytics.completion_worst_time") }}
              .analytics-time__value {{ worstTime }}

          .col-1-2
            .analytics-time
              .analytics-time__label {{ $t("adventure_analytics.completion_best_time") }}
              .analytics-time__value {{ bestTime }}

        BarChart(:chart-data="rankingsData" :styles="rankingsChartStyles" :options="rankingsChartOptions")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import moment from 'moment'

import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

import { LOAD_ANALYTICS_USER_COMPLETION } from '@/store/action-types'

const ACTION_NAMESPACE = 'analytics'

export default {
  name: 'AdventureAnalyticsUserProgress',
  components: {
    BarChart,
    PieChart
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      participants: state => state.analytics.userCompletion.participants,
      rankings: state => state.analytics.userCompletion.rankings,

      loading: state => state.analytics.loading,
      error: state => state.analytics.error
    }),

    participantsData () {
      return {
        labels: [
          this.$t('adventure_analytics.completion_completed'),
          this.$t('adventure_analytics.completion_completed_with_tips'),
          this.$t('adventure_analytics.completion_in_progress'),
          this.$t('adventure_analytics.completion_abandoned')
        ],
        datasets: [
          {
            backgroundColor: [
              '#7bc043',
              '#ffdc00',
              '#ff851b',
              '#ff4136'
            ],
            data: [
              this.participants.completed,
              this.participants.completed_with_tips,
              this.participants.in_progress,
              this.participants.abandoned
            ]
          }
        ]
      }
    },
    pieChartOptions () {
      return {
        maintainAspectRatio: false,
        cutoutPercentage: 50
      }
    },
    pieChartStyles () {
      return {
        height: "300px",
        position: "relative"
      }
    },

    totalParticipants () {
      return this.participants.completed +
        this.participants.completed_with_tips +
        this.participants.in_progress +
        this.participants.abandoned;
    },

    rankingsData () {
      return {
        labels: this.rankings.map((ranking) => {
          let avg = Math.floor((ranking.lower + ranking.higher) / 2);

          return `~ ${this.formatTime(avg, true)}`;
        }),
        datasets: [
          {
            backgroundColor: '#ff88ba',
            data: this.rankings.map(ranking => ranking.count)
          }
        ]
      }
    },
    rankingsChartOptions () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xAxes: [{
            ticks: {
              userCallback: (item, index) => null
            }
          }]
        }
      }
    },
    rankingsChartStyles () {
      return {
        height: "300px",
        position: "relative"
      }
    },

    worstTime () {
      return this.formatTime(this.rankings[0].lower);
    },

    bestTime () {
      return this.formatTime(this.rankings[this.rankings.length - 1].higher);
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ANALYTICS_USER_COMPLETION}`, {
      id: this.$route.params.adventureId
    });
  },
  methods: {
    formatTime (value, skipSeconds = false) {
      if(value < 60) {
        return `${value}s`;
      } else {
        let seconds = value % 60;
        let minutes = Math.floor(value / 60) % 60;
        let hours = Math.floor(value / 3600);

        if(hours == 0) {
          if(skipSeconds) {
            return `${minutes}min`;
          } else {
            return `${minutes}min ${seconds}s`;
          }
        } else {
          if(skipSeconds) {
            return `${hours}h ${minutes}min`;
          } else {
            return `${hours}h ${minutes}min ${seconds}s`;
          }
        }
      }
    }
  }
}
</script>
