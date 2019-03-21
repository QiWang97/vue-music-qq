import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import RaidoPage from './views/RaidoPage.vue'
import SongListPage from './views/SongListPage.vue'
import RankListPage from './views/RankListPage.vue'
import AlbumListPage from './views/AlbumListPage.vue'
import SingerPage from './views/SingerPage.vue'
import Test from './views/Test.vue'
/* import ListCard from '@/components/MainItems/ListCard.vue' */

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: Index 
    }, {
      path: '/radio',
      name: 'RaidoPage',
      component: RaidoPage
    }, {
      path: '/songList/:id',
      name: 'SongListPage',
      component: SongListPage
    },
    {
      path: '/albumList/:albummid',
      name: 'AlbumListPage',
      component: AlbumListPage
    },
     {
      path: '/singer/:singermid',
      name: 'SingerPage',
      component: SingerPage
    },
    {
      path: '/rankList',
      name: 'RankListPage',
      component: RankListPage
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})