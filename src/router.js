import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: resolve => require(['@/views/Index'], resolve)
    }, {
      path: '/radio',
      name: 'radio',
      props:(route)=>({
        id:route.query.id
      }),
      component: resolve => require(['@/views/RaidoPage'], resolve)
    }, {
      path: '/songlist',
      name: 'songlist',
      props: (route) => ({
        id: route.query.id
      }),
      component: resolve => require(['@/views/SongListPage'], resolve)
    },
    {
      path: '/album',
      name: 'album',
      component: resolve => require(['@/views/AlbumPage'], resolve)
    },
    {
      path: '/singer/:mid',
      name: 'singer',
      component: resolve => require(['@/views/SingerPage'], resolve)
    },
    {
      path: '/ranklist',
      name: 'ranklist',
      component: resolve => require(['@/views/RankListPage'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/Test'], resolve)
    }
  ]
})