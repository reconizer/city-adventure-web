<template lang="pug">
  .adventure-analytics
    .row
      .col-1-2
        .analytics-chart-header Purchases
        AreaChart(:chart-data="purchasesData" :styles="chartStyles" :options="lineChartOptions")
      .col-1-2
      .col-1-2
        .analytics-chart-header Views
        AreaChart(:chart-data="viewsData" :styles="chartStyles" :options="lineChartOptions")
</template>

<script>
import { mapState } from 'vuex'

import AreaChart from './charts/AreaChart.vue'
import moment from 'moment'

import { LOAD_ANALYTICS_OVERVIEW } from '@/store/action-types'

const ACTION_NAMESPACE = 'analytics'

export default {
  name: "AdventureAnalyticsOverview",
  components: {
    AreaChart
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      purchases: state => state.analytics.overview.purchases,
      views: state => state.analytics.overview.views,
      ratings: state => state.analytics.overview.ratings,
      rankings: state => state.analytics.overview.rankings,

      loading: state => state.analytics.loading,
      error: state => state.analytics.error
    }),
    purchasesData () {
      return {
        labels: this.purchases.map((purchase) => {
          return moment(purchase.timestamp).format('ll');
        }),
        datasets: [
          {
            borderColor: '#ff2b848f',
            backgroundColor: '#ff2b845f',
            lineTension: 0,
            pointRadius: 6,
            pointBackgroundColor: 'white',
            pointBorderColor: '#ff2bff',
            data: this.purchases.map(purchase => purchase.data)
          }
        ]
      }
    },
    viewsData () {
      return {
        labels: this.views.map((view, index) => {
          return moment(view.timestamp).format('ll');
        }),
        datasets: [
          {
            borderColor: '#ff2b848f',
            backgroundColor: '#ff2b845f',
            lineTension: 0,
            pointRadius: 6,
            pointBackgroundColor: 'white',
            pointBorderColor: '#ff2bff',
            data: this.views.map(view => view.data)
          }
        ]
      }
    },

    chartStyles () {
      return {
        height: "250px",
        position: "relative"
      }
    },

    lineChartOptions () {
      return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            autoSkip: false,
            afterTickToLabelConversion: (data) => {
              let xLabels = data.ticks;

              data.ticks.forEach((labels, i) => {
                if(i % 2 == 1) {
                  xLabels[i] = '';
                }
              });
            }
          }]
        }
      };
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ANALYTICS_OVERVIEW}`, {
      id: this.$route.params.adventureId
    });
  },
}
</script>
