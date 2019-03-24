<template>
  <div>
    <div class='m-v-sm p-h-sm relative search-bar'>
      <i class="fa fa-search bg-white"
         aria-hidden="true"
         @click="seek" />
      <input type="text"
             v-model="searchKw"
             placeholder="搜索歌曲、歌单、专辑"
             @keyup.enter='seek'
             @click="inputClick">
      <span @click="cancelClick"
            v-show="!hotSearch">取消</span>
      <span class='no-cancel'
            v-show="hotSearch"></span>
    </div>
    <div class='hotSearch'
         v-show="hotSearch">
      <h3>热门搜索</h3>
      <ul class='flex'>
        <li>{{special_key}}</li>
        <li v-for="(item, index) in hotkey"
            :key="index"
            @click="hotSearchClick(index)"> {{item.k}} </li>
      </ul>
    </div>
    <div class='searchRes bg-white'
         v-show="!hotSearch">
      <ul>
        <li v-if='zhida.type===1'
            @click="toSinger(zhida.zhida_singer.singerMID)">
          <img :src="zhida.zhida_singer||''"
               @error="imgErr"
               alt="">
          <h3 class='s-el'> {{zhida.zhida_singer.singerName||''}}</h3>
          <h5>歌手主页</h5>
        </li>
        <li v-for="(item,index) in searchRes.songs.list"
            :key='index'>
          <img :src="'https://y.gtimg.cn/music/photo_new/T002R68x68M000'+item.album.mid+'.jpg?max_age=2592000'"
               @error="imgErr"
               alt="">
          <h3 class='s-el'> {{item.name}}</h3>
          <h5>{{item.singer|filterName}}</h5>
        </li>
      </ul>
    </div>
    <div v-show="showHis"
         class='searchHis'>
      <ul>
        <li v-for="(item,index) in searchHistory"
            :key='index'>
          <i class="fa fa-clock-o clock"
             aria-hidden="true"></i>
          <span>{{item}}</span>
          <i class="fa fa-ban ban"
             aria-hidden="true"
             @click="delHis(index)"></i>
        </li>
        <li class='clearAll'
            v-show="searchHistory.length>0"
            @click="delHis(999)">清除全部记录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '@/api'
const imgerr = require('@/assets/img/search_sprite.png')

export default {
  name: '',
  mounted () {
    API.getHotKeys().then(res => {
      this.hotkey = res.hotkey
      this.special_key = res.special_key
      this.special_url = res.special_url
    })
  },
  components: {
  },
  data () {
    return {
      hotSearch: true,

      flag0: '',

      searchRes: {
        songs: {
          curnum: 0,
          curpage: 1,
          list: [],
          totalnum: 4
        },
        albums: {
          curnum: 0,
          curpage: 1,
          list: [],
          totalnum: 4
        }
      },
      zhida: {
        type: 0,
        zhida_singer: {
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
      },
      searchHistory: [],
      searchKw: '',
      hotkey: [{ k: '', n: 0 }],
      special_key: '',
      special_url: ''

    }
  },
  computed: {
    showHis () {
      return (this.searchKw.trim() == '') && !this.hotSearch
    }
  },
  methods: {
    search (keyword) {
      let kw = keyword.trim()
      if (kw == '') return;
      API.searchSongs(kw).then(res => {
        let zhida = res.data.zhida
        this.searchRes.songs = res.data.song
        this.zhida = res.data.zhida
        if (zhida.type == 1 && zhida.zhida_singer.singerMID) {
          let item = {
            singermid: zhida.zhida_singer.singerMID,
            data: zhida.zhida_singer
          }
          this.$indexDB.addOneData(this, 'singers', item)
        }
        //return res.data.zhida.type == 1 ? res.data.zhida.zhida_singer : null
      })
      /*       API.searchAlbums(this.searchKw).then(res => {
              this.searchRes.albums = res.data.song
            }) */

    },
    addHistory (keyword) {
      let kw = keyword.trim()
      this.flag0 = kw
      if (kw == '') return;
      let flag = true
      this.searchHistory.forEach((item, index, arr) => {
        if (item == kw) {
          flag = false
        }
      });
      if (flag) {
        this.flag0 = false
        this.searchHistory.push(kw)
      }
    },
    inputClick () {
      this.hotSearch = false
    },
    cancelClick () {
      this.hotSearch = true
      this.searchKw = ''
      this.searchRes.songs.list = []
      this.searchRes.albums.list = []
      this.zhida.type = 0
    },
    seek () {
      let keyword = this.searchKw
      this.search(keyword)
      this.addHistory(keyword)
    },
    hotSearchClick (index) {
      this.inputClick()
      let keyword = this.hotkey[index].k
      this.searchKw = keyword
      this.search(keyword)
      this.addHistory(keyword)
    },
    delHis (index) {
      if (index > 100) {
        this.searchHistory = []
      } else {
        this.searchHistory.splice(index, 1)
      }
    },
    imgErr (e) {
      e.target.src = imgerr
    },
    toSinger: function (mid) {
      console.log('跳转前')
      if (mid && this.zhida.type != 1 && mid != this.zhida.zhida_singer.singerMID) return;
      this.$router.push({ path: `/singer/${mid}` })
      console.log('跳转中')
    }
  },
  filters: {
    filterName (arr) {
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
.search-bar {
  height: 40px;
  border-radius: 3px;
  overflow: hidden;

  %search-item {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    vertical-align: top;
  }

  i {
    @extend %search-item;
    width: 10%;
    text-align: center;
  }

  input {
    @extend %search-item;
    width: 80%;
    color: rgba(0, 0, 0, 0.3);
    border: none;
    -webkit-appearance: none;
  }
  span {
    @extend %search-item;
    width: 10%;
    background: #f4f4f4;
    text-align: center;
  }
  .no-cancel {
    @extend %search-item;
    width: 10%;
    background: #fff;
    text-align: center;
  }
}
.hotSearch {
  background-color: #fff;
  overflow: hidden;
  padding: 10px;

  ul {
    flex-flow: row wrap;
    justify-content: center;
  }

  li {
    display: block;
    margin: 10px 5px 0 0;
    padding: 0 10px;
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 99px;
    word-break: keep-all;
  }
  ul > li:first-child {
    color: red;
    border: 1px solid rgba(228, 127, 127, 0.6);
  }
}
.searchRes {
  li {
    position: relative;
    overflow: hidden;
    height: 56px;
    padding: 8px;
    border-top: 1px solid #e5e5e5;

    img {
      position: absolute;
      top: 8px;
      left: 8px;
      width: 40px;
      height: 40px;
    }
    h3,
    h5 {
      margin-left: 50px;
    }
  }
}
.searchHis {
  background-color: #fff;
  li {
    position: relative;
    height: 45px;
    border-top: 1px solid #e5e5e5;

    i {
      display: inline-block;
      width: 10%;
      vertical-align: top;
      font-size: 25px;
      line-height: 44px;
      text-align: center;
    }
    span {
      display: inline-block;
      vertical-align: top;
      width: 80%;
      line-height: 44px;
      font-size: 14px;
    }
  }
  .clearAll {
    text-align: center;
    line-height: 44px;
    font-size: 14px;
    color: #47c88a;
  }
}
</style>