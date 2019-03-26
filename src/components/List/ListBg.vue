<template>
  <article class='relative'>
    <!-- header -->
    <header id='top'>
      <div class='relative'>
        <!-- 顶部信息 -->
        <top-bar :is-fixed='false'
                 class='topbar'>
          <template #img>
            <img v-lazy="logo"
                 alt="">
          </template>
          <h4>QQ音乐好歌单</h4>
          <template #btn>
            <span>立即收藏</span>
          </template>
        </top-bar>
        <!-- 专辑信息 -->
        <div class='album flex'>
          <div>
            <img v-lazy="imgurl"
                 v-if="imgurl!=''"
                 alt="">
          </div>
          <div>
            <slot name='info'></slot>
          </div>
        </div>
        <!-- 播放全部 -->
        <div class="relative">
          <div class="playbar">
            <div v-show="showPlayAll && !isPlay"
                 @click="playAll"
                 class='m-m'>
              <h3>
                <i class="fa fa-play"
                   aria-hidden="true"></i>
                播放全部
              </h3>
            </div>
            <!-- 播放控制 -->
            <div v-show="!showPlayAll"
                 class='flex bar'>
              <i class='fa fa-play-circle'
                 v-show='!isPlay'
                 @click="play"
                 aria-hidden="true"></i>
              <i class="fa fa-pause-circle"
                 v-show='isPlay'
                 @click="pause"
                 aria-hidden="true"></i>
              <div>
                <slot name='lyric'></slot>
              </div>
              <i class="fa fa-download"
                 aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部背景 -->
      <img class="cover"
           v-if="imgurl!=''"
           v-lazy="imgurl"
           alt="">
    </header>
    <section class='p-h-xl bg-white relative'>
      <slot name='list'></slot>
    </section>
    <footer class='m-v-xl'>
      <h2 class='text-center'>歌单简介</h2>
      <slot name='default'></slot>
      <slot name='desc'></slot>
      <img v-lazy="logo"
           alt="">
      <h4 class='text-center'>QQ音乐</h4>
    </footer>

    <audio-bar :mid='songmid'
               ref='audio'></audio-bar>
  </article>
</template>

<script>
/* 传入歌单 id  */
import API from '@/api'
export default {
  name: 'listbg',
  props: {
    song: {
      type: Object,
      default: function () {
        return {}
      }
    },
    songmid: {
      type: String,
      default: ''
    },
    imgurl: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    TopBar: resolve => require(['@/components/Header/TopBar'], resolve),
    AudioBar: resolve => require(['@/components/Play/AudioBar'], resolve),
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      logo: require('@/assets/img/logo.png'),
      isPlay: false,
      showPlayAll: true,
      playList: [],
      songing:{}
    }
  },
  methods: {
    handleScroll (e) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //  当滚动超过 200 时，实现吸顶效果
      let top = document.getElementById('top')
      if (scrollTop > 225) {
        top.style.transform = 'translateY(-225px)'
      } else {
        top.style.transform = `translateY(-${scrollTop}px)`
      }
    },
    play () {
      this.isPlay = true
      this.$refs.audio.play()
    },
    pause () {
      this.isPlay = false
      this.$refs.audio.pause()
    },
    playAll () {
      this.playList = this.list
      this.songing = this.playList[0]
      this.showPlayAll = false
      this.play()
    },
  }
}
</script>

<style lang="scss" scoped>
article {
  padding: 18.5rem 0 2rem;
  background-color: #fff;
}
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  color: #fff;
  z-index: 10;
  & > div {
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0.05rem 0.05rem rgba(0, 0, 0, 0.2);
  }
}
.topbar {
  background: rgba(0, 0, 0, 0.2);
}
.album {
  color: #fff;
  height: 9rem;
  padding: 1rem 1rem;
  align-items: top;
  overflow: hidden;
  & > div:first-child {
    flex: 1 1 6.5rem;
    img {
      width: 100%;
    }
  }
  & > div:last-child {
    flex: 2 1 9rem;
    padding-left: 1rem;
  }
}

.playbar {
  height: 5rem;
  overflow: hidden;
  z-index: 3;
  transition: all 1s ease-in-out;
  -webkit-transition: 1s ease-in-out;
  transform: translateY(0);
  h3 {
    width: 10.5rem;
    padding: 0 1.25rem;
    margin: 0 auto;
    text-align: center;
    font-size: 1rem;
    line-height: 2.5rem;
    color: #fff;
    border-radius: 1.25rem;
    background: #31c27c;
  }
  .bar {
    align-items: center;
    height: 100%;
    padding: 0 1.25rem;
    i {
      display: inline-block;
      font-size: 2rem;
      width: 2rem;
      padding: 0 0.5rem;
      color: #31c27c;
    }
    & > div {
      flex: 1 1 auto;
      margin-left: 1rem;
    }
  }
}
.cover {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  -webkit-transform: scale(1.1) translateZ(0);
  -webkit-filter: blur(36px);
}

footer {
  padding: 0 1rem;
  text-align: center;
  margin-top: 1rem;
  h2 {
    font-size: 1rem;
    line-height: 3.125rem;
  }
  p {
    font-size: 1rem;
    text-align: justify;
  }
  img {
    display: inline-block;
    margin-top: 0.625rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
  }
}
</style>