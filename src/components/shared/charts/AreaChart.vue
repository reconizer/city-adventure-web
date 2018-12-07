<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'AreaChart',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
