import Vue from 'vue'
import App from './App.vue'
import Alice from './components/Alice.vue'
import Bob from './components/Bob.vue'
import Home from './components/Home.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/alice', component: Alice },
  { path: '/bob', component: Bob }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  router, 
  render: h => h(App)  
}).$mount('#app')
