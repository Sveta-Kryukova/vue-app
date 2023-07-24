<template>
  <div>
    <canvas ref="chartCanvas" :key="chartKey" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Chart, LineElement, PointElement, LinearScale, Title } from 'chart.js/auto';

Chart.register(LineElement, PointElement, LinearScale, Title);

export default defineComponent({
  props: {
    hourlyTemperatures: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartKey: 0,
      chart: null,
    };
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.chartCanvas.getContext('2d');

      const times = this.hourlyTemperatures.map((data) => data.time);
      const temperatures = this.hourlyTemperatures.map((data) => data.temperature);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: times,
          datasets: [
            {
              label: 'Temperature (°C)',
              data: temperatures,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: this.chartOptions,
      });
    },
    generateLabels(currentTime) {
      const labels = [];
      const hoursToAdd = 24 - currentTime.getHours();

      for (let i = 0; i <= hoursToAdd; i++) {
        const time = new Date(currentTime);
        time.setHours(currentTime.getHours() + i);
        labels.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }

      return labels;
    },
  },
  computed: {
    chartOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Temperature (°C)',
            },
          },
        },
      };
    },
  },
});
</script>

<style>

</style>
