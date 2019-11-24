<template>
  <header class="header">
    <div class="header-box">
      <div class="go-back" @click="goBack">
        <img :src="require('./../common/back.png')" alt="">
      </div>
      <p>杨森直播专区</p>
    </div>
  </header>
</template>
<script>
export default {
  mame: 'header',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    goBack () {
      if (this.url) {
        this.$router.push(this.url)
        return
      }
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  height: .88rem;
  background-color: #fff;
  .header-box {
    width: 100vw;
    height: .88rem;
    // position: fixed;
    position: relative;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F3F5F9;
    .go-back {
      position: absolute;
      left: 0;
      top: 0;
      width: .88rem;
      height: .88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: .22rem;
        height: .4rem;
      }
    }
    p {
      font-size: .36rem;
      font-weight: bold;
    }
  }
}
</style>