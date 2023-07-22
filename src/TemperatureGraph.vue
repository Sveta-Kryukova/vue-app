<template>
  <div class="weather-graph">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import Chart from 'chart.js/auto';

export default {
  props: {
    hourlyTemperatures: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartRef = ref(null);

    watchEffect(() => {
      if (!props.hourlyTemperatures || props.hourlyTemperatures.length === 0) {
        return;
      }

      const labels = props.hourlyTemperatures.map((data) => data.time);
      const data = props.hourlyTemperatures.map((data) => data.temperature);

      if (chartRef.value) {
        chartRef.value.destroy();
      }

      chartRef.value = new Chart(chartRef, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Hourly Temperature (°C)',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                displayFormats: {
                  hour: 'HH:mm',
                },
              },
              ticks: {
                maxTicksLimit: 6,
              },
            },
            y: {
              beginAtZero: true,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    });

    return { chartRef };
  },
};
</script>

<style>
.weather-graph {
  margin: 16px 0;
}
</style>
