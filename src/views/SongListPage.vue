<template>
  <list-bg ref='listbg'
           :imgurl='cdlist.logo'
           :songmid='song.songmid'
           :list='playList'
           :song='song'>
    <template #info>
      <h2 class='m-t-xs'>{{cdlist.dissname}}</h2>
      <h4 class='m-t-sm'>{{cdlist.nickname}}</h4>
      <h5 class='m-t-xs'>播放量： {{cdlist.visitnum | filterNum}}</h5>
    </template>
    <template #lyric>
      <p>{{song.songorig}}
        <br><span>{{song.songname}}</span>
      </p>
    </template>
    <template #list>
      <section class='song-info p-h-xl bg-white relative'>
        <h3 class='m-v-sm'>歌单 共（{{cdlist.total_song_num}}）首<span>收藏<i></i></span></h3>
        <ul>
          <li v-for="(item, index) in showSongs"
              :key="index"
              @click="switchSong(index)">
            <h3>{{item.songorig||''}}</h3>
            <h5>{{(item.singer||[]) | nameArr}} {{item.songname||''}}</h5>
          </li>
        </ul>
        <footer @click="loadMore">
          <h4>点击加载更多</h4>
        </footer>
      </section>
    </template>
    <template>
      <p v-html='cdlist.desc'></p>
    </template>
  </list-bg>
</template>

<script>
/* 传入歌单 id  */
import API from '@/api'
export default {
  name: 'SongListPage',
  props: ['id'],
  components: {   
    ListBg: resolve => require(['@/components/List/ListBg'], resolve)
  },
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
      this.$refs.listbg.play()
    },
    loadMore (e) {
      if (this.renderIndex > this.cdlist.total_song_num) return
      this.renderIndex += 5
    },
    init (dissid) {
      this.$indexDB.checkData(this, 'songLists', dissid)
        .then(res => {
          this.cdlist = res.data
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
  }
}
</script>

<style lang="scss" scoped>
.song-info {
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
</style>