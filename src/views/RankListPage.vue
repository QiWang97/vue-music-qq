<template>
  <article>
    <header>
      <section>
        <header>
          <img :src="logo"
               alt="">
          <h4>QQ音乐</h4>
          <span>打开</span>
        </header>
        <section>
          <img :src="picUrl"
               alt="">
          <div>
            <h2>{{title}}</h2>
            <h4 class='m-v-xs'>第 {{}} 天</h4>
            <h5>{{update_time}} 更新</h5>
          </div>
          <footer>
            <h3 v-show="!isPlay"><i></i>播放全部</h3>
            <h4 v-show="isPlay">
              <i></i>
              {{song.songorig}}
              <br><span>{{song.songname}}</span>
              <i></i>
            </h4>
          </footer>
        </section>
      </section>
      <img class="cover"
           :src="picUrl"
           alt="">
    </header>
    <section>
      <header>
        <h5>排行榜 共（{{total_song_num}}）首</h5>
      </header>
      <ul v-if="!loading">
        <li v-for="(item, index) in showSongs"
            :key="index"
            @click="switchSong(index)">
          <div>
            <h4> <span>{{index + 1}}</span>{{item.songorig}}</h4>
            <h6><span>100</span>{{item.singer|filterName}} {{item.songname}}</h6>
          </div>

        </li>
      </ul>
      <footer @click="loadMore">
        <h5>点击加载更多</h5>
      </footer>
    </section>
    <footer>
      <h3>简介</h3>
      <p v-html="info"></p>
      <img :src="logo"
           alt="">
      <h5>QQ音乐</h5>

    </footer>
  </article>
</template>

<script>
import API from '@/api'
import {rankRule as RULE } from '@/api/rankRule'
export default {
  name: 'RankListPage',
  mounted () {
    this.id = this.$route.query.topID || 0
    this.picUrl = this.$route.query.pic || ''
    this.title = this.$route.query.ListName || ''
    this.update_key = this.$route.query.update_key
    this.songlist = []
    this.getList(0, 30)
  },
  data () {
    return {
      loading: true,
      id: 0,
      comment_num: 272062,
      cur_song_num: 30,
      update_key: '',
      song_begin: 0,
      total_song_num: 100,
      update_time: '',

      logo: require('@/assets/logo.png'),
      isPlay: false,
      renderIndex: 0,

      title: '',
      picUrl: '',
      songlist: [],
      showSongs: [],
      song: {},
      info:''
    }
  },
  computed: {
    
  },
  watch: {
    renderIndex: function (val) {
      if (val > this.total_song_num) return;
      let arr = []
      this.songlist.slice(0, this.renderIndex).forEach((e, index) => arr.push(e.data))
      this.$nextTick(function () {
        this.showSongs = arr
      })
    },
    id:function(val){
      let mid = '_' + String(this.id)
      console.log(val)
      this.$nextTick(function () {
        this.info = RULE[mid].rule||''
        console.log( RULE[mid].rule)
      })     
    }
  },
  methods: {
    switchSong (index) {
      this.song = this.showSongs[index]
      this.isPlay = true
    },
    loadMore () {
      if (this.song_begin > this.total_song_num) return
      this.renderIndex += 10
      this.getList(this.song_begin + this.cur_song_num, 10)
    },
    getList (begin, num) {
      API.getSongsByTopList(this.id, this.update_key, begin, num).then(res => {
        if (this.renderIndex == 0) this.renderIndex = 10;
        this.comment_num = res.data.comment_num
        this.cur_song_num = res.data.cur_song_num
        this.date = res.data.date
        this.song_begin = res.data.song_begin
        this.songlist = this.songlist.concat(res.data.songlist)
        this.total_song_num = res.data.total_song_num
        this.update_time = res.data.update_time
        this.loading = false
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
      arr.forEach(e => {
        name = name + e.name + ' '
      })
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
article > header {
  position: relative;
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
  section {
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    header {
      position: relative;
      padding: 10px;
      height: 80px;
      background-color: rgba(0, 0, 0, 0.5);
      img {
        display: block;
        float: left;
        width: 60px;
        height: 60px;
      }
      h4 {
        margin-left: 70px;
        line-height: 60px;
        font-size: 16px;
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
        border: 1px #000 solid;
        border-radius: 15px;
        text-align: center;
        font-size: 14px;
      }
    }

    section {
      padding: 10px;
      overflow: hidden;
      & > img {
        display: block;
        float: left;
        width: 125px;
        height: 125px;
      }
      div {
        margin-left: 130px;
        height: 125px;
        padding: 5px;
      }
      footer {
        height: 84px;
        width: 100%;
        padding: 10px;
        overflow: hidden;
        h3 {
          width: 170px;
          padding: 0 20px;
          margin: 0 auto;
          text-align: center;
          font-size: 16px;
          line-height: 40px;
          color: #fff;
          border-radius: 20px;
          background: #31c27c;
        }
        h4 {
          font-size: 14px;
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}
article > section {
  padding: 0 16px;
  background-color: #fff;
  header {
    position: relative;
    height: 50px;
    h5 {
      line-height: 50px;
      font-size: 14px;
    }
    span {
      float: right;
      color: #31c27c;
    }
  }
  li {
    height: 60px;
    span {
      display: inline-block;
      width: 30px;
    }
    h4 {
      font-size: 16px;
    }
    h5 {
      font-size: 14px;
    }
    h6 {
      font-size: 12px;
    }
  }
  footer {
    text-align: center;
    h5 {
      font-size: 14px;
      line-height: 30px;
    }
  }
}

article > footer {
  padding: 0 16px;
  text-align: center;
  margin-top: 15px;
  h3 {
    font-size: 18px;
    line-height: 50px;
  }
  p {
    font-size: 14px;
    text-align: justify;
  }
  img {
    display: inline-block;
    margin-top: 10px;
    width: 25px;
    height: 25px;
    border-radius: 100%;
  }
}
</style>