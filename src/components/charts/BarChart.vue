<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  name: 'BarChart',
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
