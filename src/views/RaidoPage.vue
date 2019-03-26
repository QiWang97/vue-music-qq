<template>
  <article @click="toggleSongList(1)"
           class="">
    <!-- 头部固定 -->
    <top-bar>
      <template #img>
        <img v-lazy="singerAlbum"
             alt="">
      </template>
      <h3>{{song.singer|nameArr}}</h3>
      <h4>更多好音乐</h4>
      <template #btn>
        <span>立即收听</span>
      </template>
    </top-bar>
    <!-- 头部固定 结束 -->
    <!-- 主界面 -->
    <div class="main relative">
      <!-- 歌词部分 -->
      <div class="pos">
        <section class='info text-center block relative'
                 v-if='!radioLoading'>
          <header class='m-v-lg'>
            <h1>
              {{song.name}}
              <i class="fa fa-list-ul"
                 aria-hidden="true"
                 @click.stop="toggleSongList(0)"></i>
            </h1>
            <h4>{{song.singer|nameArr}}</h4>
          </header>
          <div class="info-main">
            <div class="info-lyric"
                 v-show='!showAlbum'>
              <h4 clas='h14'>查看完整歌词<i></i></h4>
            </div>
            <div class='imfo-img'
                 @click.stop="toggleAlbum">
              <img v-lazy="album"
                   alt=""
                   v-show='showAlbum'>
            </div>
          </div>
          <footer>
            <div class='info-btn flex'>
              <i class="fa fa-step-backward"
                 aria-hidden="true"></i>
              <i class='fa fa-play-circle'
                 v-show='!isPlay'
                 @click="play"
                 aria-hidden="true"></i>
              <i class="fa fa-pause-circle"
                 v-show='isPlay'
                 @click="pause"
                 aria-hidden="true"></i>
              <i class="fa fa-step-forward"
                 aria-hidden="true"></i>
            </div>
            <div class='download'>下载歌曲</div>
          </footer>
        </section>
        <div class='bg-img'>
          <img v-lazy="album"
               alt="">
        </div>
      </div>

      <!-- 歌词部分 结束-->
      <!-- 推荐歌曲 -->
      <section class="likeSong p-h-sm m-t-lg" v-if='likeSongs.length>0'>
        <h3>猜你喜欢</h3>
        <ul>
          <router-link :to="{name:'album',query:{mid:item.album.mid}}"
                       tag='li'
                       v-for="item in likeSongs"
                       :key="item.id">
            <img v-lazy="item.album.url"
                 alt="">
            <div class='fl p-sm'>
              <h4>{{item.name}}</h4>
              <h5>{{item.singer|nameArr}}</h5>
            </div>
            <i></i>
          </router-link>
        </ul>
      </section>
      <!-- 推荐歌曲 结束-->
      <!-- 推荐歌手专辑 -->
      <section class="detail p-h-sm">
        <h3>歌手 专辑</h3>
        <div class="detail-item">
          <img v-lazy="singerAlbum"
               alt="">

          <h4>歌手
            <router-link :to="{name:'singer',query:{mid:song.singer[0].mid}}"
                         v-if='song.singer[0]'>
              {{song.singer|nameArr}}
            </router-link>
          </h4>
          <i></i>
        </div>
        <div class="detail-item">
          <img v-lazy="detail.albumUrl"
               alt="">
          <h4> 专辑
            <router-link :to="{name:'album',query:{mid:detail.track_info.album.mid}}"
                         v-if='detail.track_info'>
              {{detail.name}}
            </router-link>
          </h4>
          <i></i>
        </div>
      </section>
      <!-- 推荐歌手专辑 结束-->
      <!-- 热评 -->
      <section class="comment p-h-sm"
               v-if='hotCommentList.length>0'>
        <h3>精彩评论</h3>
        <ul>
          <li v-for="(item, index) in comments4show"
              :key="index">
            <aside><img v-lazy="item.avatarurl"
                   alt=""></aside>
            <div>
              <h4>{{item.rootcommentnick}}</h4>
              <h6>{{item.time}}</h6>
              <p>{{item.rootcommentcontent}}</p>
              <span>{{item.praisenum}} <i class="fa fa-thumbs-o-up"
                   aria-hidden="true"></i> </span>
            </div>
          </li>
        </ul>
        <div class='commont-more'
             @click='showComment'>查看更多评论</div>
      </section>
      <!-- 热评 结束 -->
      <!-- 推荐mv -->
      <section class="mv p-h-sm"
               v-if='likeMvs.length>0'>
        <h3>推荐 MV</h3>
        <ul>
          <li v-for="(item, index) in likeMvs"
              :key="index">
            <!-- <video src=""></video> -->
            <img v-lazy="item.picurl"
                 alt="">
            <h3>{{item.singers|nameArr}} -- {{item.title||''}}</h3>
            <span></span>
          </li>
        </ul>
      </section>
      <!-- 推荐mv 结束-->

    </div>
    <!-- 主界面  结束-->
    <!-- 上拉歌曲列表 -->
    <section class='songList'
             v-show="showSongList">
      <header>
        <h4>播放队列（{{songList.length}}）首</h4>
      </header>
      <div class='relative'>
        <ul id='list'>
          <li v-for="(item, index) in songList"
              :key="index"
              @click.stop="switchSong(index)">
            <span :class=' {focus:item.id==song.id}'>{{item.name}}</span>
            <span :class=' {focus:item.id==song.id}'> - {{item.singer[0].name||''}}</span>
          </li>
        </ul>
      </div>

    </section>
    <!-- 上拉歌曲列表 结束 -->
    <audio-bar :mid='song.mid'
               ref='audio'></audio-bar>
  </article>
</template>

<script>
import API from '@/api'
export default {
  name: 'radio',
  props: ['id'],
  components: {
    TopBar: resolve => require(['@/components/Header/TopBar'], resolve),
    AudioBar: resolve => require(['@/components/Play/AudioBar'], resolve),
  },
  mounted () {
    // 获取歌单，导入歌单信息
    API.getRadioList(parseInt(this.id))
      .then(res => {
        this.radioLoading = false   // 表示歌单加载完成
        this.raidoList = res.radiolist.data.radio_list || []  // 电台频道列表
        this.songList = res.songlist.data.track_list || []  //  电台歌单
        this.songListId = res.songlist.data.id || 0   // 电台频道 id
        this.song = this.songList[0] || { singer: [{ name: '', mid: '' }], name: '', album: { mid: '', name: '', url: '' }, id: '', mid: '' }   // 加载完成自动设置歌曲信息，但是不自动播放

        this.getComment(this.song.id, 10, 0)
        this.getSongDetails(this.song.id)
      })
  },
  data () {
    return {
      radioLoading: true,   // true 表示电台信息正在加载
      showSongList: false,  // false 表示不展示歌曲列表
      showAlbum: false,    // false 表示不展示歌曲封面
      currentCommentIndex: 1,  // 当前展示的评论序号
      isPlay: false,    // 是否在播放
      songUrl: '',

      songListId: 0,                // 该歌单id ，用于查评论
      song: { singer: [{ name: '', mid: '' }], name: '', album: { mid: '', name: '', url: '' }, id: '', mid: '' },    // 正在播放的歌曲
      playList: [],     // 播放列表
      lyric: '',   // 歌词信息

      raidoList: [],     // 电台的频道列表
      songList: [{ singer: [{ name: '' }], name: '', album: { mid: '', name: '', url: '' }, id: '', mid: '' }],    // 电台歌单歌曲列表
      likeSongs: [{ singer: [{ name: '' }], name: '', album: { mid: '', name: '', url: '' }, id: '', mid: '' }],   // 推荐歌曲    
      comment: {},   // 评论
      hot_comment: {},  //热评    
      likeMvs: [{ mvid: 0, picurl: "", playcnt: 0, singers: [{ name: '' }], title: "", vid: "" }],    //推荐MV
      detail: {       // 歌手和专辑信息
        name: "",
        subtitle: "",
        albumUrl: '',
        info: [],
        track_info: {}
      }
    }
  },
  computed: {
    album () {     // 指定歌曲封面
      let mid = this.song.album.mid || ''
      return API.getAlbumURL(mid)
    },
    singerAlbum () {   // 指定歌手封面
      let mid = this.song.singer[0].mid || ''
      return API.getSingerAlbumURL(mid)
    },
    commentList () { // 评论列表
      return this.comment.commenttotal > 0 ? this.comment.commentlist : []
    },
    hotCommentList () { // 热评列表
      return this.hot_comment.commenttotal > 0 ? this.hot_comment.commentlist : []
    },
    comments () {   // 合并列表
      return this.commentList.concat(this.hotCommentList)
    },
    comments4show () {   // 展示列表
      return this.comments.slice(0, this.currentCommentIndex)
    }

  },
  methods: {
    toggleSongList (flag) {
      this.showSongList = flag == 1 ? false : !this.showSongList
    },
    toggleAlbum (e) { // 点击切换展示封面状态
      this.showAlbum = !this.showAlbum
    },
    play () {
      this.isPlay = true
      this.$refs.audio.play()
    },
    pause () {
      this.isPlay = false
      this.$refs.audio.pause()
    },
    showComment () {  // 加载更多评论
      let total = this.comments.length
      if (this.currentCommentIndex > total) return;
      this.currentCommentIndex += 5
    },
    switchSong (index) {  // 切换歌曲
      this.song = this.songList[index]
      this.getComment(this.song.id, 10, 0)
      this.getSongDetails(this.song.id)
      this.getSongUrl(this.song.mid)

    },
    getComment (id, page, num) {  // 获取评论
      API.getSongComment(id, page, num).then(res => {
        this.comment = res.data.comment
        this.hot_comment = res.data.hot_comment
      })
    },
    getSongDetails (songid) {  // 切换歌曲后，可以直接使用这个函数加载歌曲信息
      API.getSongDetails(songid).then(res => {
        let lylist = res.detail.data.info
        lylist.forEach((item, index, arr) => {
          if (item.type.includes("lyric")) {
            this.lyric = lylist[index].content[0] || ''
          }
        })

        this.detail = {
          name: res.detail.data.extras.name || '',
          subtitle: res.detail.data.extras.subtitle || '',
          info: res.detail.data.info || {},
          track_info: res.detail.data.track_info || {},
          albumUrl: API.getAlbumURL(res.detail.data.track_info.album.mid) || ''
        }
        let list = res.simsongs.data.songInfoList || []
        try {
          list.forEach((item, index, arr) => {
            item.album.url = API.getAlbumURL(item.album.mid) || ''
          })
        } catch (e) {
          console.log('推荐歌曲信息图片处理失败')
        }
        this.likeSongs = list || []
        this.likeMvs = res.video.data.list || []
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  height: 5rem;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  z-index: 2;
}
.top > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.625rem;
  h3 {
    line-height: 1.875rem;
  }
  h4 {
    line-height: 1.25rem;
    color: rgba(0, 0, 0, 0.3);
  }
  img {
    display: block;
    width: 3.75rem;
    height: 3.75rem;
    float: left;
    border-radius: 100%;
  }
  span {
    display: block;
    position: absolute;
    top: 50%;
    right: 5rem;
    width: 4.75rem;
    height: 1.75rem;
    margin-top: -0.75rem;
    padding: 0 5px;
    border: 1px rgba(0, 0, 0, 0.3) solid;
    border-radius: 0.875rem;
    text-align: center;
    font-size: 14px;
    line-height: 1.625rem;
  }
}
.info {
  margin-top: 5rem;

  h2 {
    line-height: 1.75rem;
    i {
      display: inline-block;
      width: 0.94rem;
      height: 0.94rem;
      margin-left: 0.625rem;
    }
  }
  .info-main {
    position: relative;
    overflow: hidden;
    height: 15rem;
    width: 100%;

    .info-lyric {
      overflow: hidden;
      h4 {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      i {
        display: inline-block;
        width: 0.625rem;
        height: 0.625rem;
        border-right: 1px solid #b2b2b2;
        border-bottom: 1px solid #b2b2b2;
        -webkit-transform: rotate(-45deg);
        transform:rotate(-45deg);
      }
    }
    .imfo-img {
      width: 15rem;
      height: 15rem;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  footer {
    .info-btn {
      height: 5.625rem;
      padding: 1.55rem 0;
      justify-content: center;
      i {
        display: inline-block;
        margin-left: 2rem;
        font-size: 2.19rem;
      }
    }
    .download {
      position: relative;
      top: 100%;
      width: 60%;
      margin: 0 auto;
      line-height: 2.5rem;
      font-size: 20px;
      background-color: #31c27c;
      color: #fff;
      border-radius: 1.25rem;
    }
  }
}
.bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    opacity: 0.06;
    -webkit-transform: scale(1.2);
    pointer-events: none;
    transform: scale(1.2);
  }
}
section {
  overflow: hidden;
  h3 {
    margin-top: 10px;
    line-height: 3.5rem;
    text-align: center;
    font-size: 1.25rem;
  }
  h4 {
    line-height: 1.25rem;
  }
  h5 {
    line-height: 1rem;
  }
}

.likeSong {
  li {
    position: relative;
    margin-top: 2px;
    height: 4.1rem;
    border-bottom: #dfdcdc 1px solid;
    img {
      display: block;
      float: left;
      width: 4.1rem;
      height: 4.1rem;
    }
    i {
      position: absolute;
      top: 50%;
      right: 3%;
      width: 0.625rem;
      height: 0.625rem;
      margin-top: -0.25rem;
      border-right: 1px solid #b2b2b2;
      border-bottom: 1px solid #b2b2b2;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
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
      width: 7.1rem;
      height: 7.1rem;
    }
  }
}
.detail {
  .detail-item {
    position: relative;
    height: 4.1rem;
    margin-top: 2px;
    border-bottom: 1px #000 solod;
    h4 {
      display: inline-block;
      margin-left: 1rem;
      line-height: 4.1rem;
    }
    img {
      float: left;
      display: block;
      width: 4.1rem;
      height: 4.1rem;
    }
    i {
      position: absolute;
      top: 50%;
      right: 3%;
      width: 0.625rem;
      height: 0.625rem;
      margin-top: -0.25rem;
      border-right: 1px solid #b2b2b2;
      border-bottom: 1px solid #b2b2b2;
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }
}
.comment {
  li {
    position: relative;
    overflow: hidden;
    padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    aside {
      float: left;
      width: 2.2rem;
      height: 100%;
      img {
        width: 2.2rem;
        width: 2.2rem;
        border-radius: 100%;
      }
    }
    div {
      margin-left: 3.75rem;
      position: relative;
      p {
        font-size: 14px;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        text-align: justify;
        line-height: 1.6;
      }
      span {
        position: absolute;
        display: inline;
        right: 0;
        top: 0;
        i {
          display: inline-block;
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
  }
  .commont-more {
    width: 60%;
    margin: 1.25rem auto;
    line-height: 2.5rem;
    font-size: 1rem;
    border-radius: 1.25rem;
    border: 1px #000 solid;
    text-align: center;
    opacity: 0.5;
  }
}
.mv {
  padding: 0 0.625rem 2rem 0.625rem;
  margin-bottom: 1.25rem;
  li {
    margin-top: 0.625rem;
    position: relative;
    img {
      width: 100%;
      height: 12.125rem;
    }
    span {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      background-image: url("../assets/img/list_sprite.png");
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: 2.5rem 6.875rem;
      height: 2.8125rem;
      width: 2.8125rem;
      margin-top: -2.8rem;
      margin-left: -1.56rem;
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

  header {
    height: 3.45rem;
    width: 100%;
    text-align: center;
    border-top: 1px rgba(209, 202, 202, 0.3) solid;
    border-bottom: 1px rgba(209, 202, 202, 0.3) solid;
    h4 {
      line-height: 3.45rem;
      font-size: 1.25rem;
    }
  }
  li {
    height: 2.8rem;
    margin-left: 1rem;
    line-height: 3rem;
    border-bottom: 1px rgba(209, 202, 202, 0.3) solid;
    span:first-child {
      font-size: 1rem;
    }
    .focus {
      color: #31c27c;
    }
  }
}
</style>