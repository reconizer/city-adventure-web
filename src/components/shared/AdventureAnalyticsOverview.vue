<template lang="pug">
  .adventure-analytics
    .row
      .col-2-3(v-if="purchases.length > 0")
        .analytics-chart-header {{ $t("adventure_analytics.overview_purchases", { value: overviewPurchases }) }}
        AreaChart(:chart-data="purchasesData" :styles="chartStyles" :options="lineChartOptions")

        .analytics-chart-header {{ $t("adventure_analytics.overview_views", { value: overviewViews }) }}
        AreaChart(:chart-data="viewsData" :styles="chartStyles" :options="lineChartOptions")

      .col-1-3(v-if="ratings.rating_5")
        .analytics-total-ratings {{ $t("adventure_analytics.overview_ratings", { value: overviewRatingsCount }) }}

        .analytics-stars
          RatingStars(:rating="overviewRating")

        .analytics-rating
          .analytics-rating__label(:class="{ 'analytics-rating__label--fixed-width': $i18n.locale == 'en' }") {{ $t("adventure_analytics.overview_stars_5") }}
          .analytics-rating__progress(:title="ratings.rating_5")
            .rating-progress(:class="'rating-progress--' + ratings5Percent")

        .analytics-rating
          .analytics-rating__label(:class="{ 'analytics-rating__label--fixed-width': $i18n.locale == 'en' }") {{ $t("adventure_analytics.overview_stars_4") }}
          .analytics-rating__progress(:title="ratings.rating_4")
            .rating-progress(:class="'rating-progress--' + ratings4Percent")

        .analytics-rating
          .analytics-rating__label(:class="{ 'analytics-rating__label--fixed-width': $i18n.locale == 'en' }") {{ $t("adventure_analytics.overview_stars_3") }}
          .analytics-rating__progress(:title="ratings.rating_3")
            .rating-progress(:class="'rating-progress--' + ratings3Percent")

        .analytics-rating
          .analytics-rating__label(:class="{ 'analytics-rating__label--fixed-width': $i18n.locale == 'en' }") {{ $t("adventure_analytics.overview_stars_2") }}
          .analytics-rating__progress(:title="ratings.rating_2")
            .rating-progress(:class="'rating-progress--' + ratings2Percent")

        .analytics-rating
          .analytics-rating__label(:class="{ 'analytics-rating__label--fixed-width': $i18n.locale == 'en' }") {{ $t("adventure_analytics.overview_stars_1") }}
          .analytics-rating__progress(:title="ratings.rating_1")
            .rating-progress(:class="'rating-progress--' + ratings1Percent")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import AreaChart from './charts/AreaChart.vue'
import RatingStars from '@/components/shared/RatingStars.vue'

import moment from 'moment'

import { LOAD_ANALYTICS_OVERVIEW } from '@/store/action-types'

import {
  AREA_BORDER_COLOR, AREA_BACKGROUND_COLOR,
  AREA_POINT_BORDER_COLOR, AREA_POINT_BACKGROUND_COLOR
} from '@/config'

const ACTION_NAMESPACE = 'analytics'

export default {
  name: "AdventureAnalyticsOverview",
  components: {
    AreaChart,
    RatingStars
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

    purchasesData () {
      return {
        labels: this.purchases.map((purchase) => {
          return moment(purchase.timestamp).format('ll');
        }),
        datasets: [
          {
            borderColor: AREA_BORDER_COLOR,
            backgroundColor: AREA_BACKGROUND_COLOR,
            lineTension: 0,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointBackgroundColor: AREA_POINT_BACKGROUND_COLOR,
            pointBorderColor: AREA_POINT_BORDER_COLOR,
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
            borderColor: AREA_BORDER_COLOR,
            backgroundColor: AREA_BACKGROUND_COLOR,
            lineTension: 0,
            pointRadius: 6,
            pointBorderWidth: 2,
            pointBackgroundColor: AREA_POINT_BACKGROUND_COLOR,
            pointBorderColor: AREA_POINT_BORDER_COLOR,
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
        layout: {
          padding: {
            top: 10
          }
        },
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
