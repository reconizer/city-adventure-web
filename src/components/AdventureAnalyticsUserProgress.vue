<template lang="pug">
  .adventure-analytics
    .row
      .col-1-2(v-if="participants.completed != undefined")
        .analytics-chart-header Participants ({{ totalParticipants }})
        PieChart(:chart-data="participantsData" :styles="pieChartStyles" :options="pieChartOptions")

      .col-1-2(v-if="rankings.length")
        .analytics-chart-header Clear Times
        .row.analytics-chart-subheader
          .col-1-2
            b Worst Time
            br
            span {{ minTime }}

          .col-1-2
            b Best Time
            br
            span {{ maxTime }}

        BarChart(:chart-data="rankingsData" :styles="rankingsChartStyles" :options="rankingsChartOptions")

      .col-1-2(v-if="tipUsage.length")
        .analytics-chart-header.analytics-chart-header--pad-top Tip Usage per Point
        BarChart(:chart-data="tipUsageData" :styles="tipUsageStyles" :options="tipUsageOptions")

      .col-1-2(v-if="timeSpentPerPoint.length")
        .analytics-chart-header.analytics-chart-header--pad-top Average Time Spent Per Point
        BarChart(:chart-data="timeSpentPerPointData" :styles="timeSpentStyles" :options="timeSpentOptions")

      .col-1-2(v-if="wrongEntries.length")
        .analytics-chart-header.analytics-chart-header--pad-top Wrong Password Per Point
        BarChart(:chart-data="wrongEntriesData" :styles="wrongEntriesStyles" :options="wrongEntriesOptions")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import moment from 'moment'

import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

import { LOAD_ANALYTICS_USER_PROGRESS } from '@/store/action-types'

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

      participants: state => state.analytics.userProgress.participants,
      rankings: state => state.analytics.userProgress.rankings,
      tipUsage: state => state.analytics.userProgress.tipUsage,
      timeSpentPerPoint: state => state.analytics.userProgress.timeSpentPerPoint,
      wrongEntries: state => state.analytics.userProgress.wrongEntries,

      loading: state => state.analytics.loading,
      error: state => state.analytics.error
    }),

    participantsData () {
      return {
        labels: ['Completed', 'Completed with Tips', 'In Progress', 'Abandoned'],
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

          return `About ${this.formatTime(avg)}`;
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

    minTime () {
      return this.formatTime(this.rankings[0].lower);
    },

    maxTime () {
      return this.formatTime(this.rankings[this.rankings.length - 1].higher);
    },

    tipUsageData () {
      return {
        labels: this.tipUsage.map((tipUsage, index) => {

          return `#${index + 1}`;
        }),
        datasets: [
          {
            backgroundColor: '#ff88ba',
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
            backgroundColor: '#ff88ba',
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
            backgroundColor: '#ff88ba',
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
