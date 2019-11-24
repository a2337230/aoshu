<template>
  <div class="live-tv">
    <header-box></header-box>
    <!-- banner -->
    <div class="banner">
      <img src="./../common/2.jpg" alt="">
    </div>
    <!-- tab选项卡 -->
    <tabs @cuttentTabs="cuttentTabs"></tabs>
    <tab-item></tab-item>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import Tabs from '@/components/Tabs'
import TabItem from '@/components/TabItem'
export default {
  name: 'livetv',
  methods: {
    cuttentTabs (index) {
      console.log(index)
    }
  },
  components: {
    HeaderBox,
    Tabs,
    TabItem
  }
}
</script>
<style lang="less" scoped>
.live-tv {
  width: 100vw;
  .banner {
    padding: .32rem .3rem;
    width: 6.9rem;
    height: 3.88rem;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: .2rem;
    }
  }
}
</style>