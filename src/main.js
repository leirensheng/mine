// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Header from './components/header.vue'
import './assets/css/animate.css'
import '../bower_components/bootstrap/dist/css/bootstrap.css'
import './assets/js/jquery-3.2.1'
import './assets/js/bootstrap.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app1',
  router,
  template: `<div style="height: 100%">
               <My-Header/>
               <router-view style=" margin-top:85px" class="animated" ></router-view>
              </div>`,
  components: {
    MyHeader: Header
  }
})
// 54.183.11.150
// 127.0.0.1

