<template lang="pug">
  .adventure-analytics
    .row
      .col-2-3
        .analytics-chart-header Purchases
        AreaChart(:chart-data="purchasesData" :styles="chartStyles" :options="lineChartOptions")
      .col-1-3
        .analytics-total-ratings Total ratings: {{ this.overviewRatingsCount }}

        .analytics-stars
          .icon.icon--full-star.icon--pad-right(v-for="i in fullStars")
          .icon.icon--half-star.icon--pad-right(v-if="hasHalfStar")
          .icon.icon--empty-star.icon--pad-right(v-for="i in emptyStars")
          .analytics-stars__label {{ this.overviewRating }} out of 5 stars

        .analytics-rating
          .analytics-rating__label 5 stars
          .analytics-rating__progress
            .rating-progress(:class="'rating-progress--' + ratings5Percent")
          .analytics-rating__percent {{ ratings5Percent }}%

        .analytics-rating
          .analytics-rating__label 4 stars
          .analytics-rating__progress
            .rating-progress(:class="'rating-progress--' + ratings4Percent")
          .analytics-rating__percent {{ ratings4Percent }}%

        .analytics-rating
          .analytics-rating__label 3 stars
          .analytics-rating__progress
            .rating-progress(:class="'rating-progress--' + ratings3Percent")
          .analytics-rating__percent {{ ratings3Percent }}%

        .analytics-rating
          .analytics-rating__label 2 stars
          .analytics-rating__progress
            .rating-progress(:class="'rating-progress--' + ratings2Percent")
          .analytics-rating__percent {{ ratings2Percent }}%

        .analytics-rating
          .analytics-rating__label 1 stars
          .analytics-rating__progress
            .rating-progress(:class="'rating-progress--' + ratings1Percent")
          .analytics-rating__percent {{ ratings1Percent }}%

      .col-2-3
        .analytics-chart-header Views
        AreaChart(:chart-data="viewsData" :styles="chartStyles" :options="lineChartOptions")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    ...mapGetters('analytics', [
      'overviewPurchases',
      'overviewViews',

      'overviewRatingsCount',
      'overviewRating'
    ]),

    ratings1Percent () {
      return Math.floor(this.ratings.rating_1 / this.overviewRatingsCount * 100);
    },
    ratings2Percent () {
      return Math.floor(this.ratings.rating_2 / this.overviewRatingsCount * 100);
    },
    ratings3Percent () {
      return Math.floor(this.ratings.rating_3 / this.overviewRatingsCount * 100);
    },
    ratings4Percent () {
      return Math.floor(this.ratings.rating_4 / this.overviewRatingsCount * 100);
    },
    ratings5Percent () {
      return Math.floor(this.ratings.rating_5 / this.overviewRatingsCount * 100);
    },

    starPart () {
      return this.overviewRating - Math.floor(this.overviewRating);
    },
    hasExtraStar () {
      return this.starPart >= 0.75;
    },
    hasHalfStar () {
      return 0.25 <= this.starPart && this.starPart < 0.75;
    },
    fullStars () {
      return Math.floor(this.overviewRating) + (this.hasExtraStar ? 1 : 0);
    },
    emptyStars () {
      return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
    },

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
            pointBorderWidth: 2,
            pointBackgroundColor: 'white',
            pointBorderColor: '#ff65a5',
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
            pointBorderWidth: 2,
            pointBackgroundColor: 'white',
            pointBorderColor: '#ff65a5',
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
