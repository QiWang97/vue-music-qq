<template>
  <div class="">

  </div>
</template>

<script>
import API from '@/api'

export default {
  name: '',
  mounted () {
    let mid = this.$route.query.songmid || ''
    this.mid = mid
    API.getSongInfo(mid).then(res => {
      this.song = res
      this.infoLoading = false
    })
    API.getSongUrlResource.then(res=>{
      this.songUrl = res
      this.songUrlLoading = false
    }) 
    API.get
  },
  data () {
    return {
      infoLoading: true,
      songUrlLoading: true,
      songUrlLoading:true,

      mid: '',
      song: {}
    }
  }
}
</script>

<style lang="" scoped>
</style>