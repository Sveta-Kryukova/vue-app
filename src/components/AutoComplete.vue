<template>
  <div class="autocomplete">
    <input
      type="text"
      :placeholder="$t('autocomplete.placeholder')"
      v-model="cityName"
      @input="debouncedHandleInput"
      @keydown.down="highlightNext"
      @keydown.up="highlightPrevious"
      @keydown.enter="selectCity"
    />
    <button v-if="canAddWeatherBlock" @click="addWeatherBlock">{{ $t('autocomplete.addButton') }}</button>
    <ul v-if="showDropdown" ref="dropdown" @click="selectCity">
      <li
        v-for="(suggestion, index) in filteredSuggestions"
        :key="index"
        :class="{ highlighted: index === highlightedIndex }"
      >
        {{ suggestion.city }}, {{ suggestion.country }}
      </li>
    </ul>
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
      this.$parent.addWeatherBlock(this.cityName);
      this.cityName = "";
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
  height: 45px;
}

@media screen and (max-width: 768px) {
  .autocomplete {
    height: 80px; 
}
}
input {
  width: 90%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 35px;
  display: inline-block;
}

@media screen and (max-width: 768px) {
  input {
    width: 70%;
  }
}
@media screen and (min-width: 768px) {
  input {
    width: 90%;
  }
}

@media screen and (max-width: 360px) {
  input {
    width: 70%;
  }
}


input:placeholder-shown {
  font-style: italic;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #e7e7e7;
}

ul {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

li {
  padding: 8px;
  cursor: pointer;
}

li.highlighted {
  background-color: #e1dcdc;
}

button {
  margin-top: 8px;
  padding: 8px 12px;
  font-size: 16px;
  border: none;
  margin: 10px 5px;
  display: inline;
}
</style>
