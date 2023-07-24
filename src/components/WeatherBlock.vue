<template>
  <div class="weather-block" :class="{ 'favorited': isFavorite }">
    <p class="city-name">{{ cityDisplayName }}</p>
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
      <button @click="confirmRemove">{{ $t('message.remove') }}</button>
    </div>

    <div v-if="showFavoriteButton">
      <button @click="toggleFavorite">{{ isFavorite ? $t('message.removeFromFavorites') : $t('message.addToFavorites') }}</button>
    </div>

    <ModalConfirm
      v-if="showModal"
      :show="showModal"
      :message="$t('message.confirmRemove')"
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
  computed: {
  cityDisplayName() {
    if (this.cityWeather.cityName) {
      const translatedCityName = this.$t(`cityNames.${this.cityWeather.cityName}`);
      return translatedCityName !== `cityNames.${this.cityWeather.cityName}` ? translatedCityName : this.cityWeather.cityName;
    }
    return '';
  },
},
};
</script>

<style>
.weather-block {
  margin: 16px 0;
  padding: 16px;
  border:5px solid #eef5f7;
  border-radius: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.city-name {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 5px;
  color: rgb(114, 192, 229);
}

.city-name::before {
  content: '📍';
  margin-right: 5px;
}

.favorited {
  border:5px solid #fa8ded;
}
</style>
