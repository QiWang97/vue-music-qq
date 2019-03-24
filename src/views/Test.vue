<template>
  <div class="test">
    <h1>test</h1>
    <!--  <h2 @click="ajax">事件</h2> -->
    <h2 @click="dbHandler">事件</h2>
    <h2>{{response}}</h2>

  </div>
</template>

<script>
import api from '@/api'
import { radioCookies, setCookie } from '@/api/util'
import DB from '@/assets/js/data/db.js'

export default {
  name: 'test',
  data () {
    return {
      mid: '004aHCfZ3VDYG3',
      response: '',
      myDB: ''
    }
  },
  mounted () {
    /*     let _that = this
        let expireDays = 1000 * 60 * 60;
        for(let key in radioCookies){
         setCookie(key,radioCookies[key],expireDays)
        } */
  },
  methods: {
    ajax () {
      // let mid = this.mid
      //api.getSongUrlResource(mid)
      //api.getSongInfo(mid)
      //api.searchSongs('许嵩',1,5)
      //api.getHotKeys()
      // api.searchAlbum('0032gbwN4J7f7c')
      //api.getAlbumInfo("000MkMni19ClKG")
      //api.topList()
      //api.getSongsByTopList(0)
      //api.getSongListHasSong(215191293)
      //api.getSongLyricResource(mid)
      //api.getRadios()
      //api.getRadioList(99)
      //api.getSongLists()
      /*   api.getSongDetails(215191293)
        .then(res => { 
          console.log('\nRES:\n'+res)
          this.response = res})
          //this.response = res }) */
    },
    dbHandler () {
      let initDB = {
        name: "qq_music",
        version: 1,
        db: null,
        ojstore: {
          name: "music", //存储空间表的名字
          keypath: "id" //主键
        }
      }
      DB.openDB(initDB).then(() => {
        DB.addData(initDB.db, "music", [{ id: 2312, data: 45123, type: '4455adaf', keypath: 2312 }])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test {
  width: 340px;
  text-align: center;
}
h2 {
  display: block;
  background-color: #bbb;
}
</style>