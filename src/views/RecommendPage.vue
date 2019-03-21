<template>
  <div class="">
    <div class="slide">
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
  },
  data () {
    return {
      currentIndex: 0,
      loading: true,
      slider: [{
        id: 0,
        linkUrl: "",
        picUrl: ''      }],
      songList: []
    }
  },
  computed: {
    picUrl () {
      return this.slider[this.currentIndex].picUrl || ''
    }
  }
}
</script>

<style lang="" scoped>
</style>