<template lang="pug">
  .adventure-analytics
    .row
      .col-1-2(v-if="participants.completed")
        .analytics-chart-header Participants ({{ totalParticipants }})
        PieChart(:chart-data="participantsData" :styles="pieChartStyles" :options="pieChartOptions")

      .col-1-2(v-if="rankings.length")
        .analytics-chart-header Clear Times
        BarChart(:chart-data="rankingsData" :styles="rankingsChartStyles" :options="rankingsChartOptions")

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
              '#fdf498',
              '#afafaf',
              '#f37736'
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

    rankingsData () {
      return {
        labels: this.rankings.map((ranking) => {
          let lowerHour = Math.floor(ranking.lower / 3600);

          return `${this.formatTime(ranking.lower)} - ${this.formatTime(ranking.higher)}`;
        }),
        datasets: [
          {
            backgroundColor: '#5499c7',
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

    totalParticipants () {
      return this.participants.completed +
        this.participants.completed_with_tips +
        this.participants.in_progress +
        this.participants.abandoned;
    }
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

        return `${hours}h ${minutes}min ${seconds}s`;
      }
    }
  }
}
</script>
