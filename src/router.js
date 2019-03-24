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
      name: 'RaidoPage',
      component: resolve => require(['@/views/RaidoPage'], resolve)
    }, {
      path: '/songList/:id',
      name: 'SongListPage',
      component: resolve => require(['@/views/SongListPage'], resolve)
    },
    {
      path: '/albumList',
      name: 'AlbumListPage',
      component: resolve => require(['@/views/AlbumListPage'], resolve)
    },
    {
      path: '/singer/:singermid',
      name: 'SingerPage',
      component: resolve => require(['@/views/SingerPage'], resolve)
    },
    {
      path: '/rankList',
      name: 'RankListPage',
      component: resolve => require(['@/views/RankListPage'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/Test'], resolve)
    }
  ]
})