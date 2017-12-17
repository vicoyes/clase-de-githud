import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCarousel from 'vue-carousel'
import App from './App.vue'

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

Vue.use(VueRouter)
Vue.use(VueCarousel)

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })

new Vue({
    el: '#app',
    router,
    render: h => h(App)
}).$mount('#app')