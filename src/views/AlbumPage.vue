<template>
  <list-bg ref='listbg'
           :imgurl='albumUrl'
           :songmid='smid'
           :list='playList'
           :song='song'>
    <template #info>
      <h2 class='m-t-xs'>{{albumInfo.singername}}</h2>
      <h4 class='m-t-xs'>粉丝：</h4>
      <h5 class='m-t-xs'>歌手介绍</h5>
    </template>
    <template #lyric>
      <p> {{song.songorig}}
        <br><span>{{song.songname}}</span></p>
    </template>
    <template #list>
      <section class='song-info p-h-xl bg-white relative'>
        <h4>歌曲 共（{{albumInfo.total_song_num}}）首<span>收藏<i></i></span></h4>
        <ul>
          <li v-for="(item, index) in showSongs"
              :key="index"
              @click="switchSong(index)">
            <h3>{{item.songorig}}</h3>
            <h5>{{item.singer | nameArr}} {{item.songname}}</h5>
          </li>
        </ul>
        <footer @click="loadMore">
          <h4>点击加载更多</h4>
        </footer>
      </section>
    </template>
    <template>
      <p v-html="albumInfo.desc||''"></p>
    </template>
  </list-bg>
</template>

<script>
/* 传入专辑 mid  */
import API from '@/api'
export default {
  name: 'album',
  props: ['mid'],
  components: {
    ListBg: resolve => require(['@/components/List/ListBg'], resolve)
  },
  mounted () {
    if (this.mid) {
      API.getAlbumInfo(this.mid).then(res => {
        this.listLoading = false
        this.albumInfo = res
      })
    }
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
      },
      songmid:''
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
    },
    playList(){
      return this.albumInfo.list||[]
    },
    smid(){
      return this.songmid
    }
  },
  methods: {
    switchSong (index) {
      this.song = this.albumInfo.list[index]
      this.songmid = this.song.songmid
      this.isPlay = true
    },
    loadMore (e) {
      if (this.renderIndex > this.albumInfo.total_song_num) return
      this.renderIndex += 5
    },
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
</style>