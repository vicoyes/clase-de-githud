import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCarousel from 'vue-carousel'
import App from './App.vue'
import Beneficios from './beneficios.vue'
import Welcome  from './Welcome.vue'


Vue.use(VueRouter)
Vue.use(VueCarousel)

const routes = [
    { path: '/', component: Welcome },
    { path: '/beneficios', component: Beneficios },

  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app')