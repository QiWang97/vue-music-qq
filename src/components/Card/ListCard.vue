<template>
  <div class="p-l-sm">
    <h2 class="p-v-sm">热门歌单<span>更多</span></h2>
    <ul class='flex flex-wrap'>
      <router-link :to="{name:'songlist',query:{id:item.id}}"
                   tag="li"
                   v-for="item in list"
                   class="block p-r-sm p-b-sm"
                   :key="item.id">
        <div class="relative">
          <img v-lazy='item.picUrl'
               alt=''>
          <span></span>
        </div>
        <div class="bg-white p-h-xs p-v-xs">
          <h4 class='s-el'>{{item.songListDesc}}</h4>
          <h5>{{item.songListAuthor}}</h5>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ListCard',
  mounted () {
  },
  props: ['list'],
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
h2 > span {
  float: right;
  font-size: 14px;
  margin-right: 20px;
  &::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
    -webkit-transform: rotate(-45deg);
  }
}
li {
  width: 50%;
  img {
    width: 100%;
  }
  span {
    display: block;
    position: absolute;
    right: 0.375rem;
    bottom: 0.375rem;
    height: 1.5rem;
    width: 1.5rem;
    background-image: url("../../assets/img/list_sprite.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 1.5rem 3.75rem;
  }
  & > div:first-child {
    width: 100%;
  }
  & > div:last-child {
    height: 3rem;
  }
}
</style>