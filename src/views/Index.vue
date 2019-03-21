<template>
  <!-- main -->
  <div class="bg-gray">
    <!-- header -->
    <header class="main-header bg-white">
      <div class="p-v-xl p-h-xl">
        <img class='fl'
             src="@/assets/logo@2x.png"
             alt="logo" />
        <h1 class='fr m-r-xl'>音乐无极限</h1>
      </div>
    </header>
    <!-- nav -->
    <nav class='bg-white m-t-xs'>
      <ul class='text-center'>
        <li v-for="(item,index) in navli"
            :class="{'active':currentIndex === index}"
            :key=index
            @click="select(index)">
          <h4>{{item.name}}</h4>
        </li>
      </ul>
    </nav>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
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
.main-header {
  height: 80px;
  img {
    display: block;
    width: 7.9375rem;
  }
}
nav {
  display: block;
  height: 40px;
  ul li {
    display: block;
    float: left;
    width: 33%;
    background-color: #fff;
  }
  h4 {
    line-height: 40px;
    font-size: 16px;
  }
}
.active {
  color: #31c27c;
  border-bottom: #31c27c 2px solid;
}
</style>
