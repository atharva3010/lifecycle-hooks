import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;

// Vue.config.errorHandler = function(err, vm, info) {
//   // handle error
//   console.error('From global errorHandler:', err, vm, info);
//   // `info` is a Vue-specific error info, e.g. which lifecycle hook
//   // the error was found in. Only available in 2.2.0+
// };

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
