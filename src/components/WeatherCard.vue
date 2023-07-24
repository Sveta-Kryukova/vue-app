<template>
  <div class="weather-card">
    <div class="weather-info">
      <div class="temperature">{{ $t('message.temperature') }}{{ temperature }} °C</div>
      <div class="description">{{ $t('weatherDescriptions.' + weatherDescription) }}</div>
      <div class="humidity">{{ $t('message.humidity') }}{{ humidity }} %</div>
      <div class="wind">{{ $t('message.wind') }}{{ windSpeed }}{{ $t('message.windValue')}}</div>
      <div class="pressure">{{ $t('message.pressure') }}{{ pressure }} {{$t('message.pressureValue')}}</div>
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
  display: block;
  align-self: center;
  border-radius: 15px;
  padding: 16px;
  margin: 16px 0;
  max-width: 300px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 100%;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temperature {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.description {
  font-size: 25px;
  margin-bottom: 8px;
}

.humidity,
.wind,
.pressure {
  font-size: 14px;
  margin-bottom: 4px;
}
</style>
