import { createApp } from 'vue';
import { Skeletor } from 'vue-skeletor';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/main.css';
import VeeValidatePlugin from './includes/validation';
import { auth } from './includes/firebase';
import 'animate.css';
import ProgressBar from './plugins/progress-bar';
import 'nprogress/nprogress.css';
import 'vue-skeletor/dist/vue-skeletor.css';

ProgressBar(router);

let app;
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.component(Skeletor.name, Skeletor);
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.mount('#app');
  }
});
