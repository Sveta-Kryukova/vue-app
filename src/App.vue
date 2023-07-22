<template>
  <div>
    <h1>Weather App</h1>

    <div>
      <button @click="showWeatherTab">Weather</button>
      <button @click="showFavoritesTab">Favorites</button>
    </div>
    <div v-if="currentTab === 'weather'">
      <div>
        <AutoComplete
          :key="autocompleteKey"
          @selected="addWeatherBlock"
          :can-add-weather-block="canAddWeatherBlock"
          ref="autoComplete"
        />
      </div>
      <div v-for="cityWeather in weatherData" :key="cityWeather.cityName">
        <WeatherBlock
          :cityWeather="cityWeather"
          @remove-block="removeWeatherBlock"
          @toggle-favorite="toggleFavoriteCity"
          :isFavorite="isFavoriteCity(cityWeather.cityName)"
        />
        <TemperatureGraph :hourlyTemperatures="hourlyTemperatureData" />
      </div>
    </div>
    <div v-else-if="currentTab === 'favorites'">
      <div v-for="cityWeather in favoriteCities" :key="cityWeather.cityName">
        <WeatherBlock
          :cityWeather="cityWeather"
          @toggle-favorite="toggleFavoriteCity"
          :isFavorite="true"
          :showRemoveButton="true"
          @remove-favorite="showRemoveFavoriteModal"
        />
        <TemperatureGraph :hourlyTemperatures="hourlyTemperatureData" />
      </div>
    </div>
    <ModalConfirm
      v-if="showModal || showRemoveFavoriteModal || showAddWeatherErrorModal"
      :show="showModal || showRemoveFavoriteModal || showAddWeatherErrorModal"
      :message="modalMessage || removeFavoriteModalMessage || weatherErrorModalMessage"
      @confirm="onConfirmModal"
      @cancel="onCancelModal"
    />
  </div>
</template>

<script>
import AutoComplete from './AutoComplete.vue';
import WeatherBlock from './WeatherBlock.vue';
import ModalConfirm from './ModalConfirm.vue';

export default {
  components: {
    WeatherBlock,
    AutoComplete,
    ModalConfirm,
  },
  data() {
    return {
      currentTab: 'weather',
      weatherData: [],
      favoriteCities: [],
      showModal: false,
      modalMessage: '',
      showRemoveFavoriteModal: false,
      removeFavoriteModalMessage: '',
      cityToRemoveFromFavorites: '',
      showAddWeatherErrorModal: false,
      weatherErrorModalMessage: "You can't add more than 5 weather blocks. Remove a weather block to add a new one.",
      autocompleteKey: 0,
      defaultCityData: {
        cityName: 'Kiev',
        temperature: '',
        weatherDescription: '',
        humidity: '',
        windSpeed: '',
        pressure: '',
        hourlyTemperatures: [],
        isWeatherFavorited: false,
      },
      canAddWeatherBlock() {
        return this.weatherData.length < 5;
      },
    };
  },
  methods: {
    async addWeatherBlock(cityName) {
  try {
    const encodedCityName = encodeURIComponent(cityName);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${encodedCityName}&appid=17dc71bb4ac06ea33cab56e5935c72a3`
    );

    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    const weatherInfo = data.list[0];

    const hourlyResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodedCityName}&appid=17dc71bb4ac06ea33cab56e5935c72a3`
    );
    const hourlyData = await hourlyResponse.json();

    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    const next24HoursData = hourlyData.list.filter((hourData) => {
      const hourTimestamp = new Date(hourData.dt_txt).getTime();
      return hourTimestamp >= currentTimestamp && hourTimestamp <= currentTimestamp + 24 * 60 * 60 * 1000;
    });

    const hourlyTemperatures = next24HoursData.map((hourData) => {
          const time = new Date(hourData.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const temperature = this.convertKelvinToCelsius(hourData.main.temp);

          return {
            time: time,
            temperature: temperature,
          };
        });

    this.weatherData.push({
          cityName: weatherInfo.name,
          temperature: this.convertKelvinToCelsius(weatherInfo.main.temp),
          weatherDescription: weatherInfo.weather[0].description,
          humidity: weatherInfo.main.humidity,
          windSpeed: weatherInfo.wind.speed,
          pressure: weatherInfo.main.pressure,
          hourlyTemperatures: hourlyTemperatures,
          isWeatherFavorited: false,
        });

    this.autocompleteKey += 1;
    console.log('hourlyTemperatures:', hourlyTemperatures);
  } catch (error) {
    this.showModal = true;
    this.modalMessage = 'Oops! Enter the correct city name.';
    console.error('Error fetching weather data:', error);
  }
},

    addWeatherBlockButton() {
      if (this.weatherData.length >= 5) {
        this.showModal = true;
        this.modalMessage = "You can't add more than 5 weather blocks. Remove a weather block to add a new one.";
        return;
      }

      this.weatherData.push({
        cityName: 'New City',
        temperature: '',
        weatherDescription: '',
        humidity: '',
        windSpeed: '',
        pressure: '',
        hourlyTemperatures: [],
        isWeatherFavorited: false,
      });
      this.autocompleteKey += 1;
    },
    removeWeatherBlock(cityName) {
      const isFavorited = this.favoriteCities.some((weather) => weather.cityName === cityName);
      if (isFavorited) {
        const index = this.favoriteCities.findIndex((weather) => weather.cityName === cityName);
        if (index !== -1) {
          this.favoriteCities.splice(index, 1);
        }
      } else {
        const index = this.weatherData.findIndex((weather) => weather.cityName === cityName);
        if (index !== -1) {
          this.weatherData.splice(index, 1);
        }
      }
    },

    toggleFavoriteCity(cityName) {
      const index = this.favoriteCities.findIndex((weather) => weather.cityName === cityName);
      if (index !== -1) {
        this.favoriteCities.splice(index, 1);
        const cityWeather = this.weatherData.find((weather) => weather.cityName === cityName);
        if (cityWeather) {
          cityWeather.isWeatherFavorited = false;
        }
      } else {
        if (this.favoriteCities.length >= 5) {
          this.showModal = true;
          this.modalMessage = `You can't add more than 5 favorite cities. Remove a city from favorites to add a new one.`;
        } else {
          const cityWeather = this.weatherData.find((weather) => weather.cityName === cityName);
          if (cityWeather) {
            this.favoriteCities.push(cityWeather);
            cityWeather.isWeatherFavorited = true;
          }
        }
      }
    },
    isFavoriteCity(cityName) {
      return this.favoriteCities.some((weather) => weather.cityName === cityName);
    },
    showWeatherTab() {
      this.currentTab = 'weather';
    },
    showFavoritesTab() {
      this.currentTab = 'favorites';
    },
    closeModal() {
      this.showModal = false;
      this.modalMessage = '';
    },
    convertKelvinToCelsius(kelvin) {
      return (kelvin - 273.15).toFixed(0);
    },
    onConfirmModal() {
      if (this.showModal) {
        this.closeModal();
      } else if (this.showRemoveFavoriteModal) {
        this.removeFavoriteCity();
      } else if (this.showAddWeatherErrorModal) {
        this.closeAddWeatherErrorModal();
      }
    },

    onCancelModal() {
      if (this.showModal) {
        this.closeModal();
      } else if (this.showRemoveFavoriteModal) {
        this.closeRemoveFavoriteModal();
      } else if (this.showAddWeatherErrorModal) {
        this.closeAddWeatherErrorModal();
      }
    },

    closeAddWeatherErrorModal() {
      this.showAddWeatherErrorModal = false;
      this.weatherErrorModalMessage = '';
    },
  },
  mounted() {
    this.addWeatherBlock('Kiev');
    const savedFavoriteCities = localStorage.getItem('favoriteCities');
    if (savedFavoriteCities) {
      this.favoriteCities = JSON.parse(savedFavoriteCities);
    }
  },
  watch: {
    favoriteCities: {
      handler() {
        localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
