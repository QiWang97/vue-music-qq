<template>
  <div class="">
    <div id='slider'
         class="slider">
        <img :src="picUrl"
             alt="">
    </div>
    <radio-card></radio-card>
    <list-card :list='songList'></list-card>
  </div>
</template>

<script>
import API from '@/api'
import RadioCard from '@/components/Card/RadioCard.vue'
import ListCard from '@/components/Card/ListCard.vue'

export default {
  name: 'RecommendPage',
  components: {
    ListCard,
    RadioCard
  },
  mounted () {
    API.getHomePageInfo().then(res => {
      this.loading = false
      this.slider = res.data.slider
      this.songList = res.data.songList
    })

    this.winWidth = window.innerWidth || document.body.clientWidth || 375
    this.imgHeight = this.winWidth / 2.5

  },
  data () {
    return {
      loading: true,
      songList: [],

      currentIndex: 0,// 轮播图索引      
      slider: [{           // 轮播图图片
        id: 0,
        linkUrl: "",
        picUrl: ''      }],
      winWidth: 375,  // 窗口宽度
      imgHeight: 150  // 图片高度 2.5倍

    }
  },
  computed: {
    picUrl () {
      return this.slider[this.currentIndex].picUrl || ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.slider {
  padding-top: 1px;
  background-color: #fff;
}
</style>