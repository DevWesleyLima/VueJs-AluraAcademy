import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes'; 
import './directives/Transform.js';
import VeeValidate from 'vee-validate';
import msg from './vee-validate_locale/pt_BR';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/css/teste.css';
import './assets/js/teste.js';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
  locale: "pt_BR",
  dictionary: {
    pt_BR: msg }
});

Vue.http.options.root = 'http://localhost:3000/';

const router = new VueRouter({ routes, mode: 'history' });

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
