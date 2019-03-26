<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { radioCookies, setCookie } from '@/api/util'
export default {
  name: 'app',
  mounted () {
    this.$indexDB.openDB(this.$DB)
      .then(() => {
        let ojstores = this.$ojstores
        let db = this.$DB.db
        for (let item in ojstores) {
          this.$indexDB.addStore(db, {
            name: item,
            keypath: ojstores[item]
          })
        }
      }, e => { console.log(e) })

    // 注入cookie，获取电台歌单的额必要操作
    let expireDays = 1000 * 60 * 60;
    for (let key in radioCookies) {
      setCookie(key, radioCookies[key], expireDays)
    }
  },
  beforeDestroy () {
    this.$indexDB.deletedb(this.$DB.name)
    this.$indexDB.closeDB(this.$DB.db)
  },
}
</script>