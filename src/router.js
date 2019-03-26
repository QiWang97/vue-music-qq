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
      props: (route) => ({
        id: route.query.id
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
      props: (route) => ({
        mid: route.query.mid,
      }),
      component: resolve => require(['@/views/AlbumPage'], resolve)
    },
    {
      path: '/singer',
      name: 'singer',
      props: (route) => ({
        mid: route.query.mid,
      }),
      component: resolve => require(['@/views/SingerPage'], resolve)
    },
    {
      path: '/ranklist',
      name: 'ranklist',
      props: (route) => ({
        id: route.query.id,
        vkey: route.query.vkey
      }),
      component: resolve => require(['@/views/RankListPage'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/Test'], resolve)
    },
    {
      path: '/t2',
      name: 't2',
      component: resolve => require(['@/components/List/ListBg'], resolve)
    }
  ]
})