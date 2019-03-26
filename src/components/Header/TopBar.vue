<template>
  <div class='top flex'
       :class="{'top-fixed':isFixed}">
    <a href="javascript:;">
      <slot name='img'></slot>
    </a>
    <div>
      <slot>
      </slot>
    </div>
    <a href="javascript:;">
      <slot name='btn'></slot>
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
    }
  },
}
</script>

<style lang="scss" scoped>
.top {
  height: 4.5rem;
  width: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
  z-index: 15;
  align-items: center;
  overflow: hidden;
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
  vertical-align: top;
}
.top > a {
  display: inline-block;
  height: 3rem;
  vertical-align: top;
}
.top > a:first-child {
  img {
    height: 3rem;
    border-radius: 100%;
  }
}
.top > a:last-child {
  align-self: center;
  span {
    display: block;
    padding: 0.2rem 0.5rem;
    font-size: 14px;
    border: 1px rgba(0, 0, 0, 0.3) solid;
    border-radius: 1rem;
  }
}
</style>