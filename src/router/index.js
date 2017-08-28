import Vue from 'vue'
import Router from 'vue-router'
import Start from '../components/start'
import Main from '../components/main'
import Detail from '../components/detail'
import Myorder from '../components/myorder'
import Login from '../components/login'
import Regist from '../components/regist'
import ShoppingCart from '../components/shoppingcart'
import Center from '../components/center'
import Centermain from '../components/centermain'
import Notlogin from '../components/notlogin'
import Modify from '../components/modify'
import Temp from '../components/temp'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Start
    },
    {
      path: '/main',
      component: Main
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/regist',
      component: Regist
    },
    {
      path: '/shopcart',
      component: ShoppingCart
    },
    {
      path: '/detail/:id',
      component: Detail
    },
    {
      path: '/notlogin',
      component: Notlogin
    },
    {
      path: '/center',
      component: Center,
      children: [
        { path: 'main',
          component: Centermain
        },
        { path: 'myorder',
          component: Myorder
        },
        { path: 'modify',
          component: Modify
        }
      ]
    },
    {
      path: '/temp',
      component: Temp
    }
  ],
  base: '/leirensheng/'
})
