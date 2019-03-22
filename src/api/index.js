/* jshint esversion: 9 */
import Base64 from './base64'
import { string } from 'postcss-selector-parser';
const axios = require('axios')
const parseString = require('xml2js').parseString
const path = require('path')

const commonParams = {
  g_tk: 5381,
  loginUin: 0,
  uin: 0,
  needNewCode: 0,
  platform: 'yqq',
  notice: 0,
  inCharset: 'utf8',
  outCharset: 'utf-8',
  hostUin: 0
}

const searchParams = {
  ct: 24,
  qqmusic_ver: 1298,
  new_json: 1,
  remoteplace: 'txt.yqq.center',
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  searchid: 37602803789127241,
  t: 0,
  aggr: 1,
  cr: 1,
  catZhida: 1,
  lossless: 0,
  flag_qc: 0,
  format: 'json'
}

function getHomePageInfo() {
  return new Promise((resolve, rejest) => {
    axios
      .get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', {
        params: {
          _: 1552826048609,
          format: 'json',
          platform: 'h5',
          needNewCode: 1
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => console.log(e))
  })
}

function getSongUrlResource(mid) {
  return new Promise((resolve, reject) => {
    let t = new Date().getUTCMilliseconds()
    let _guid = (Math.round(2147483647 * Math.random()) * t) % 1e10
    let smid = []
    smid[0] = mid
    let m = {
      req: {
        module: 'CDN.SrfCdnDispatchServer',
        method: 'GetCdnDispatch',
        param: {
          guid: '4894512286',
          calltype: 0,
          userip: ''
        }
      },
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '4894512286',
          songmid: smid,
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20'
        }
      },
      comm: {
        uin: 0,
        format: 'json',
        ct: 24,
        cv: 0
      }
    }
    // console.log(encodeURIComponent(JSON.stringify(m)))
    axios
      .get('/apu/cgi-bin/musicu.fcg', {
        params: {
          ...commonParams,
          jsonpCallback: 'getplaysongvkey3543581871380732',
          platform: 'yqq.json',
          data: encodeURIComponent(JSON.stringify(m))
        }
      })
      .then(res => {
        // resolve(res.data.req.data.vkey)
        let url = ''
        res.data &&
          res.data.req_0 &&
          res.data.req_0.data.midurlinfo &&
          res.data.req_0.data.midurlinfo[0] &&
          res.data.req_0.data.midurlinfo[0].purl &&
          (url =
            'http://dl.stream.qqmusic.qq.com/' +
            res.data.req_0.data.midurlinfo[0].purl)
        resolve(url)
      })
      .catch(e => console.log('ERROR' + e))
  })
}

function getSongInfo(mid) {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/v8/fcg-bin/fcg_play_single_song.fcg', {
        params: {
          songmid: mid || '004gPqc32etVgm',
          tpl: 'yqq_song_detail',
          format: 'jsonp',
          callback: 'getOneSongInfoCallback',
          jsonpCallback: 'getOneSongInfoCallback',
          ...commonParams
        }
      })
      .then(res => {
        let getOneSongInfoCallback = obj => obj.data[0]
        //res.data[0] {}
        //console.log(eval(res.data))
        let data = eval(res.data)
        let songInfo = {
          album: data.album,
          id: data.id,
          mid: data.mid,
          mv: data.mv,
          name: data.name,
          singer: data.singer,
          subtitle: data.subtitle,
          time_public: data.time_public,
          title: data.title
        }
       // resolve(songInfo)
        resolve(data)
      })
      .catch(e => console.log('\nERROR! ' + e))
  })
}

function getSongLyricResource(mid) {
  return new Promise((resolve, reject) => {
    axios
      .get('/apl/getLyric', {
        params: {
          songmid: mid
        },
        headers: {
          //'Host': 'c.y.qq.com',
          //'User-Agent': 'Mozilla/5.0(Windows NT 10.0;Win64;x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/57.0 .2987 .110 Safari / 537.36',
          //'Referer': 'https://y.qq.com/portal/player.html',
          Accept: '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8',
          'cache-control': 'no-cache'
        }
      })
      .then(res => {
        let MusicJsonCallback = obj => obj
        //console.log(eval(res.data))
        let lyric = Base64.decode(eval(res.data).lyric)
        console.log(lyric)
      })
      .catch(e => console.log('获取歌词错误! ' + e))
  })
}

// 关键词搜索歌曲，当前页数（1开始），数量
function searchSongs(kw, p = 1, n = 10) {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/soso/fcgi-bin/client_search_cp', {
        params: {
          w: kw,
          p,
          n,
          ...searchParams
        }
      })
      .then(res => {
        resolve(res.data)
      })
  })
}

// 关键词搜索专辑，当前页数（1开始），数量
function searchAlbums(kw, p = 1, n = 10, perpage=20) {
  return new Promise((resolve, reject) => {
    axios
      .get('/apl/searchAlbums', {
        params: {
          w: kw,
          p,
          n,
          perpage,
          ...searchParams
        }
      })
      .then(res => {
        resolve(res.data)
      })
  })
}


// 热词列表
// 返回 [{k:'ad',n:'4445'}]

function getHotKeys() {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/splcloud/fcgi-bin/gethotkey.fcg', {
        params: {
          jsonpCallback: 'hotSearchKeysmod_top_search',
          format: 'jsonp',
          ...commonParams
        }
      })
      .then(res => {
        // res 'hotSearchKeysmod_top_search({"code":0,"data":{"hotkey":[{"k":"只是太爱你 ","n":302437},{"k":"起风了 ","n":287060}})'
        let hotSearchKeysmod_top_search = strjson => strjson.data
        // [{}]
        resolve(eval(res.data))
      })
      .catch(e => console.log(e))
  })
}
// 按照专辑搜索歌曲
function searchAlbum(albummId) {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
        params: {
          albummid: albummId,
          format: 'json',
          ...commonParams
        }
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => console.log(e))
  })
}

// 排行榜分类
function topList() {
  return new Promise((resolve, reject) => {
    axios
      .get('api/v8/fcg-bin/fcg_v8_toplist_opt.fcg', {
        params: {
          page: 'index', // 表示这是排行榜的首页
          format: 'html', //表示这是排行榜的首页
          tpl: 'macv4',
          v8debug: 1, //debug=1为调试模式，直接返回跨域json格式，其他值直接返回html页面
          jsonCallback: 'jsonCallback' //只能返回jsonp格式
          /*       .get('/api/v8/fcg-bin/fcg_myqq_toplist.fcg', {
                  params: {
                    format: 'json',
                    inCharset: ' utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    platform: 'h5',
                    needNewCode: 1 */
        }
      })
      .then(res => {
        // res  jsonCallback([{...,list:[{...,update_key:}]}])
        let jsonCallback = list => list
        resolve(eval(res.data))
      })
      .catch(e => console.log(e))
  })
}

// 排行榜的歌单  歌单 topID update_key 更新时间格式   开始位置   数量
function getSongsByTopList(topid, update_key, song_begin = 0, song_num = 30) {
  return axios.get('/api/v8/fcg-bin/fcg_v8_toplist_cp.fcg', {
    params: {
      tpl: 3,
      page: 'detail',
      date: update_key,
      topid: topid,
      type: 'top',
      song_begin: song_begin,
      song_num: song_num,
      g_tk: 5381,
      loginUin: 0,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    }
  })
}

// 获取热门包含此歌曲的热门歌单
function getSongListHasSong(songId) {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/rcmusic/fcgi-bin/fcg_iphone_music_rec_songlist', {
        params: {
          jsonpCallback: 'musicRecSongListCallback',
          cid: 338,
          ct: 20,
          songid: songId,
          p: 0.3702123376466666,
          format: 'jsonp',
          ...commonParams,
          uin: 10000
        }
      })
      .then(res => {
        // res musicRecSongListCallback({"code": 0,"list": [{}]})
        let musicRecSongListCallback = obj => obj
        resolve(eval(res.data))
      })
      .catch(e => console.log(e))
  })
}
// 专辑信息   包含歌单
function getAlbumInfo(anbummid) {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/v8/fcg-bin/fcg_v8_album_info_cp.fcg', {
        params: {
          albummid: anbummid,
          jsonpCallback: 'getAlbumInfoCallback',
          format: 'jsonp',
          ...commonParams
        }
      })
      .then(res => {
        let getAlbumInfoCallback = obj => obj.data
        resolve(eval(res.data))
      })
      .catch(e => console.log(e))
  })
}

// 电台信息
function getRadios() {
  return new Promise((resolve, reject) => {
    axios
      .get('api/v8/fcg-bin/fcg_v8_radiolist.fcg', {
        params: {
          channel: 'radio',
          page: 'index',
          tpl: 'wk',
          new: 1,
          p: 0.6423601364326503,
          g_tk: 5381,
          loginUin: 0,
          hostUin: 0,
          format: 'json',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'yqq.json',
          needNewCode: 0
        }
      })
      .then(res => {
        let MusicJsonCallback = obj => obj
        resolve(eval(res.data).data)
      })
      .catch(e => console.log(e))
  })
}
// 电台对应歌单 flag = true 为歌单 false为推荐歌曲，
function getRadioList(radioId,num=10,flag = true) {
  return new Promise((resolve, reject) => {
    let data = {
      songlist: {
        module: flag ? 'pf.radiosvr' :'mb_track_radio_svr',
        method: flag ? 'GetRadiosonglist' :'get_radio_track',
        param: {
          id: radioId,
          firstplay: 1,
          num
        }
      },
      radiolist: {
        module: 'pf.radiosvr',
        method: 'GetRadiolist',
        param: {
          ct: 24
        }
      },
      comm: {
        ct: 24,
        cv: 0
      }
    }
    axios.defaults.withCredentials = true
    /*  let myInterceptor = axios.interceptors.request.use(function (config) {
       config.url = encode(config.url)
       return config;
     }) */

    axios
      .get(
        'apu/cgi-bin/musicu.fcg?-=getradiosonglist4466302515465168&data=' +
          encodeURIComponent(JSON.stringify(data)),
        {
          params: {
            hostUin: 0,
            g_tk: 1701017336,
            loginUin: 2396586732,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq.json',
            needNewCode: 0
          }
        }
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(e => console.log(e))
  })
}

// 返回 webp 图片文件
// true 大图 false 小图
function getAlbumURL(albummId) {
  return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${albummId}.jpg?max_age=2592000`
}
// 歌手图片
function getSingerAlbumURL(singermid) {
  return `https://y.gtimg.cn/music/photo_new/T001R150x150M000${singermid}.jpg?max_age=2592000`
}
// 歌曲对应评论 歌曲 id 评论页数*评论数量 pagesize pagenum ; pagenum=0 为热评
function getSongComment(id, pagesize = 5, pagenum = 0, biztype=1) {
  return axios.get('api/base/fcgi-bin/fcg_global_comment_h5.fcg', {
    params: {
      cid: 205360772,
      cmd: 8,
      pagesize,
      pagenum,
      biztype,    //1 歌曲评论  3  歌单评论
      topid: id,
      ct: 24,
      cv: 10101010,
    }
  })
}

// 分类歌单 sortId 最热2 最新 3 评分4  5 一般
function getSongLists(params) {
  return new Promise((resolve, reject) => {
    axios
      .get('/apl/getSongLists', {
        params: {
          picmid: 1, // 固定 1
          rnd: 0.6152471461976603, // 随机数
          format: 'json',
          inCharset: 'utf8',
          outCharset: 'utf-8',
          categoryId: 10000000,
          sortId: 5,
          sin: 0,
          ein: 29
        },
        headers: {          
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.8',
          'cache-control': 'no-cache'
        }
      })
      .then(res => {
       resolve(res.data)
      })
      .catch(e => console.log(e))
  })
}
// 分类歌单对应的歌曲列表
// 歌单 id 可以查询 歌单评论
function getSongListInfo(id,type=1) {
    return new Promise((resolve, reject) => {
      axios
        .get('/apl/getSongListInfo', {
          params: {
           type,   // 0 歌单信息 1 附带歌曲列表
           disstid: id,
           format: 'json',
           inCharset: 'utf8',
           outCharset: 'utf-8',   
          },
          headers: {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'cache-control': 'no-cache'
          }
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(e => console.log(e))
    })
}

// 获取用户信息
function getUserInfo(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get('api/rsc/fcgi-bin/fcg_get_profile_homepage.fcg?format=json&inCharset=utf8&outCharset=utf-8&cid=20536083', {
        params: {
          userid:uid
        }      
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(e => console.log(e))
  })
}

// 获取歌曲对应的推荐歌曲、专辑
// 居然还带有歌词，可怕
function getSongDetails(songid) {
  let data = {
    "comm": {
      "g_tk": 204697089,
      "uin": 2396586732,
      "format": "json",
      "inCharset": "utf-8",
      "outCharset": "utf-8",
      "notice": 0,
      "platform": "h5",
      "needNewCode": 1
    },
    "detail": {
      "module": "music.pf_song_detail_svr",
      "method": "get_song_detail",
      "param": {
        "song_id": songid
      }
    },
    "simsongs": {
      "module": "rcmusic.similarSongRadioServer",
      "method": "get_simsongs",
      "param": {
        "songid": songid
      }
    },
    "gedan": {
      "module": "music.mb_gedan_recommend_svr",
      "method": "get_related_gedan",
      "param": {
        "sin": 0,
        "last_id": 0,
        "song_type": 1,
        "song_id": songid
      }
    },
    "video": {
      "module": "MvService.MvInfoProServer",
      "method": "GetSongRelatedMv",
      "param": {
        "songid": String(songid),
        "songtype": 1,
        "lastmvid": 0,
        "num": 5
      }
    }
  }
  return axios({
    url: 'apu/cgi-bin/musicu.fcg?_=1553222634146',
    method:'post',
    data:JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res=>{
    return res.data
  }).catch(e=>{
    console.log('\n推荐信息获取失败:\n')
    console.log(e)
  })
}

export default {
  getSongUrlResource,
  getSongLyricResource,
  getSongInfo,
  searchSongs,
  getHotKeys,
  searchAlbum,
  getAlbumInfo,
  topList,
  getSongsByTopList,
  getSongListHasSong,
  getHomePageInfo,
  getRadios,
  getRadioList,
  getAlbumURL,
  getSingerAlbumURL,
  getSongComment,
  getSongLists,
  getSongListInfo,
  getUserInfo,
  searchAlbums,
  getSongDetails
}
