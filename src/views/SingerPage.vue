<template>
  <article class='relative'>
    <!-- 歌手信息 滑动悬停 -->
    <header id='top'>
      <section class='singer-info'>
        <header>
          <img :src='singerIcon'
               alt="">
          <h3>{{singerData.singerName}}</h3>
          <h5>音乐动态尽在QQ音乐</h5>
          <span>立即关注</span>
        </header>
        <div class='album'>
          <img :src="singerIcon"
               alt="">
          <div>
            <h2 class='m-t-xs'>{{singerData.singerName}}</h2>
            <h4 class='m-t-xs'>粉丝：</h4>
            <h5 class='m-t-xs'>歌手介绍</h5>
          </div>
        </div>

        <footer>
          <h3 v-show="showPlayAll"
              @click.stop="addAll"
              class='m-m'><i class="fa fa-play"
               aria-hidden="true"></i>播放全部</h3>
          <div v-show="isPlay"
               class="playBar">
            <i class="fa "
               aria-hidden="true"
               :class="isPlay?'fa-play-circle':'fa-pause-circle'"></i>

            <p> {{song.songName}}
              <br><span>此处应该有歌词</span>
            </p>
            <i class="fa fa-download"
               aria-hidden="true"></i>
          </div>
        </footer>
      </section>
      <img class="cover"
           :src="singerIcon"
           alt="">
    </header>

    <div id='main'>
      <section class='song-info p-h-xl bg-white relative'>
        <h4>歌曲 共（{{singerData.songNum}}）首<span>收藏<i></i></span></h4>
        <ul>
          <li v-for="(item, index) in singerData.hotsong"
              :key="index"
              @click="switchSong(index)">
            <h3>{{item.info[1]|| ''}}</h3>
            <h5>{{item.info[3]|| '' }} &nbsp; &nbsp;{{item.info[5]|| '' }}</h5>
          </li>
        </ul>
        <footer @click="loadMore">
          <h4>点击加载更多</h4>
        </footer>
      </section>

      <footer class='m-t-xl'>
        <section class='newAlbum '>
          <h2 class='text-center'>热门专辑</h2>
          <ul class='flex flex-wrap'>
            <li v-for="(item, index) in singerData.hotalbum"
                @click="toAlbum(item.albumMID)"
                :key="index">
              <img :src="'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+item.albumMID+'.jpg?max_age=2592000'"
                   alt="">
              <h4 class='p-l-sm'>{{item.albumName}}</h4>
            </li>
          </ul>
          <h4 class="text-center m-v-xl b-t-1">去QQ音乐查看{{singerData.albumNum}}张专辑<span></span></h4>
        </section>
      </footer>
    </div>
  </article>
</template>

<script>

/* 传入专辑 mid  */
/* 读取localstorage 数据 */
import API from '@/api'
export default {
  name: 'SingerPage',
  mounted () {
    window.addEventListener('scroll', this.handleScroll);

    let singermid = this.$route.params.singermid || ''
    this.init(singermid)

    /*     API.getAlbumInfo(albummid).then(res => {
          this.listLoading = false
          this.albumInfo = res
        }) */
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      listLoading: true,
      playbarFixed: false,

      isPlay: false,
      showPlayAll: true,
      renderIndex: 5,
      albumInfo: {
        aDate: "2003-07-31",
        albumTips: "",
        color: 1496,
        company: "",
        company_new: [],
        cur_song_num: 11,
        desc: "",
        genre: "",
        id: 8220,
        lan: "",
        list: [],
        mid: "",
        name: "",
        radio_anchor: 0,
        singerid: 4558,
        singermblog: null,
        singermid: "",
        singername: "",
        song_begin: 0,
        total: 11,
        total_song_num: 11
      },
      song: {
        f: "436088|断桥残雪|7221|许嵩|35485|Vae新歌 精选珍藏合辑|1958988|227|9|1|0|9083510|3633531|0|0|0|0|5642756|5496214|0|004ENQPZ0dHaqy|000CK5xN3yZDJt|001jmC6x1RMfh0|31|0",
        info: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          ""],
        songID: 4,
        songMID: "",
        songName: "",
        songname_hilight: ""
      },
      singerData: {
        albumNum: 29,
        hotalbum: [{
          albumID: 35485,
          albumMID: "001jmC6x1RMfh0",
          albumName: "Vae新歌+精选珍藏合辑",
          albumname_hilight: "Vae新歌+精选珍藏合辑",
        }],
        hotsong: [{
          f: "436088|断桥残雪|7221|许嵩|35485|Vae新歌 精选珍藏合辑|1958988|227|9|1|0|9083510|3633531|0|0|0|0|5642756|5496214|0|004ENQPZ0dHaqy|000CK5xN3yZDJt|001jmC6x1RMfh0|31|0",
          songID: 436088,
          songMID: "004ENQPZ0dHaqy",
          songName: "断桥残雪",
          songname_hilight: "断桥残雪",
          info: ['436088', '断桥残雪']
        }],
        mvNum: 277,
        singerID: 7221,
        singerMID: "000CK5xN3yZDJt",
        singerName: "许嵩",
        singerPic: "http://y.gtimg.cn/music/photo_new/T001R150x150M000000CK5xN3yZDJt.jpg",
        singername_hilight: "许嵩",
        songNum: 196
      },
      playList: []
    }
  },
  computed: {
    singerIcon () {
      return this.singerData.singerPic || ''
    }
  },
  methods: {
    switchSong (index) {
      this.song = this.singerData.hotsong[index]
      this.isPlay = true
      this.showPlayAll = false
    },
    loadMore () {

    },
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
    addAll () {
      this.playList = this.singerData.hotsong
    },
    toAlbum (albummid) {
      console.log(albummid)
      this.$router.push({ path: '/albumList', query: { albummid } })
    },
    getData () {

    },
    init (singermid) {
      this.$indexDB.checkData(this, 'singers', singermid)
        .then(res => {
           console.log('跳转后')
          let singerData = res.data
          try {
            singerData.hotsong.forEach((item, index, arr) => {
              /* f=  "436088|断桥残雪|7221|许嵩|35485|Vae新歌 精选珍藏合辑|1958988|227|9|1|0|9083510|3633531|0|0|0|0|5642756|5496214|0|004ENQPZ0dHaqy|000CK5xN3yZDJt|001jmC6x1RMfh0|31|0"
              * info = []
              */
              if (item.f) {
                arr[index].info = item.f.split('|')
              }
            })
            this.singerData = singerData || ''
          } catch (e) {
            throw '本地存储歌曲信息读取失败！'
          }
        }).catch(e=>{
          console.log(e)
        })
    }
  },
  filters: {
    filterNum: function (val) {
      val = parseFloat(val)
      val = val < 10000 ? val : (val / 10000).toFixed(2) + ' 万'
      return val
    },
    filterName: function (arr) {
      let name = ''
      arr.forEach(el => {
        name = name + el.name + ' '
      });
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
article {
  padding-top: 300px;
}
.top {
  z-index: 10;
}
#main {
  z-index: 2;
}
#top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 10;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-transform: scale(1.1) translateZ(0);
    -webkit-filter: blur(36px);
  }
}
.singer-info {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 4;

  header {
    position: relative;
    overflow: hidden;
    height: 80px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 0.05rem 0.05rem rgba(0, 0, 0, 0.02);
    img {
      float: left;
      width: 60px;
      height: 60px;
      border-radius: 100%;
    }
    h3 {
      margin-left: 70px;
      line-height: 40px;
    }
    h5 {
      margin-left: 70px;
      line-height: 20px;
    }
    span {
      display: block;
      position: absolute;
      right: 20px;
      top: 50%;
      width: 78px;
      height: 27px;
      margin-top: -13px;
      padding: 3px 5px;
      border: 1px rgba(255, 255, 255, 0.3) solid;
      border-radius: 15px;
      text-align: center;
      font-size: 14px;
    }
  }
  .album {
    height: 145px;
    padding: 10px;
    img {
      float: left;
      width: 125px;
      height: 125px;
    }
    div {
      overflow: hidden;
      margin-left: 130px;
      height: 125px;
      padding: 5px;
    }
  }
  footer {
    position: relative;
    height: 84px;
    padding: 10px;
    transition: all 1s ease-in-out;
    -webkit-transition: 1s ease-in-out;
    h3 {
      width: 170px;
      padding: 0 20px;
      text-align: center;
      line-height: 40px;
      color: #fff;
      border-radius: 20px;
      background: #31c27c;
      i {
        display: inline-block;
        margin-right: 10px;
      }
    }
    span {
      font-size: 12px;
    }
  }
}
.song-info {
  h4 {
    line-height: 50px;
  }
  span {
    float: right;
    color: #31c27c;
  }

  li {
    height: 60px;
  }
  footer {
    text-align: center;
    line-height: 30px;
  }
}

.newAlbum {
  h2 {
    line-height: 50px;
  }
  ul {
    width: 100%;
  }
  li {
    width: calc(50% - 2px);
    display: block;
  }
  li:nth-of-type(even) {
    margin-left: 2px;
  }
  li:nth-of-type(odd) {
    margin-right: 2px;
  }
  img {
    width: 100%;
  }
  li > h4 {
    height: 40px;
    line-height: 40px;
  }
  & > h4 > span {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-style: solid;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(-45deg);
  }
}
.playBar {
  i:first-child {
    font-size: 40px;
    line-height: 75px;
    display: inline-block;
    float: left;
    vertical-align: top;
  }
  i:last-child {
    font-size: 20px;
    line-height: 75px;
    display: inline-block;
    float: right;
    vertical-align: top;
  }
  p {
    display: inline-block;
    padding: 16px 10px;
    height: 75px;
    font-size: 14px;
    vertical-align: top;
  }
}
</style>