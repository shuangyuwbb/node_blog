import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategeryEdit from '../views/CategeryEdit.vue'
import CategeryList from '../views/CategeryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import RoleEdit from '../views/RoleEdit.vue'
import RoleList from '../views/RoleList.vue'


import UserEdit from '../views/UserEdit.vue'
import UserList from '../views/UserList.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'Login', component: Login, meta: { isPublic: true } },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        { path: '/categeries/list', component: CategeryList },
        { path: '/categeries/create', component: CategeryEdit },
        { path: '/categeries/edit/:id', component: CategeryEdit, props: true },

        { path: '/items/list', component: ItemList },
        { path: '/items/create', component: ItemEdit },
        { path: '/items/edit/:id', component: ItemEdit, props: true },

        { path: '/heroes/list', component: HeroList },
        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },

        { path: '/articles/list', component: ArticleList },
        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },

        { path: '/roles/list', component: RoleList },
        { path: '/roles/create', component: RoleEdit },
        { path: '/roles/edit/:id', component: RoleEdit, props: true },


        { path: '/users/list', component: UserList },
        { path: '/users/create', component: UserEdit },
        { path: '/users/edit/:id', component: UserEdit, props: true },

      ]


    },
  ]

})

router.beforeEach((to, from, next) => {
  // return next('/login')
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router