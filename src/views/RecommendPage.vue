<template>
  <div class='recommend'>
    <top-swiper :list='list'></top-swiper>
    <!-- 这里是想让滑块不触发滑动事件 但是失败了 -->
    <radio-card></radio-card>
    <list-card :list='songList'></list-card>
  </div>

</template>

<script>
import API from '@/api'

export default {
  name: 'recommend',
  components: {
    ListCard: resolve => require(['@/components/Card/ListCard'], resolve),
    RadioCard: resolve => require(['@/components/Card/RadioCard'], resolve),
    TopSwiper: resolve => require(['@/components/Header/TopSwiper'], resolve)
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      loading: true,
      songList: [],
      slider: [{           // 轮播图图片
        id: 0,
        linkUrl: "",
        picUrl: ''      }],
    }
  },
  computed: {
    list () {
      return this.slider
    }
  },
  methods: {
    getData () {
      API.getHomePageInfo().then(res => {
        this.loading = false
        let slider = res.data.slider || []
        let songList = res.data.songList || []
        this.slider = slider
        this.songList = songList
        return [{ name: 'slider', data: slider }, { name: 'songList', data: songList }]
      })
        .then(res => {
          res.forEach(item => {
            this.$indexDB.addOneData(this,'recommend',item)
          })
        })
    },
    init () {
      Promise.all([
        this.$indexDB.checkData(this, 'recommend', 'slider')
          .then(res => {
            this.slider = res.data
          }),
        this.$indexDB.checkData(this, 'recommend', 'songList')
          .then(res => {
            this.songList = res.data
          })
      ]).catch(e => {
        console.log(e)
        this.getData()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.recommend{
  overflow: hidden;
}
.slider {
  padding-top: 1px;
  background-color: #fff;
}
</style>