<template>
  <!-- :options="swiperOption" -->
  <swiper v-if='flag'>

    <swiper-slide v-for="item in renderList"
                  :key='item.id'>
      <img v-lazy="item.picUrl"
           alt="">
    </swiper-slide>
    <div class="swiper-pagination"
         slot="pagination"></div>
    <!--     <div class="swiper-button-prev"
         slot="button-prev"></div>
    <div class="swiper-button-next"
         slot="button-next"></div> -->
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'top-swiper',
  props: {
    list: {
      type: Array,
      default: function () {
        return []  //{info:'',url:''} 理想状态下。初始不设参数
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: true,
        //loop: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,

        }
        /*         navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                } */

      }
    }
  },
  computed: {
    flag () {
      return this.renderList.length > 0
    },
    renderList () {
      let list = this.list
      let flag = Array.isArray(list)
      if (!flag) return [];
      return list.filter(item => {
        return item.id && item.picUrl
      })
    }

  }
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
}
</style>
