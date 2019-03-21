<template>
  <article>
    <header>
      <section>
        <header>
          <img :src='albumUrl'   alt="">
          <h3>{{albumInfo.singername}}</h3>
          <h5>音乐动态尽在QQ音乐</h5>
          <span>立即关注</span>
        </header>
        <section>
          <img :src="albumUrl"
               alt="">
          <div>
            <h2>{{albumInfo.singername}}</h2>
            <h4 class='m-v-xs'></h4>
            <h5>播放量：</h5>
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
           :src="albumUrl"
           alt="">
    </header>
    <section>
      <header>
        <h5>歌曲 共（{{albumInfo.total_song_num}}）首<span>收藏<i></i></span></h5>
      </header>
      <ul>
        <li v-for="(item, index) in showSongs"
            :key="index"
            @click="switchSong(index)">
          <h4>{{item.songorig}}</h4>
          <h6>{{item.singer | filterName}} {{item.songname}}</h6>
        </li>
      </ul>
      <footer @click="loadMore">
        <h5>点击加载更多</h5>
      </footer>
    </section>
    <footer>
     

    </footer>
  </article>
</template>

<script>
/* 传入专辑 mid  */
import API from '@/api'
export default {
  name: 'AlbumListPage',
  mounted () {
    let albummid = this.$route.params.albummid
    API.getAlbumInfo(albummid).then(res => {
      this.listLoading = false
      this.albumInfo = res
    })
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
    albumUrl(){
      if(this.listLoading) return '';
      return 'https://y.gtimg.cn/music/photo_new/T001R150x150M000'+ this.albumInfo.singermid+'.jpg?max_age=2592000'
               
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
        border-radius: 100%;
      }
      h3{
        margin-left: 70px;
        line-height: 40px;
        font-size: 16px;
      }
      h5{
        margin-left: 70px;
        line-height: 20px;
        font-size: 12px;
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
        img {
          width: 24px;
          height: 24px;
          border-radius: 100%;
        }
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