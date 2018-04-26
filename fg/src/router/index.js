import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import blog from '@/pages/blog'
import management from '@/pages/management'
import mpublish from '@/components/mpublish'
import mview from '@/components/mview'
import mEdit from '@/components/mEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: blog
    },
    {
      path: '/management',
      name: 'management',
      component: management,
      children: [
        {
          path: 'publish',
          name: 'publish',
          component: mpublish
        },
        {
          path: 'view',
          name: 'view',
          component: mview
        },
        {
          path: 'edit/:id',
          name: 'edit',
          component: mEdit
        }
      ]
    }
  ]
})
