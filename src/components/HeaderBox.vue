<template>
  <header class="header">
    <div class="header-box">
      <div class="go-back" @click="goBack">
        <img :src="require('./../common/back.png')" alt="">
      </div>
      <p>{{header}}</p>
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
  data() {
    return {
      name: '',
      header: ''
    }
  },
  created () {
    let path = this.$route.name
    if (path === '艾舒专区') {
      document.title = this.header = '杨森直播'
    } else if (path === '艾舒直播专区' || path === '文章') {
      if (path === '艾舒直播专区') {
        document.title = this.header = '杨森艾舒专区'
      } else {
        document.title = this.header = '文章'
      }
      this.name = '艾舒专区'
    } else if (path === '直播页' || path === '课程播放页') {
      if (path === '直播页') {
        document.title = this.header = '杨森艾舒直播'
      } else {
        document.title = this.header = '杨森艾舒录播'
      }
      this.name = '艾舒直播专区'
    } 
  },
  methods: {
    goBack () {
      let path = this.$route.name
      if (path === '艾舒专区') {
        window.location.href = 'https://m2.xlxt.net'
        return
      } 
      this.$router.push({
        name: this.name
      })
      // if (this.url) {
      //   this.$router.push(this.url)
      //   return
      // }
      // this.$router.go(-1)
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