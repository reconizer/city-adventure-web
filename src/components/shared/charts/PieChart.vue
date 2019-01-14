<script>
import { Pie, mixins } from 'vue-chartjs'

export default {
  name: 'PieChart',
  extends: Pie,
  mixins: [mixins.reactiveProp],
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options);
  }
}
</script>
