<template>
  <div class='top flex'
       :class="{'top-fixed':isFixed}">
    <a href="javascript:;">
      <img v-lazy="imgUrl"
           alt="">
    </a>
    <div>
      <slot>
      </slot>
    </div>
    <a href="javascript:;">
      <span>{{btnTitle}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    btnTitle: {
      type: String,
      default: '点击关注'
    },
    imgUrl: {
      type: String,
      default: ""
    }
  },
  mounted () {
    let el = this.$refs.topbar
    if (this.$isFixed) {
      Velocity()
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  height: 4.5rem;
  width: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
  z-index: 15;
  align-items: center;
}
.top-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.top > div {
  flex: 1 1 auto;
  padding-left: 1rem;
}
.top a {
  display: block;
  height: 3rem;
}
a:first-child {
  img {
    height:3rem;
    border-radius: 100%;
  }
}
a:last-child {
  span {
    display: block;
    padding:0.2rem 0.5rem;
    font-size: 14px;
    border:1px rgba(0,0,0,.3) solid;
    border-radius:1rem;
  }
}
</style>