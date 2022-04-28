import VueRouter from 'vue-router'

import MainPage from '../pages/MainPage'
import PhotographerPage from '../pages/PhotographerPage'
import NotFound from '../pages/404'
import PhotographersLayout from '../pages/PhotographersLayout'
import AllPhotographersPage from "@/pages/AllPhotographersPage";
import StartMenu from "@/pages/StartMenu";
import AllOrdersPage from "@/pages/AllOrdersPage";
import SelectOrdersPage from "@/pages/SelectOrdersPage";

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/photographers',
      name: 'PhotographersLayout',
      component: PhotographersLayout,
      children: [
        {
          path: '',
          name: 'start_menu',
          component: StartMenu
        },
        {
          path: '/list',
          name: 'photographers',
          component: AllPhotographersPage
        },
        {
          path: '/orders',
          name: 'orders',
          component: AllOrdersPage
        },
        {
          path: '/select_orders',
          name: 'select_orders',
          component: SelectOrdersPage
        },
        {
          path: ':id',
          name: 'photographerPage',
          component: PhotographerPage,
          beforeEnter: (to, from, next) => {
            if(localStorage.getItem('user')) {
              //&& localStorage.getItem('jwt') != null
              //let user = JSON.parse(localStorage.getItem('user') возможно надо сделать что-то такое
              next()
            } else {
              next({ name: 'photographers' })
            }
          }
        },
        {
          path: '*/*',
          redirect: { name: 'photographers' }
        },
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    },
  ]
})