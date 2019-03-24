<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$indexDB.openDB(this.$DB)
      .then(() => {
        let ojstores = this.$ojstores
        console.log(JSON.stringify('ojstores'+ojstores))
        let db = this.$DB.db
        for (let item in ojstores) {
          console.log(JSON.stringify('item'+item))
          this.$indexDB.addStore(db, {
            name: item,
            keypath: ojstores[item]
          })
        }
      })
      .catch(e => console.log(e))
  },
  beforeDestroy () {
    this.$indexDB.deletedb(this.$DB.name)
    this.$indexDB.closeDB(this.$DB.db)
  },
}
</script>