<template>
  <div>
    <input
      type="text"
      placeholder="Enter a city name"
      v-model="cityName"
      @input="debouncedHandleInput"
      @keydown.down="highlightNext"
      @keydown.up="highlightPrevious"
      @keydown.enter="selectCity"
    />
    <ul v-if="showDropdown" ref="dropdown" @click="selectCity">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        :class="{ highlighted: index === highlightedIndex }"
      >
        {{ suggestion.city }}, {{ suggestion.country }}
      </li>
    </ul>
    <button v-if="canAddWeatherBlock" @click="addWeatherBlock">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cityName: "",
      suggestions: [],
      showDropdown: false,
      highlightedIndex: -1,
      debounceTimer: null,
    };
  },
  computed: {
    filteredSuggestions() {
      const uniqueSuggestions = this.getUniqueSuggestions();
      return uniqueSuggestions;
    },
    canAddWeatherBlock() {
      return this.$parent.weatherData.length < 6;
    },
  },
  methods: {
    async handleInput() {
      if (this.cityName.length > 0) {
        try {
          const encodedCityName = encodeURIComponent(this.cityName);
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/find?q=${encodedCityName}&appid=17dc71bb4ac06ea33cab56e5935c72a3`
          );

          if (!response.ok) {
            throw new Error("City not found");
          }

          const data = await response.json();
          this.suggestions = data.list.map((item) => ({
            city: item.name,
            country: item.sys.country,
          }));
          this.showDropdown = true;
          this.highlightedIndex = -1;
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
          this.suggestions = [];
          this.showDropdown = false;
        }
      } else {
        this.suggestions = [];
        this.showDropdown = false;
      }
    },
    debouncedHandleInput() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(this.handleInput, 300); // Adjust the delay as needed (in milliseconds)
    },
    highlightNext() {
      if (this.highlightedIndex < this.filteredSuggestions.length - 1) {
        this.highlightedIndex++;
      }
    },
    highlightPrevious() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex--;
      }
    },
    selectCity() {
      // Only add the weather block if canAddWeatherBlock is true
      if (this.canAddWeatherBlock) {
        this.addWeatherBlock();
      }
    },
    getUniqueSuggestions() {
      const uniqueCountries = {};
      const uniqueSuggestions = [];

      for (const suggestion of this.suggestions) {
        if (!uniqueCountries[suggestion.country]) {
          uniqueCountries[suggestion.country] = true;
          uniqueSuggestions.push(suggestion);
        }
      }

      return uniqueSuggestions;
    },
    addWeatherBlock() {
      // Call the parent method to add the weather block
      this.$parent.addWeatherBlock(this.cityName);
      this.cityName = ""; // Clear the input after adding the weather block
    },
  },
};
</script>
