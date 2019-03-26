<template>
  <article class='relative'>
    <!-- 歌手信息 滑动悬停 -->
    <header id='top'>
      <section class='singer-info'>
        <header>
          <img :src='albumUrl'
               alt="">
          <h3>{{albumInfo.singername}}</h3>
          <h5>音乐动态尽在QQ音乐</h5>
          <span>立即关注</span>
        </header>
        <div class='album'>
          <img :src="albumUrl"
               alt="">
          <div>
            <h2 class='m-t-xs'>{{albumInfo.singername}}</h2>
            <h4 class='m-t-xs'>粉丝：</h4>
            <h5 class='m-t-xs'>歌手介绍</h5>
          </div>
        </div>

        <footer>
          <h3 class='m-m'
              v-show="!isPlay"><i class="fa fa-play"
               aria-hidden="true"></i>播放全部</h3>
          <div v-show="isPlay"
               class="playBar">
            <i class="fa "
               aria-hidden="true"
               :class="isPlay?'fa-play-circle':'fa-pause-circle'"></i>
            <p> {{song.songorig}}
              <br><span>{{song.songname}}</span></p>

            <i class="fa fa-download"
               aria-hidden="true"></i>
          </div>
        </footer>
      </section>
      <img class="cover"
           :src="albumUrl"
           alt="">
    </header>
    <div id='main'>

      <section class='song-info p-h-xl bg-white relative'>
        <h4>歌曲 共（{{albumInfo.total_song_num}}）首<span>收藏<i></i></span></h4>
        <ul>
          <li v-for="(item, index) in showSongs"
              :key="index"
              @click="switchSong(index)">
            <h3>{{item.songorig}}</h3>
            <h5>{{item.singer | filterName}} {{item.songname}}</h5>
          </li>
        </ul>
        <footer @click="loadMore">
          <h4>点击加载更多</h4>
        </footer>
      </section>

      <section class='album-info'>
        <h3 class="text-center m-v-xl">专辑介绍</h3>
        <p v-html="albumInfo.desc||''"></p>
      </section>
    </div>

  </article>
</template>

<script>
/* 传入专辑 mid  */
import API from '@/api'
export default {
  name: 'AlbumListPage',
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
    let albummid = this.$route.query.albummid
    console.log(albummid)
    API.getAlbumInfo(albummid).then(res => {
      this.listLoading = false
      this.albumInfo = res
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      listLoading: true,

      isPlay: false,
      renderIndex: 5,
      albumInfo: {
        aDate: "2003-07-31",
        albumTips: "",
        color: 14712896,
        company: "杰威尔音乐有限公司",
        company_new: Object,
        cur_song_num: 11,
        desc: "2003年最被期待的专辑",
        genre: "Pop 流行",
        id: 8220,
        lan: "国语",
        list: [],
        mid: "000MkMni19ClKG",
        name: "叶惠美",
        radio_anchor: 0,
        singerid: 4558,
        singermblog: null,
        singermid: "0025NhlN2yWrP4",
        singername: "周杰伦",
        song_begin: 0,
        total: 11,
        total_song_num: 11
      },
      song: {
        albumdesc: "",
        albumid: 14323,
        albummid: "0032ezFm3F53yO",
        albumname: "周杰伦 2004 无与伦比 演唱会 Live CD",
        alertid: 2,
        belongCD: 21,
        cdIdx: 1,
        interval: 302,
        isonly: 1,
        label: "4611686153727246337",
        msgid: 14,
        preview: { trybegin: 0, tryend: 0, trysize: 960887 },
        rate: 0,
        singer: [{ id: 4558, mid: "0025NhlN2yWrP4", name: "周杰伦" }],
        size5_1: 0,
        size128: 4838115,
        size320: 12094457,
        sizeape: 40328141,
        sizeflac: 40546279,
        sizeogg: 7183394,
        songid: 4962990,
        songmid: "002ZKnKQ34rbZu",
        songname: "七里香 (Live)",
        songorig: "七里香",
        songtype: 0,
        strMediaMid: "002ZKnKQ34rbZu",
        stream: 3,
        switch: 17413891,
        type: 0,
        vid: "k0013kkrhv3"
      }
    }
  },
  computed: {
    showSongs () {
      let flag = this.renderIndex - this.albumInfo.total_song_num
      return flag < 0 ? this.albumInfo.list.slice(0, this.renderIndex) : this.albumInfo.list
    },
    albumUrl () {
      if (this.listLoading) return '';
      return 'https://y.gtimg.cn/music/photo_new/T001R150x150M000' + this.albumInfo.singermid + '.jpg?max_age=2592000'

    }

  },
  methods: {
    switchSong (index) {
      this.song = this.albumInfo.list[index]
      this.isPlay = true
    },
    loadMore (e) {
      if (this.renderIndex > this.albumInfo.total_song_num) return
      this.renderIndex += 5
    }, handleScroll (e) {
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
.album-info {
  display: block;
  margin-top: 20px;
  padding: 20px;
  font-size: 14px;
  line-height: 1.5;
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