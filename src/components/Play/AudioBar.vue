<template>
  <audio ref='audio'
         v-if="songUrl != ''">
    <source :src='songUrl'
            type='audio/mp3'>
  </audio>
</template>

<script>
import API from '@/api'
export default {
  name: 'audiobar',
  mounted () {
    if (this.mid && this.mid.trim() != '') {
      this.getSongUrl(this.mid)
    }
  },
  props: {
    mid: {
      type: String,
      defaule: ''
    },
  },
  data () {
    return {
      loading: true,
      songUrl: '',
      status: false
    }
  },
  watch: {
    mid: function (val) {
      if (!val) return;
      this.pause()
      this.getSongUrl(val)
      setTimeout(() => {
        this.play()
      }, 1000);

    },
  },
  methods: {
    play () {
      let audio = this.$refs.audio || ''
      if (!audio || this.loading) return;
      if (audio.paused || audio.ended) {
        setTimeout(() => {
          audio.play()
          this.status = true
        }, 1000);
      }
    },
    pause () {
      let audio = this.$refs.audio || ''
      if (!audio || this.loading) return;
      setTimeout(() => {
        audio.pause()
        this.status = false
      }, 1000);
    },
    getSongUrl (mid) {
      this.loading = true
      API.getSongUrlResource(mid)
        .then(res => {
          this.songUrl = res
          this.loading = false
        })
    }
  }
}
</script>