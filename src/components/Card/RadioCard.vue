<template>
  <div class="p-h-sm">
    <div class="p-v-sm">
      <h2>电台</h2>
    </div>
    <div>
      <ul v-if="!loading">
        <li v-for="(item,index) in showList"
            :key="index">
          <div class="item-main"
               @click="toInfo(item.radioId)">
            <div class="item-body relative">
              <img :src='item.radioImg'
                   alt=''>
              <span></span>
            </div>
            <div class="bg-white p-l-xs p-b-xs item-footer">
              <h4>{{item.radioName}}</h4>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import API from '@/api'
export default {
  name: 'RadioCard',
  mounted () {
    let _that = this
    API.getRadios().then(res => {
        _that.radioList = res.data.groupList
        _that.loading = false
    })
  },
  data () {
    return {
      radioList: [],
      loading: true
    }
  },
  computed: {
    showList () {
      if (this.loading) return;
      return this.radioList[0].radioList.slice(0, 2)
    }
  },
  methods: {
    toInfo (radioId) {
      this.$router.push({ path: '/radio',query:{radioId}})
    }
  },
}
</script>
<style lang="scss" scoped>
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
    }
  }
}
</style>
