import VueRouter from 'vue-router'

import MainPage from '../pages/MainPage'
import AllFilmsPage from '../pages/AllFilmsPage'
import FilmPage from '../pages/FilmPage'
import NotFound from '../pages/404'
import FilmsLayout from '../pages/FilmsLayout'

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/films',
      name: 'filmsLayout',
      component: FilmsLayout,
      children: [
        {
          path: '',
          name: 'films',
          component: AllFilmsPage
        },
        {
          path: ':id',
          name: 'filmPage',
          component: FilmPage,
          beforeEnter: (to, from, next) => {
            if(localStorage.getItem('user')) {
              //&& localStorage.getItem('jwt') != null
              //let user = JSON.parse(localStorage.getItem('user') возможно надо сделать что-то такое
              next()
            } else {
              next({ name: 'films' })
            }
          }
        },
        {
          path: '*/*',
          redirect: { name: 'films' }
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