<template>
<section>
    <header>
      <img :src="logoUrl"
           alt="">    
      <h4 v-if='type==0'>更多好音乐</h4>
      <h4 v-else-if='type==1'>最新专辑</h4>
      <h4 v-else>QQ音乐</h4>

      <span v-if='type==0'>立即收藏</span>
      <span v-else-if='type==1'>立即收听</span>
      <span v-else>了解更多</span>
    </header>
    <section>
      <img :src="info.logo" alt="">
      <div>
        <h2>{{info.dissname}}</h2>
        <h4 class='m-v-xs'><img :src="info.uIcon"
                alt=""> {{info.nickname}}</h4>
        <h5>播放量： {{info.visitnum | filterNum}}</h5>
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
        :src="info.logo"
        alt="">
</section>
  


</template>

<script>
 /* 进入的来源
 * 0 歌曲如搜索等进入 传入 歌曲单曲 
 * 1 歌单、电台等   传入  歌曲列表
 */
 /*
 * list 只传入歌曲数组
 *多余信息在 info 里面掺入
 */
export default {
  name: 'PlayHeader',
  props:{
    type: {
      type: Number,
      required: true,
      default:0
    },
    song:{
       type:Object,
      default:function(){
        return {
          name:'',
          mid:'',
          singer:[{name:'',mid:''}],
          album:{
            mid:'',
            name:'',
            title:''
          },
          desc: ""
        }
      }
    },
    list:{
      type:Object,
      default:function(){
        return [ {
          name:'',
          songorig:'',
          mid:'',
          singer:[{name:'',mid:''}],
          album:{
            mid:'',
            name:'',
            title:''
          },
          desc: ""
        }]
      }
    },
    info:{
      type:Object,
      default:function(){
        rerurn {
          dissname:'',
          nickname:'',
          visitnum:0,
          uIcon:'',
          logo:''
        }
      }
    }
  },
  data() { 
    return {
      isPlay:false
    }
  }
 }
</script>

<style lang="" scoped>

</style>