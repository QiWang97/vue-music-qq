<template>
  <!-- main -->
  <div class="bg-gray">
    <!-- header -->
    <header class="p-b-xs">
      <div class="bg-white v-m-p">
        <a href="jsvascript:;"><img src="@/assets/logo@2x.png"
               alt="logo" /></a>
        <h1>音乐无极限</h1>
      </div>
    </header>
    <!-- nav -->
    <nav class='bg-white text-center  flex flex-wrap'>
      <a v-for="(item,index) in navli"
         class='block'
         href="javascript:;"
         :class="{'active':currentIndex===index}"
         :key='index'
         @click="select(index)">{{item.name}}
      </a>
    </nav>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
    <footer class='text-center p-b-lg'>
      <h5 class='m-v-lg'>查看电脑版网页</h5>

      <a href="javascript:;"><img src="@/assets/logo@2x.png"
             alt="logo" /></a>
      <h6 class='m-v-sm'>Copyright © 1998 - <span>2019</span> Tencent. All Rights Reserved.</h6>
      <h6>资源仅供学术使用，请勿商用</h6>
      <h6>官方网站：<a href="https://y.qq.com/m/index.html">QQ 音乐</a></h6>

    </footer>
  </div>
</template>

<script>
/*
应用主页

*/
import API from '@/api'
import RecommendPage from '@/views/RecommendPage'
import SerachPage from '@/views/SerachPage'
import RankPage from '@/views/RankPage'

export default {
  name: 'Index',
  components: {
    RecommendPage,
    SerachPage,
    RankPage
  },
  data () {
    return {
      currentTabComponent: 'RecommendPage',
      currentIndex: 0,
      navli: [{
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
  methods: {
    select (id) {
      this.currentIndex = parseInt(id)
      this.currentTabComponent = this.navli[this.currentIndex].component
    }
  }
}
</script>
<style lang="scss" rel='styless/scss' scoped>
header {
  & > div {
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 0.625rem;
    height: 5rem;
    width: 100%;
    z-index: 999;
  }
  img {
    width: 7.94rem;
  }
}
nav {
  height: 2.5rem;
  margin-top: 5rem;
  a {
    width: 33%;
    line-height: 2.5rem;
    font-size: 16px;
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
</style>
