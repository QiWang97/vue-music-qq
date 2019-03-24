<template>
  <div class="p-l-sm">
    <h2 class="p-v-sm">电台</h2>
    <ul v-if="!loading"
        class='flex flex-wrap'>
      <li v-for="(item,index) in showList"
          :key="index"
          class="block p-r-sm p-b-sm"
          @click="toInfo(item.radioId)">
        <div class="relative">
          <img :src='item.radioImg'
               alt=''>
          <span></span>
        </div>
        <h4 class="p-l-xs p-b-xs bg-white">{{item.radioName}}</h4>
      </li>
    </ul>
  </div>
</template>

<script>
import API from '@/api'
export default {
  name: 'RadioCard',
  mounted () {
    API.getRadios().then(res => {
      this.radioList = res.data.groupList
      this.loading = false
    })
  },
  data () {
    return {
      radioList: [{ radioList: [] }],
      loading: true
    }
  },
  computed: {
    showList () {
      if (this.loading) return;
      return this.radioList[0].radioList.slice(1, 3)
    }
  },
  methods: {
    toInfo (radioId) {
      this.$router.push({ path: '/radio', query: { radioId } })
    }
  }
}
</script>
<style lang="scss" scoped>
li {
  width: 50%;
  & > div {
    width: 100%;
  }
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
  h4 {
    line-height: 2.5rem;
  }
}
</style>
