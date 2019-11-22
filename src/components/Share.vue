<template>
  <div class="share">
    <ul class="share-container">
      <li class="icon">

      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'share'
}
</script>
<style lang="less" scoped>
.share {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  background-color: rgba(0,0,0,0.6);
  left: 0;
  top: 0;
  .share-container {
    width: 100vw;
    // height: .88rem;
    background-color: red;
    position: absolute;
    bottom: 0;
    .icon {
      width: 100%;
      height: 2.61rem;
    }
  }
}
</style>