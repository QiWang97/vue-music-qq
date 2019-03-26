<template>
  <list-bg ref='listbg'
           :imgurl='singerIcon'
           :songmid='song.songMID'
           :list='playList'
           :song='song'>
    <template #info>
      <h2 class='m-t-xs'>{{singerData.singerName}}</h2>
      <h4 class='m-t-xs'>粉丝：</h4>
      <h5 class='m-t-xs'>歌手介绍</h5>
    </template>
    <template #lyric>
      <p> {{song.songName}}
        <br><span>此处应该有歌词</span>
      </p>
    </template>
    <template #list>
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
      <section class='newAlbum '>
        <h2 class='text-center'>热门专辑</h2>
        <ul class='flex flex-wrap'>
          <router-link :to="{name:'album',query:{mid:item.albumMID}}"
                       tag='li'
                       v-for="(item, index) in singerData.hotalbum"
                       :key="index">
            <img :src="'https://y.gtimg.cn/music/photo_new/T002R150x150M000'+item.albumMID+'.jpg?max_age=2592000'"
                 alt="">
            <h4 class='p-l-sm'>{{item.albumName}}</h4>
          </router-link>
        </ul>
        <h4 class="text-center m-v-xl b-t-1">去QQ音乐查看{{singerData.albumNum}}张专辑<span></span></h4>
      </section>

    </template>
    <template>
    </template>
  </list-bg>
</template>

<script>
import API from '@/api'
export default {
  name: 'singer',
  props: ['mid'],
  components: {
    ListBg: resolve => require(['@/components/List/ListBg'], resolve)
  },
  mounted () {
    this.init(this.mid)

    /*     API.getAlbumInfo(albummid).then(res => {
          this.listLoading = false
          this.albumInfo = res
        }) */
  },
  data () {
    return {
      listLoading: true,
      isPlay: false,
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
      }
    }
  },
  computed: {
    singerIcon () {
      return this.singerData.singerPic || ''
    },
    playList () {
      return this.singerData.hotsong
    }
  },
  methods: {
    switchSong (index) {
      this.song = this.singerData.hotsong[index]
      this.isPlay = true
      this.showPlayAll = false
    },
    getData () {

    },
    loadMore () {

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
            console.log('本地存储歌曲信息读取失败！')
          }
        }, e => {
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
</style>