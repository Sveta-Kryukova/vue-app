<template>
  <div>
    <button @click="setLocale('en')">English</button>
    <button @click="setLocale('uk')">Українська</button>
  </div>
</template>

<script>
export default {
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>