<template>
  <div class="weather-block">
    <p class="city-name">{{ cityWeather.cityName }}</p>
    <WeatherCard
      v-if="cityWeather"
      :cityName="cityWeather.cityName"
      :temperature="cityWeather.temperature"
      :weatherDescription="cityWeather.weatherDescription"
      :humidity="cityWeather.humidity"
      :windSpeed="cityWeather.windSpeed"
      :pressure="cityWeather.pressure"
      :hourlyTemperatures="cityWeather.hourlyTemperatures"
    />
    <TemperatureGraph v-if="cityWeather" :hourlyTemperatures="cityWeather.hourlyTemperatures" />

    <div v-if="showRemoveButton">
      <button @click="confirmRemove">Remove</button>
    </div>
    
    <div v-if="showFavoriteButton">
      <button @click="toggleFavorite">{{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}</button>
    </div>

    <ModalConfirm
      v-if="showModal"
      :show="showModal"
      :message="modalMessage"
      @confirm="onConfirmRemove"
      @cancel="closeModal"
    />
  </div>
</template>

<script>
import WeatherCard from './WeatherCard.vue';
import TemperatureGraph from './TemperatureGraph.vue';
import ModalConfirm from './ModalConfirm.vue';

export default {
  components: {
    WeatherCard,
    TemperatureGraph,
    ModalConfirm,
  },
  props: {
    cityWeather: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    showRemoveButton: {
      type: Boolean,
      default: true,
    },
    showFavoriteButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      showModal: false,
      modalMessage: 'Are you sure you want to remove this?',
    };
  },
  methods: {
    confirmRemove() {
      this.showModal = true;
    },
    onConfirmRemove() {
      if (this.isFavorite) {
        this.$emit('remove-favorite', this.cityWeather.cityName);
      } else {
        this.$emit('remove-block', this.cityWeather.cityName);
      }
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.cityWeather.cityName);
    },
  },
};
</script>

<style>
.weather-block {
  margin: 16px 0;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
