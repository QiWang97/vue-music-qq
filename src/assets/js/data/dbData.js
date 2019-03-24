// ojstores

export default {
  initDB: { // 数据库
    name: "qq_music",
    version: 1,
    db: null
  },
  ojstores: { //  store，类似表结构 存储空间表的名字   
    'recommend': 'name', // 存储主页的 swiper 和 电台、歌单等信息
    'rank': 'topID', //   排行榜页面 直接存储排行榜列表子数据数据
    'rankLists':'topID',//   排行榜对应歌单
    'singers': 'singermid', //   歌手页 的搜索信息  按照歌手的 mid
    'albums': 'albummid', //   按照 专辑 存储专辑 歌单
    'songLists': 'dissid', //   按照 id 存储热门歌单信息
    'comments': 'songid' //   按照歌曲 id 等等存储
    /*'radios': 'radios'               电台歌单  按照 id 存储 因为每次刷新都不一样，所以不存储啦*/

  }
}