import { createApp } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import App from "./App.vue";
import router from "./router";
import "quasar/dist/quasar.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
});
app.mount("#app");
