<template>
  <list-bg ref='listbg'
           :imgurl='picUrl'
           :songmid='song.songmid'
           :list='showSongs'
           :song='song'>
    <template #info>
      <h2>{{title}}</h2>
      <h4 class='m-v-xs'>&nbsp;</h4>
      <h5>{{update_time}} 更新</h5>
    </template>
    <template #lyric>
      <p>{{song.songorig}}
        <br><span>{{song.songname}}</span>
      </p>
    </template>
    <template #list>
      <section class='song-info p-h-xl bg-white relative'>
        <h3 class='m-v-sm'>排行榜 共（{{total_song_num}}）首</h3>
        <ul v-if="!loading">
          <li v-for="(item, index) in showSongs"
              :key="index"
              @click="switchSong(index)">
            <div>
              <h3 class='line-clamp1'> <span>{{index + 1}}</span>{{item.songorig}}</h3>
              <h5 class='line-clamp1'><span>100</span>{{item.singer|nameArr}} {{item.songname}}</h5>
            </div>
          </li>
        </ul>
        <footer @click="loadMore">
          <h4>点击加载更多</h4>
        </footer>
      </section>
    </template>
    <template>
      <p v-html="info"></p>
    </template>
  </list-bg>
</template>

<script>
import API from '@/api'
import { rankRule as RULE } from '@/api/rankRule'
export default {
  name: 'RankListPage',
  props: ['id', 'vkey'],
  components: {
    ListBg: resolve => require(['@/components/List/ListBg'], resolve)
  },
  mounted () {
    if (this.id != 0) {
      this.init(parseInt(this.id), String(this.vkey))
    }
  },
  data () {
    return {
      loading: true,
      comment_num: 272062,
      cur_song_num: 30,
      update_key: '',
      song_begin: 0,
      total_song_num: 100,
      update_time: '',

      logo: require('@/assets/img/logo.png'),
      isPlay: false,
      renderIndex: 10,

      title: '',
      picUrl: '',
      songlist: [],
      song: {},
    }
  },
  computed: {
    info () {
      let mid = '_' + String(this.id)
      return RULE[mid].rule || ''

    },
    showSongs () {
      let arr = this.songlist.map(item => {
        return {
          ...item.data,
          Franking_value: item.Franking_value,
          cur_count: item.cur_count,
          in_count: item.in_count,
          old_count: item.old_count
        }
      })
      return arr.splice(0, this.renderIndex)
    }

  },
  methods: {
    switchSong (index) {
      this.song = this.showSongs[index]
      this.isPlay = true
    },
    loadMore () {
      this.renderIndex += 10
      if (this.renderIndex > this.songlist.length) {
        this.getList(this.id, this.song_begin + this.cur_song_num, 10)
      }
    },
    getList (topID, begin, num) {
      let update_key = this.key || '2018_09'
      API.getSongsByTopList(topID, update_key, begin, num).then(res => {
        let data = res.data
        if (this.renderIndex == 0) this.renderIndex = 10;
        this.comment_num = data.comment_num
        this.cur_song_num = data.cur_song_num
        this.date = data.date
        this.song_begin = data.song_begin
        this.songlist = this.songlist.concat(res.data.songlist)
        this.total_song_num = data.total_song_num
        this.update_time = data.update_time
        this.loading = false

        return { topID, data }
      })
        .then(res => {
          this.$indexDB.addOneData(this, 'rankLists', res)
        })

    },
    init (topID, update_key) {
      this.$indexDB.checkData(this, 'rank', topID)   // 查询 rank 总榜 信息
        .then(res => {
          let data = res.data
          this.picUrl = data.pic || ''
          this.title = data.ListName || ''
          this.update_key = data.update_key || ''
        }, e => {
          console.log(e)
          this.getList(topID, 0, 30)
        })
      this.$indexDB.checkData(this, 'rankLists', topID)   // 查询 rang 分榜 信息
        .then(res => {
          let data = res.data
          this.comment_num = data.comment_num
          this.cur_song_num = data.cur_song_num
          this.date = data.date
          this.song_begin = data.song_begin
          this.songlist = this.songlist.concat(res.data.songlist)
          this.total_song_num = data.total_song_num
          this.update_time = data.update_time
          this.loading = false
        }, e => {
          console.log(e)
          this.getList(topID, 0, 30)
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
    display: inline-block;
    width: 40px;
    color: #31c27c;
  }
  li {
    height: 3.75rem;
  }
  footer {
    text-align: center;
    line-height: 30px;
    padding: 0 20px;
  }
}
</style>