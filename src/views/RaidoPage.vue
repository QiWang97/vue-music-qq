<template>
  <article @click="toggleSongList(1)">
    <header v-if='!radioLoading'>
      <img :src="singerAlbum"
           alt="">
      <div class='fl m-l-xl'>
        <h3>{{song.singer|filterSingername}}</h3>
        <h4>更多好音乐</h4>
      </div>
      <span>立即收听</span>
    </header>
    <section class=info
             v-if='!radioLoading'>
      <header class='m-v-lg'>
        <h2>{{song.name}} <i @click.stop="toggleSongList(0)"></i> </h2>
        <h4>{{song.singer|filterSingername}}</h4>
      </header>
      <div @click="toggleAlbum"
           class="info-main">
        <div class="info-lyric"
             v-show='!showAlbum'>
          <h4 clas='h14'>查看完整歌词<i></i></h4>
        </div>
        <img :src="album"
             alt=""
             v-show='showAlbum'>
      </div>
      <footer>
        <div class='info-btn'>
          <i></i>
          <i class='info-btn-mid'></i>
          <i></i>
        </div>
        <div class='download'>下载歌曲</div>
      </footer>
    </section>
    <section class="likeSong p-h-sm m-t-lg">
      <h3>猜你喜欢</h3>
      <ul>
        <li v-for="(item, index) in likeSongs"
            :key="index">
          <img :src="item.album"
               alt="">
          <div class='fl p-sm'>
            <h4>{{item.name}}</h4>
            <h5>{{item.singer}}</h5>
          </div>
          <i></i>
        </li>
      </ul>
    </section>
    <section class="likeRadio p-h-sm">
      <h3>大家都在听</h3>
      <ul>
        <li v-for="(item, index) in likeRadios"
            :key="index">
          <img :src="item.album"
               alt="">
          <div>
            <h4>{{item.name}}</h4>
            <h5>{{item.user}}</h5>
          </div>
        </li>
      </ul>
    </section>
    <section class="special p-h-sm">
      <h3>歌手与专辑</h3>
      <div class="special-item">
        <img :src="special.singericon"
             alt="">

        <h4>歌手 {{special.singer}}</h4>
        <i></i>
      </div>
      <div class="special-item">
        <img :src="special.album"
             alt="">
        <h4>专辑 {{special.albumName}}</h4>
        <i></i>
      </div>
    </section>
    <section class="comment p-h-sm">
      <h3>精彩评论</h3>
      <ul>
        <li v-for="(item, index) in hotCommentList"
            :key="index">
          <aside><img :src="item.avatarurl"
                 alt=""></aside>
          <div>
            <h4>{{item.rootcommentnick}}</h4>
            <h6>{{item.time}}</h6>
            <p>{{item.rootcommentcontent}}</p>
            <span>{{item.praisenum}} <i></i> </span>
          </div>
        </li>
      </ul>
      <div class='commont-more'
           @click='showComment'>查看更多评论</div>
    </section>
    <section class="mv p-h-sm"
             v-if="false">
      <h3>推荐音乐视频</h3>
      <ul>
        <li v-for="(item, index) in mvs"
            :key="index">
          <!-- <video src=""></video> -->
          <img :src="item.img"
               alt="">
          <h4>{{item.name}}</h4>
          <h5>{{item.singer}}</h5>
          <span></span>
        </li>
      </ul>
    </section>
    <section class='songList'
             v-show="showSongList">
      <header>
        <h4>播放队列（{{songList.length}}）首</h4>
      </header>
      <ul>
        <li v-for="(item, index) in songList"
            :key="index"
            @click.stop="switchSong(index)">
          <span :class=' {focus:item.id==song.id}'>{{item.name}}</span>
          <span :class=' {focus:item.id==song.id}'> - {{item.singer|filterSingername}}</span>
        </li>
      </ul>

    </section>
  </article>
</template>

<script>
import { radioCookies, setCookie } from '@/api/util'
import API from '@/api'
export default {
  name: 'RaidoPage',
  mounted () {
    let expireDays = 1000 * 60 * 60;
    for (let key in radioCookies) {
      setCookie(key, radioCookies[key], expireDays)
    }
    API.getRadioList(parseInt(this.$route.query.radioId))
      .then(res => {
        this.radioLoading = false
        this.raidoList = res.radiolist.data.radio_list
        this.songList = res.songlist.data.track_list
        this.raidoListTitle = res.radiolist.data.raidoListTitle
        this.songListId = res.songlist.data.id
        this.song = this.songList[0]
        this.getComment(this.song.id, 10, 0)
      })
  },
  data () {
    return {
      radioLoading: true,
      showSongList: false,
      showAlbum: false,
      currentCommentIndex: 1,

      raidoList: [],
      raidoListTitle: '',
      songList: [],
      songListId: 0,
      song: {},
      comment: {},
      hot_comment: {},

      likeSongs: [{
        name: '我的骄傲', singer: '容祖儿', album: require('@/assets/track_radio_199_13_1.jpg'), url: ''      },
      { name: '我的骄傲', singer: '容祖儿', album: require('@/assets/track_radio_199_13_1.jpg'), url: '' },
      { name: '我的骄傲', singer: '容祖儿', album: require('@/assets/track_radio_199_13_1.jpg'), url: '' }],
      likeRadios: [{
        name: '编辑推荐', album: require('@/assets/track_radio_199_13_1.jpg'), user: 'QQ官方歌单'      },
      { name: '编辑推荐', album: require('@/assets/track_radio_199_13_1.jpg'), user: 'QQ官方歌单' },
      { name: '编辑推荐', album: require('@/assets/track_radio_199_13_1.jpg'), user: 'QQ官方歌单' }],
      special: {
        singer: '陈奕迅',
        singerInfo: '',
        singericon: require('@/assets/track_radio_199_13_1.jpg'),
        albumName: '打得火热',
        album: require('@/assets/track_radio_199_13_1.jpg')
      }
    }
  },
  computed: {
    album () {
      let mid = this.song.album.mid || ''
      return API.getAlbumURL(mid)
    },
    singerAlbum () {
      let mid = this.song.singer[0].mid || ''
      return API.getSingerAlbumURL(mid)
    },
    commentList () {
      return this.comment.commenttotal > 0 ? this.comment.commentlist : []
    },
    hotCommentList () {
      return this.hot_comment.commenttotal > 0 ? this.hot_comment.commentlist : []
    }

  },
  methods: {
    toggleSongList (flag) {
      this.showSongList = flag == 1 ? false : !this.showSongList
    },
    toggleAlbum () {
      this.showAlbum = !this.showAlbum
    },
    showComment () {
      let total = this.hotCommentList.length
      if (this.currentCommentIndex > total) return
      this.currentCommentIndex += 5
    },
    switchSong (index) {
      this.song = this.songList[index]
      this.getComment(this.song.id, 10, 0)
    },
    getComment (id, page, num) {
      API.getSongComment(id, page, num).then(res => {
       this.comment = res.data.comment
        this.hot_comment = res.data.hot_comment
      })
    }

  },
  filters: {
    filterSingername (arr) {
      let name = ''
      arr.forEach(el => {
        if (el.name) {
          name = name + el.name + ' '
        }
      });
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
article > header {
  position: fixed;
  top: 0;
  left: 0;
  $height: 80px;
  height: 80px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  $padding: 10px;
  padding: 10px;
  z-index: 999;
  h3 {
    font-size: 16px;
    line-height: 24px;
  }
  h4 {
    font-size: 14px;
    line-height: 20px;
  }
  img {
    display: block;
    width: 60px;
    height: 60px;
    float: left;
    border-radius: 100%;
  }
  span {
    display: block;
    position: absolute;
    top: $height/2 - 13px;
    right: $padding;
    width: 75px;
    height: 27px;
    border: 1px #000 solid;
    border-radius: 15px;
    text-align: center;
    font-size: 14px;
  }
}
.info {
  padding-top: 80px;
  text-align: center;
  h2 {
    line-height: 28px;
    font-size: 20px;
    i {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-color: #000;
    }
  }
  .info-main {
    position: relative;
    height: 235px;
    width: 100%;

    .info-lyric {
      h4 {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      i {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-right: 1px solid #b2b2b2;
        border-bottom: 1px solid #b2b2b2;
        -webkit-transform: rotate(-45deg);
      }
    }
    img {
      display: block;
      height: 235px;
      height: 235px;
      margin: 0 auto;
    }
  }
  footer {
    .info-btn {
      height: 90px;
      padding: 25px 0;
      i {
        display: inline-block;
        background-color: #000;
        width: 30px;
        height: 30px;
      }
      .info-btn-mid {
        margin: 0 30px;
      }
    }
    .download {
      width: 60%;
      margin: 0 auto;
      line-height: 40px;
      font-size: 20px;
      background-color: #31c27c;
      color: #fff;
      border-radius: 20px;
    }
  }
}
section {
  h3 {
    line-height: 55px;
    font-size: 16px;
    text-align: center;
  }
  h4 {
    font-size: 14px;
    line-height: 20px;
  }
  h5 {
    font-size: 12px;
    line-height: 16px;
  }
}

.likeSong {
  li {
    position: relative;
    margin-top: 2px;
    height: 65px;
    border-bottom: #dfdcdc 1px solid;
    img {
      display: block;
      float: left;
      width: 65px;
      height: 65px;
    }
    i {
      position: absolute;
      top: 50%;
      right: 3%;
      width: 10px;
      height: 10px;
      margin-top: -4px;
      border-right: 1px solid #b2b2b2;
      border-bottom: 1px solid #b2b2b2;
      -webkit-transform: rotate(-45deg);
    }
  }
}
.likeRadio {
  li {
    float: left;
    width: 33%;
    overflow: hidden;
    text-overflow: ellipsis;
    img {
      width: 113px;
      height: 113px;
    }
  }
}
.special {
  .special-item {
    position: relative;
    height: 65px;
    margin-top: 2px;
    border-bottom: 1px #000 solod;
    h4 {
      display: inline-block;
      margin-left: 15px;
      line-height: 65px;
    }
    img {
      float: left;
      display: block;
      width: 65px;
      height: 65px;
    }
    i {
      position: absolute;
      top: 50%;
      right: 3%;
      width: 10px;
      height: 10px;
      margin-top: -4px;
      border-right: 1px solid #b2b2b2;
      border-bottom: 1px solid #b2b2b2;
      -webkit-transform: rotate(-45deg);
    }
  }
}
.comment {
  li {
    position: relative;
    overflow: hidden;
    aside {
      float: left;
      width: 35px;
      height: 100%;
      img {
        width: 35px;
        height: auto;
        border-radius: 100%;
      }
    }
    div {
      margin-left: 40px;
      position: relative;
      span {
        position: absolute;
        display: inline;
        right: 0;
        top: 0;
        i {
          display: inline-block;
          width: 5px;
          height: 5px;
          color: #000;
          background-color: #000;
        }
      }
    }
  }
  .commont-more {
    width: 60%;
    margin: 20px auto;
    line-height: 40px;
    font-size: 16px;
    border-radius: 20px;
    border: 1px #000 solid;
    text-align: center;
    opacity: 0.5;
  }
}
.mv {
  padding: 0 15px 0 15px;
  li {
    margin-top: 15px;
    position: relative;
    img {
      width: 100%;
      height: 194px;
    }
    h4 {
      margin-top: 5px;
    }
    span {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      background-image: url("../assets/list_sprite.png");
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: 45px 110px;
      height: 45px;
      width: 45px;
      margin-top: -45px;
      margin-left: -25px;
    }
  }
}
.songList {
  position: fixed;
  top: 50%;
  left: 0;
  height: 50%;
  width: 100%;
  background-color: #fff;
  z-index: 999;

  header {
    height: 55px;
    width: 100%;
    text-align: center;
    border-top: 1px rgba(209, 202, 202, 0.3) solid;
    border-bottom: 1px rgba(209, 202, 202, 0.3) solid;
    h4 {
      line-height: 55px;
      font-size: 20px;
    }
  }
  li {
    height: 45px;
    margin-left: 15px;
    line-height: 45px;
    border-bottom: 1px rgba(209, 202, 202, 0.3) solid;
    span:first-child {
      font-size: 16px;
    }
    .focus {
      color: #31c27c;
    }
  }
}
</style>