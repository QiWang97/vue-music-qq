<template>
  <article class='relative'>
    <header id='top'>
      <section class='singer-info'>
        <header>
          <img :src="logo"
               alt="">
          <h4>QQ音乐好歌单</h4>
          <span>立即收藏</span>
        </header>
        <div class='album'>
          <img :src="cdlist.logo"
               alt="">
          <div>
            <h2 class='m-t-xs'>{{cdlist.dissname}}</h2>
            <h4 class='m-t-xs'><img :src="logo"
                   alt=""> {{cdlist.nickname}}</h4>
            <h5 class='m-t-xs'>播放量： {{cdlist.visitnum | filterNum}}</h5>
          </div>
        </div>
        <footer>
          <h3 v-show="showPlayAll"
              @click.stop="addAll"
              class='m-m'><i class="fa fa-play"
               aria-hidden="true"></i>播放全部</h3>
          <h4 v-show="isPlay">
            <i class="fa "
               aria-hidden="true"
               :class="isPlay?'fa-play-circle':'fa-pause-circle'"></i>
            {{song.songorig}}
            <br><span>{{song.songname}}</span>
            <i></i>
          </h4>
        </footer>
      </section>
      <img class="cover"
           :src="cdlist.logo"
           alt="">
    </header>
    <div id='main'>
      <section class='song-info p-h-xl bg-white relative'>
        <h4>歌单 共（{{cdlist.total_song_num}}）首<span>收藏<i></i></span></h4>
        <ul>
          <li v-for="(item, index) in showSongs"
              :key="index"
              @click="switchSong(index)">
            <h3>{{item.songorig||''}}</h3>
            <h5>{{(item.singer||[]) | filterName}} {{item.songname||''}}</h5>
          </li>
        </ul>
        <footer @click="loadMore">
          <h4>点击加载更多</h4>
        </footer>
      </section>
      <footer class='m-v-xl info '>
        <h2 class='text-center'>歌单简介</h2>
        <p v-html='cdlist.desc'></p>
        <img :src="logo"
             alt="">
        <h4 class='text-center'>QQ音乐</h4>

      </footer>
    </div>
  </article>
</template>

<script>
/* 传入歌单 id  */
import API from '@/api'
export default {
  name: 'SongListPage',
  props:['id'],
  mounted () {
    window.addEventListener('scroll', this.handleScroll);    
    this.init(parseInt(this.id))
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data () {
    return {
      listLoading: true,
      logo: require('@/assets/img/logo.png'),
      isPlay: false,
      showPlayAll: true,
      renderIndex: 5,
      cdlist: {
        album_pic_mid: "",
        coveradurl: "",
        ctime: 0,
        cur_song_num: 0,
        desc: "",
        dir_pic_url2: "",
        dir_show: 1,
        dirid: 29,
        dissid: 2646688,
        dissname: "",
        disstid: "",
        disstype: 0,
        headurl: "",
        ifpicurl: "",
        isAd: 0,
        isdj: 0,
        logo: "",
        nickname: "Harry",
        pic_mid: "",
        singerid: 0,
        singermid: "",
        song_begin: 0,
        song_update_num: 0,
        song_update_time: 0,
        songids: '',
        songlist: [],
        songtypes: '',
        tags: [],
        total_song_num: 0,
        type: 2,
        visitnum: 0
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
      },
      playList: []

    }
  },
  computed: {
    showSongs () {
      let flag = this.renderIndex - this.cdlist.total_song_num
      return flag < 0 ? this.cdlist.songlist.slice(0, this.renderIndex) : this.cdlist.songlist
    }
  },
  methods: {
    switchSong (index) {
      this.song = this.cdlist.songlist[index]
      this.isPlay = true
    },
    loadMore (e) {
      if (this.renderIndex > this.cdlist.total_song_num) return
      this.renderIndex += 5
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
      this.playList = this.cdlist.songlist
    },
    init (dissid) {
      this.$indexDB.checkData(this, 'songLists', dissid)
        .then(res => {
          this.slider = res.data
        }).catch(e => {
          console.log(e)
          this.getData(dissid)
        })
    },
    getData (dissid) {
      API.getSongListInfo(dissid).then(res => {
        this.listLoading = false
        let data = res.cdlist[0]
        this.cdlist = data
        return { dissid, data }
      }).then(res => {
        this.$indexDB.addOneData(this, 'songLists', res)
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
    & > img {
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
    h4 > img {
      display: inline-block;
      width: 30px;
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

.info p {
  padding: 15px;
  font-size: 14px;
  line-height: 24px;
  text-align: justify;
}
.info img {
  width: 25px;
  height: 25px;
  margin: 0 auto;
}
</style>