<template lang="pug">
  .adventure-analytics
    .row
      .col-1-2(v-if="tipUsage.length")
        .analytics-chart-header.analytics-chart-header--pad-top {{ $t("adventure_analytics.progression_tip_usage") }}
        BarChart(:chart-data="tipUsageData" :styles="tipUsageStyles" :options="tipUsageOptions")

      .col-1-2(v-if="timeSpentPerPoint.length")
        .analytics-chart-header.analytics-chart-header--pad-top {{ $t("adventure_analytics.progression_average_time") }}
        BarChart(:chart-data="timeSpentPerPointData" :styles="timeSpentStyles" :options="timeSpentOptions")

      .col-1-2(v-if="wrongEntries.length")
        .analytics-chart-header.analytics-chart-header--pad-top {{ $t("adventure_analytics.progression_wrong_entries") }}
        BarChart(:chart-data="wrongEntriesData" :styles="wrongEntriesStyles" :options="wrongEntriesOptions")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import moment from 'moment'

import PieChart from '@/components/shared/charts/PieChart.vue'
import BarChart from '@/components/shared/charts/BarChart.vue'

import { LOAD_ANALYTICS_USER_PROGRESS } from '@/store/action-types'

import { BAR_BACKGROUND_COLOR } from '@/config'

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

      tipUsage: state => state.analytics.userProgress.tipUsage,
      timeSpentPerPoint: state => state.analytics.userProgress.timeSpentPerPoint,
      wrongEntries: state => state.analytics.userProgress.wrongEntries,

      loading: state => state.analytics.loading,
      error: state => state.analytics.error
    }),

    tipUsageData () {
      return {
        labels: this.tipUsage.map((tipUsage, index) => {

          return `#${index + 1}`;
        }),
        datasets: [
          {
            backgroundColor: BAR_BACKGROUND_COLOR,
            data: this.tipUsage.map(tipUsage => tipUsage.percentage)
          }
        ]
      }
    },
    tipUsageOptions () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return value + '%';
              }
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => {
              return `${tooltipItem.yLabel}% (${this.tipUsage[tooltipItem.index].count})`;
            }
          }
        }
      }
    },
    tipUsageStyles () {
      return {
        height: "300px",
        position: "relative"
      }
    },

    timeSpentPerPointData () {
      return {
        labels: this.timeSpentPerPoint.map((timeSpent, index) => {

          return `#${index + 1}`;
        }),
        datasets: [
          {
            backgroundColor: BAR_BACKGROUND_COLOR,
            data: this.timeSpentPerPoint.map(timeSpent => timeSpent.average)
          }
        ]
      }
    },
    timeSpentOptions () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              callback: (value, index, values) => {
                return this.formatTime(value);
              }
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => {
              return this.formatTime(this.timeSpentPerPoint[tooltipItem.index].average);
            }
          }
        }
      }
    },
    timeSpentStyles () {
      return {
        height: "300px",
        position: "relative"
      }
    },

    wrongEntriesData () {
      return {
        labels: this.wrongEntries.map((wrongEntry, index) => {

          return `#${index + 1}`;
        }),
        datasets: [
          {
            backgroundColor: BAR_BACKGROUND_COLOR,
            data: this.wrongEntries.map(wrongEntry => wrongEntry.percentage)
          }
        ]
      }
    },
    wrongEntriesOptions () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return value + '%';
              }
            }
          }]
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (tooltipItem, data) => {
              return `${tooltipItem.yLabel}% (${this.wrongEntries[tooltipItem.index].count})`;
            }
          }
        }
      }
    },
    wrongEntriesStyles () {
      return {
        height: "300px",
        position: "relative"
      }
    },
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ANALYTICS_USER_PROGRESS}`, {
      id: this.$route.params.adventureId
    });
  },
  methods: {
    formatTime (value) {
      if(value < 60) {
        return `${value}s`;
      } else {
        let seconds = value % 60;
        let minutes = Math.floor(value / 60) % 60;
        let hours = Math.floor(value / 3600);

        if(hours == 0) {
          return `${minutes}min ${seconds}s`;
        } else {
          return `${hours}h ${minutes}min ${seconds}s`;
        }
      }
    }
  }
}
</script>
