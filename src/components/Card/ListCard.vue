<template>
  <div class="p-h-sm">
    <div class="p-v-sm">
      <h2>热门歌单<span>更多</span></h2>
    </div>
    <div>
      <ul>
        <li v-for="(item,index) in list"
            :key="index">
          <div class="item-main"
               @click="toInfo(item.id)">
            <div class="item-body relative">
              <img :src='item.picUrl'
                   alt=''>
              <span></span>
            </div>
            <div class="bg-white p-l-xs p-b-xs item-footer">
              <h4>{{item.songListDesc}}</h4>
              <h5>{{item.songListAuthor}}</h5>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ListCard',
  mounted () {
  },
  mounted () {
  },
  props: ['list'],
  data () {
    return {
    }
  },
  methods: {
    toInfo (id) {
      this.$router.push(`/songList/${id}`)
    }
  },
}
</script>
<style lang="scss" scoped>
h2 span {
  float: right;
  font-size: 14px;
  margin-right: 10px;
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
  display: block;
  float: left;
  width: 50%;
  padding-right: 8px;
  margin-bottom: 10px;
}
.item-main {
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
  span {
    display: block;
    position: absolute;
    right: 5px;
    bottom: 5px;
    height: 24px;
    width: 24px;
    background-image: url("../../assets/list_sprite.png");
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 24px 60px;
  }
  .item-footer {
    height: 40px;
    h5 {
      font-size: 12px;
    }
    h4 {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
