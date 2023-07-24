import { createApp } from 'vue';
import App from './App.vue';
import en from './languages/en.js';
import uk from './languages/uk.js';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    uk,
  },
});

createApp(App)
  .use(i18n)
  .mount('#app');
