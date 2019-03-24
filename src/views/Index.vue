<template>
  <!-- main -->
  <div>
    <!-- header -->
    <top-bar is-fixed
             class="bg-white"
             :btn-title="'点击下载'"
             :img-url="logoMin">
      <h1>音乐无极限</h1>
    </top-bar>
    <div class="bg-gray main">
      <!-- nav -->
      <nav class='bg-white text-center flex flex-wrap'>
        <a v-for="(item,index) in navli"
           class='block'
           href="javascript:;"
           :class="{'active':currentIndex===index}"
           :key='index'
           @click="select(index)">{{item.name}}
        </a>
      </nav>
      <nav-anim>
        <keep-alive>
          <component :is="currentTabComponent"></component>
        </keep-alive>
      </nav-anim>

      <footer class='text-center p-b-lg'>
        <h5 class='m-v-lg'>查看电脑版网页</h5>

        <a href="javascript:;"><img v-lazy="logo"
               alt="logo" /></a>
        <h6 class='m-v-sm'>Copyright © 1998 - <span>2019</span> Tencent. All Rights Reserved.</h6>
        <h6>资源仅供学术使用，请勿商用</h6>
        <h6>官方网站：<a href="https://y.qq.com/m/index.html">QQ 音乐</a></h6>

      </footer>
    </div>
  </div>
</template>

<script>
import API from '@/api'

export default {
  name: 'index',
  components: {
    RecommendPage: resolve => require(['@/views/RecommendPage'], resolve),
    SerachPage: resolve => require(['@/views/SerachPage'], resolve),
    RankPage: resolve => require(['@/views/RankPage'], resolve),
    NavAnim: resolve => require(['@/components/Animation/NavAnim'], resolve),
    TopBar: resolve => require(['@/components/Header/TopBar'], resolve)
  },
  data () {
    return {
      currentTabComponent: 'RecommendPage',   // 动态组件
      currentIndex: 0,       // 动态组件绑定的 id
      navli: [{         // 动态组件渲染的列表
        name: '推荐',
        component: 'RecommendPage',
      }, {
        name: '排行榜',
        component: 'RankPage'
      }, {
        name: '搜索',
        component: 'SerachPage'
      }]
    }
  },
  computed: {
    logo: resolve => require('@/assets/img/logo@2x.png'),
    logoMin: resolve => require('@/assets/img/logo.svg')
  },
  methods: {
    select (id) {
      this.currentIndex = id
      this.currentTabComponent = this.navli[id].component
    },
    /*  
    ToDo:
    这里想实现左右滑动效果
    但是 recommend page 使用的 swipe 插件会触发父组件的事件
    所以失败了
    */
    /*
     nextPage () {
       let id = this.currentIndex + 1
       let num = this.navli.length - 1
       if (id > num) { id = 0 }
       this.select(id)
     },
     prePage () {
       console.log('index:  aaaaaaaa')
       let id = this.currentIndex - 1
       let num = this.navli.length - 1
       if (id < 0) { id = num }
       this.select(id)
     }
     */
  }
}
</script>
<style lang="scss" rel='styless/scss' scoped>
.main {
  padding-top: 5rem;
  align-items: baseline;
}
nav {
  a {
    line-height: 2.5rem;
    font-size: 16px;
    flex: 1 1 auto;
  }
}
.active {
  color: #31c27c;
  border-bottom: #31c27c 2px solid;
}
footer {
  img {
    display: inline-block;
    width: 82px;
    height: 24px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
