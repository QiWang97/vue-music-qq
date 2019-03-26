<template>
  <div class='m-h-sm'>
    <ul>
      <router-link :to="{name:'ranklist',query:{id:item.topID,vkey:String(item.update_key)}}"
                   tag="li"
                   v-for="(item, index) in rank"
                   :key="index">
        <img :src="item.pic"
             alt="">
        <div>
          <h3>{{item.ListName}}</h3>
          <h4 v-for="(item0, index0) in item.songlist"
              class="s-el"
              :key="index0">{{item0.songname? (index0 + 1):''}} {{item0.songname}} <span>{{item0.singername}}</span></h4>
        </div>
        <i></i>
      </router-link>
    </ul>
  </div>
</template>


<script>
import API from '@/api'
export default {
  name: '',
  mounted () {
    this.init()
  },
  data () {
    return {
      loading: true,
      rank: [{
        ListName: "",
        MacDetailPicUrl: "",
        MacListPicUrl: "",
        headPic_v12: "",
        listennum: 0,
        pic: "",
        pic_Detail: "",
        pic_h5: "",
        pic_v11: "",
        pic_v12: "",
        showtime: "",
        songlist: [
          { singerid: 0, singername: "", songid: 0, songname: "" }],
        topID: 0,
        type: 0,
        update_key: "",
      }]
    }
  },
  methods: {
    toRank (topID, update_key) {
      this.$localstore.save('topID' + topID, update_key)
      this.$router.push({ path: 'rankList', query: { topID } })
    },
    init () {
      this.$indexDB.getAllData(this.$DB.db, 'rank')
        .then(res => {
          if (res.length > 5) {
            this.rank = res.map(item => item.data)
          } else {
            this.getData()
          }
        },e => {
          this.getData()
        })
       
    },
    getData () {
      API.topList().then(res => {
        this.loading = false
        let arr = [...res[0].List, ...res[1].List]
        this.rank = arr

        return arr.map(item => {
          return {
            topID: item.topID,
            data: item
          }
        })
      }).then(res => {
        console.log(res)
         res.forEach(item => {
          this.$indexDB.addOneData(this, 'rank', item)
            .catch(e => { console.log(e) })
        }); 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  height: 100px;
  margin-top: 10px;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  img {
    float: left;
    width: 100px;
    height: 100px;
  }
  div {
    margin-left: 110px;
    padding: 5px 0 5px 15px;
    h3 {
      color: #000;
    }
    h4 > span {
      color: rgba(0, 0, 0, 0.6);
    }
  }
  i {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -4px;
    width: 6px;
    height: 6px;
    border-right: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    -webkit-transform: rotate(-45deg);
  }
}
</style>