// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import MintUi from 'mint-ui';
import App from './App'
// import router from './router';
import index from '@/components/index/index';
import detail from '@/components/index/detail';
import movie from '@/components/movie/movie';
import personal from '@/components/personal/personal';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUi);
/* eslint-disable no-new */

const routes = [
  { path: '/index/index', component: index },
  { path: '/index/detail/:id', component: detail },
  { path: '/movie/movie', component: movie },
  { path: '/personal/personal', component: personal }
];
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
});
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');

router.push('/index/index');

