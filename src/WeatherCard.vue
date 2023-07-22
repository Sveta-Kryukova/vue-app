<template>
  <div class="weather-card">
    <h2 class="city-name">{{ cityName }}</h2>
    <div class="weather-info">
      <div class="temperature">{{ temperature }}°C</div>
      <div class="description">{{ weatherDescription }}</div>
      <div class="humidity">Humidity: {{ humidity }}%</div>
      <div class="wind">Wind: {{ windSpeed }} km/h</div>
      <div class="pressure">Pressure: {{ pressure }} hPa</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cityName: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    weatherDescription: {
      type: String,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    windSpeed: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
.weather-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 16px;
  margin: 16px 0;
  max-width: 300px;
}

.city-name {
  font-size: 24px;
  margin-bottom: 8px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temperature {
  font-size: 32px;
  font-weight: bold;
}
</style>
