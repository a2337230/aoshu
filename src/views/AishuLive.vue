<template>
  <div class="aishu-live">
     <!-- 头部 -->
    <header-box></header-box>
    <ul class="aishu-list">
      <li>
        <img src="./../common/1.jpg" alt="">
        <div class="live-status">
          <p>观看录播</p>
        </div>
        <div class="title-box">
          <h3>第一场直播</h3>
          <p>2019.12.13 - 2019.12.14</p>
        </div>
      </li>
      <li>
        <img src="./../common/1.jpg" alt="">
        <div class="live-status">
          <p>正在直播</p>
        </div>
        <div class="title-box">
          <h3>第一场直播</h3>
          <p>2019.12.13 - 2019.12.14</p>
        </div>
      </li>
      <li>
        <img src="./../common/1.jpg" alt="">
        <div class="live-status">
          <p>敬请期待</p>
        </div>
        <div class="title-box">
          <h3>第一场直播</h3>
          <p>2019.12.13 - 2019.12.14</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
export default {
  name: 'aishulive',
  components: {
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.aishu-list {
  padding: .3rem;
  li {
    width: 6.9rem;
    height: 3.87rem;
    border-radius: .2rem;
    position: relative;
    overflow: hidden;
    margin-bottom: .3rem;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .live-status {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.67rem;
      height: .51rem;
      border-radius:0 0 0 .2rem;
      background-color: #000;
      color: #fff;
      text-align: center;
      p {
        font-size: .3rem;
        line-height: .51rem;
        font-weight: lighter;
      }
    }
    .title-box {
      position: absolute;
      bottom: 0;
      width: 6.9rem;
      height: 1.25rem;
      background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 .23rem;
      h3 {
        font-size: .3rem;
        line-height: .42rem;
      }
      p {
        font-size: .24rem;
        line-height: .32rem;
        padding-bottom: .1rem;
        font-weight: lighter;
      }
    }
  }
}
</style>