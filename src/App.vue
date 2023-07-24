<template>
  <div class="weather-app-container">
    <h1>{{ $t('message.title') }}</h1>

    <div>
      <button @click="showWeatherTab" :class="{ 'active-tab': currentTab === 'weather' }">{{ $t('message.weather') }}</button>
      <button @click="showFavoritesTab" :class="{ 'active-tab': currentTab === 'favorites' }">{{ $t('message.favorites') }}</button>
    </div>
    <div>
      <button @click="changeLanguage('en')" :class="{ 'active-tab': activeLanguage === 'en' }">English</button>
      <button @click="changeLanguage('uk')" :class="{ 'active-tab': activeLanguage === 'uk' }">Українська</button>
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
      <div v-if="loadingWeather">
        <PreloaderSpinner />
      </div>
      <div v-else>
        <div v-for="cityWeather in weatherData" :key="cityWeather.cityName">
          <WeatherBlock
            :cityWeather="cityWeather"
            @remove-block="removeWeatherBlock"
            @toggle-favorite="toggleFavoriteCity"
            :isFavorite="isFavoriteCity(cityWeather.cityName)"
          />

          <TemperatureGraph
            :key="cityWeather.cityName + (isWeekGraph ? '-week' : '-day')"
            :hourlyTemperatures="isWeekGraph ? cityWeather.weeklyHourlyTemperatures : cityWeather.hourlyTemperatures"
          />
        </div>
        <!-- <button @click="switchToDayGraph" v-if="isWeekGraph">Switch to Day Graph</button>
        <button @click="switchToWeekGraph" v-else>Switch to Week Graph</button> -->
      </div>
    </div>
    <div v-else-if="currentTab === 'favorites'">
  <div v-for="cityWeather in favoriteCities" :key="cityWeather.cityName">
    <WeatherBlock
      :cityWeather="cityWeather"
      @toggle-favorite="toggleFavoriteCity(cityWeather.cityName)"
      :isFavorite="true"
      :showRemoveButton="true"
      @remove-favorite="showRemoveFavoriteModal(cityWeather.cityName)"
    />
    <TemperatureGraph
      :key="cityWeather.cityName + (isWeekGraph ? '-week' : '-day')"
      :hourlyTemperatures="isWeekGraph ? cityWeather.weeklyHourlyTemperatures : cityWeather.hourlyTemperatures"
    />
  </div>
  <!-- <button @click="switchToDayGraph" v-if="isWeekGraph">Switch to Day Graph</button>
  <button @click="switchToWeekGraph" v-else>Switch to Week Graph</button> -->
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
import AutoComplete from './components/AutoComplete.vue';
import WeatherBlock from './components/WeatherBlock.vue';
import ModalConfirm from './components/ModalConfirm.vue';
import PreloaderSpinner from './components/PreloaderSpinner.vue';

export default {
  components: {
    WeatherBlock,
    AutoComplete,
    ModalConfirm,
    PreloaderSpinner,
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
      loadingWeather: false,
      loadingFavorites: false,
    };
  },
  methods: {
    async addWeatherBlock(cityName) {
  try {
    this.loadingWeather = true; 
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
    this.loadingWeather = false;
  } catch (error) {
    this.loadingWeather = false; 
    this.showModal = true;
    this.modalMessage = 'Oops! Enter the correct city name.';
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
    removeFavoriteCity(cityName) {
      const index = this.favoriteCities.findIndex((weather) => weather.cityName === cityName);
      if (index !== -1) {
        this.favoriteCities.splice(index, 1);
        const cityWeather = this.weatherData.find((weather) => weather.cityName === cityName);
        if (cityWeather) {
          cityWeather.isWeatherFavorited = false;
        }
      }
    },
    async toggleFavoriteCity(cityName) {
      try {
        this.loadingFavorites = true;
        const index = this.favoriteCities.findIndex((weather) => weather.cityName === cityName);
        if (index !== -1) {
          this.favoriteCities.splice(index, 1);
        } else {
          if (this.favoriteCities.length >= 5) {
            this.showModal = true;
            this.modalMessage = `You can't add more than 5 favorite cities. Remove a city from favorites to add a new one.`;
          } else {
            const cityWeather = this.weatherData.find((weather) => weather.cityName === cityName);
            if (cityWeather) {
              this.favoriteCities.push(cityWeather);
            }
          }
        }
        this.loadingFavorites = false;
      } catch (error) {
        this.loadingFavorites = false;
        this.showModal = true;
        this.modalMessage = 'Oops! Something went wrong while updating favorites.';
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
    switchToDayGraph() {
      this.isWeekGraph = false;
    },
    switchToWeekGraph() {
      this.isWeekGraph = true;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
  },
  mounted() {
    this.addWeatherBlock('Kiev');
    const savedFavoriteCities = localStorage.getItem('favoriteCities');
    if (savedFavoriteCities) {
      this.favoriteCities = JSON.parse(savedFavoriteCities);
    }
  },
  computed: {
    activeLanguage() {
      return this.$i18n.locale === 'en' ? 'en' : 'uk';
    },
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
@media screen and (min-width: 360px) {
  .weather-app-container {
    max-width: 360px;
    margin: 0 auto;
  }
}

@media screen and (min-width: 768px) {
  .weather-app-container {
    max-width: 768px;
  }
}

@media screen and (min-width: 1200px) {
  .weather-app-container {
    max-width: 1200px;
  }
}

button {
  padding: 8px 12px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 30px;
  background-color: transparent;
  border: 1px solid #70bcef;
  color: #70bcef;
  transition: all 0.2s ease-in-out;
}

button:hover {
  background-color: #70bcef;
  color: #fff;
  border: 1px solid transparent;
}

button.active-tab {
  background-color: #70bcef;
  color: #fff;
  border: 1px solid transparent;
}

.weather-app-container {
  text-align: center;
}

button {
  margin: 8px;
}

h1 {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 27px;
  font-weight: bold;
  margin-bottom: 5px;
  color: rgb(114, 192, 229);
}
</style>