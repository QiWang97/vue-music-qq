<template>
  <div class="relative">
    <div class='p-sm'>
      <div class='search-bar'>
        <span @click="search"></span>
        <input type="text"
               v-model="searchKw"
               placeholder="搜索歌曲、歌单、专辑"
               @click="searchClick">
      </div>
      <span @click="cancelClick"
            class='cancel'
            v-show="cancel">取消</span>
    </div>
    <div class='hotSearch'
         v-show="hotSearch">
      <h3>热门搜索</h3>
      <ul>
        <li>{{special_key}}</li>
        <li v-for="(item, index) in hotkey"
            :key="index"
            @click="hotSearchClick(index)"> {{item.k}} </li>
      </ul>

    </div>
    <div class='searchRes'
         v-show="!hotSearch">
      <ul>
        <li v-show='zhida.type===1'
            @click="toSinger(zhida.zhida_singer.singerMID)">
          <span>
            <img :src="zhida.zhida_singer?zhida.zhida_singer.singerPic:''" 
                 @error="imgErr"
                 alt="">
          </span>
          <div>
            <h3> {{zhida.zhida_singer.singerName}}</h3>
            <h5>歌手主页</h5>
          </div>
        </li>
        <li v-for="(item,index) in searchRes.songs.list"
            :key='index'>
          <span>
            <img :src="'https://y.gtimg.cn/music/photo_new/T002R68x68M000'+item.album.mid+'.jpg?max_age=2592000'"
                 @error="imgErr"
                 alt="">
          </span>
          <div>
            <h3> {{item.name}}</h3>
            <h5>{{item.singer|filterName}}</h5>
          </div>
        </li>
      </ul>
      <!--       <ul>
        <li v-for="(item,index) in searchRes.albums.list"
            :key='index'>
          <span>
            <img :src="'https://y.gtimg.cn/music/photo_new/T001R68x68M000'+item.albummid+'.jpg?max_age=2592000'"
                 @error="imgErr"
                 alt="">
          </span>
          <div>
            <h3> {{item.songname}}</h3>
            <h5>{{item.albumname}}</h5>
          </div>
        </li>
      </ul> -->
    </div>
    <div v-show="searchHis"
         class='searchHis'>
      <ul>
        <li v-for="(item,index) in searchHistory"
            :key='index'>
          <span></span>
          <span class='search_his'>{{item}}</span>
          <span @click="delHis(index)"></span>
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
const imgerr = require('@/assets/search_sprite.png')

export default {
  name: '',
  mounted () {
    API.getHotKeys().then(res => {
      this.hotkey = res.hotkey
      this.special_key = res.special_key
      this.special_url = res.special_url
    })
  },
  data () {
    return {
      cancel: false,
      hotSearch: true,
      searchHis: false,

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
      searchHistory: ['111', '2116515'],
      searchKw: '',
      hotkey: [{ k: '', n: 0 }],
      special_key: '',
      special_url: ''

    }
  },
  watch: {
    /*     searchKw: function (val) {
    
        } */
  },
  methods: {
    search () {
      this.searchHistory.push(this.searchKw)
      API.searchSongs(this.searchKw).then(res => {
        this.searchRes.songs = res.data.song
        this.zhida = res.data.zhida
        //return res.data.zhida.type == 1 ? res.data.zhida.zhida_singer : null
      })
      /*       API.searchAlbums(this.searchKw).then(res => {
              this.searchRes.albums = res.data.song
            }) */

    },
    searchClick () {
      this.cancel = true
      this.hotSearch = false
      this.searchHis = true
    },
    cancelClick () {
      this.cancel = false
      this.searchHis = false
      this.hotSearch = true
      this.searchKw = ''
      this.searchRes.songs.list = []
      this.searchRes.albums.list = []
    },
    hotSearchClick (index) {
      this.searchClick()
      this.searchHis = false
      this.searchKw = this.hotkey[index].k
      this.search()
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
    toSinger: async function (mid) {
      if (mid && this.zhida.type != 1 && mid != this.zhida.zhida_singer.singerMID) return;
      let singerData = localStorage.getItem(mid);
      if (!singerData) {      
        await localStorage.setItem(mid, JSON.stringify(this.zhida.zhida_singer))
        let singerData2 = localStorage.getItem(mid)
        if (!singerData2) {          
          return;
        }
      }
      this.$router.push({ path: `/singer/${mid}` })
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
  position: relative;
  height: 36px;
  border-radius: 3px;
  background: #fff;
  padding: 8px 12px 8px 35px;
  -webkit-box-flex: 1;
  input {
    height: 20px;
    line-height: 20px;
    width: 100%;
    color: rgba(0, 0, 0, 0.3);
    border: none;
    -webkit-appearance: none;
    font-size: 14px;
  }
  span {
    display: block;
    position: absolute;
    top: 9px;
    left: 10px;
    width: 20px;
    height: 20px;
    background: #181616;
  }
}
span.cancel {
  position: absolute;
  top: 9px;
  right: 0px;
  width: 45px;
  height: 38px;
  background: #f4f4f4;
  line-height: 38px;
  text-align: center;
}
.hotSearch {
  background-color: #fff;
  overflow: hidden;
  padding: 2px 10px 0 10px;

  li {
    float: left;
    font-size: 14px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    color: #000;
    border: 1px solid rgba(0, 0, 0, 0.6);
    border-radius: 99px;
    word-break: keep-all;
    margin-bottom: 10px;
    margin-left: 5px;
  }
  ul > li:first-child {
    color: red;
    border: 1px solid rgba(228, 127, 127, 0.6);
  }
}
.searchRes {
  background-color: #fff;
  li {
    height: 56px;
    padding: 8px;
    border-top: 1px solid #e5e5e5;
    span {
      float: left;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    div {
      margin-left: 50px;
      h3 {
        font-size: 16px;
        line-height: 20px;
      }
      h5 {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
}
.searchHis {
  background-color: #fff;
  overflow: hidden;
  li {
    position: relative;
    height: 45px;
    border-top: 1px solid #e5e5e5;

    & > span:first-child {
      display: inline-block;
      min-width: 30px;
      height: 100%;
      background: url("~@/assets/clock_ic.png") no-repeat center/20px 20px;
    }
    & > span:last-child {
      display: inline-block;
      position: absolute;
      top: 10px;
      right: 20px;
      width: 1px;
      min-height: 15px;
      background: #333;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      &:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        min-height: 15px;
        background: #333;
        -webkit-transform: rotate(270deg);
        transform: rotate(270deg);
      }
    }
    .search_his {
      display: inline-block;
      overflow: hidden;
      width: 70%;
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