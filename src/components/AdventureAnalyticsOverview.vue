<template lang="pug">
  .adventure-analytics
    .row
      .col-2-3(v-if="purchases.length > 0")
        .analytics-chart-header Purchases ({{ overviewPurchases }})
        AreaChart(:chart-data="purchasesData" :styles="chartStyles" :options="lineChartOptions")

        .analytics-chart-header Views ({{ overviewViews }})
        AreaChart(:chart-data="viewsData" :styles="chartStyles" :options="lineChartOptions")

      .col-1-3(v-if="ratings.rating_5")
        .analytics-total-ratings Total ratings: {{ overviewRatingsCount }}

        .analytics-stars
          .icon.icon--full-star.icon--pad-right(v-for="i in fullStars")
          .icon.icon--half-star.icon--pad-right(v-if="hasHalfStar")
          .icon.icon--empty-star.icon--pad-right(v-for="i in emptyStars")
          .analytics-stars__label {{ overviewRating }} out of 5

        .analytics-rating
          .analytics-rating__label 5 stars
          .analytics-rating__progress(:title="ratings.rating_5")
            .rating-progress(:class="'rating-progress--' + ratings5Percent")

        .analytics-rating
          .analytics-rating__label 4 stars
          .analytics-rating__progress(:title="ratings.rating_4")
            .rating-progress(:class="'rating-progress--' + ratings4Percent")

        .analytics-rating
          .analytics-rating__label 3 stars
          .analytics-rating__progress(:title="ratings.rating_3")
            .rating-progress(:class="'rating-progress--' + ratings3Percent")

        .analytics-rating
          .analytics-rating__label 2 stars
          .analytics-rating__progress(:title="ratings.rating_2")
            .rating-progress(:class="'rating-progress--' + ratings2Percent")

        .analytics-rating
          .analytics-rating__label 1 star
          .analytics-rating__progress(:title="ratings.rating_1")
            .rating-progress(:class="'rating-progress--' + ratings1Percent")
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

      summary: state => state.analytics.overview.summary,
      purchases: state => state.analytics.overview.purchases,
      views: state => state.analytics.overview.views,
      ratings: state => state.analytics.overview.ratings,

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
        labels: this.views.map((view) => {
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
        tooltips: {
          mode: 'index',
          intersect: false
        },
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: false,
              userCallback: (item, index) => {
                if(!(index % 2)) return item;
              }
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
