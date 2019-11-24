<template>
  <div class="tab-item">
    <div class="details">
      <div class="title">
        <h2>艾舒止咳糖浆</h2>
        <el-rate v-model="rate" :allow-half="true" :void-icon-class="'iconfont icon-yduixingxingkongxin'" :icon-classes="['iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin']"></el-rate>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: 'tab-item',
  data() {
    return {
      rate: null,
    }
  },
}
</script>
<style lang="less" scoped>
.tab-item {
  margin: .23rem .3rem 0;
  background-color: #fff;
  width: calc(~"100vw - .6rem");
  height: calc(~"100vh - .88rem - 4.52rem - .51rem - .23rem");
  box-shadow:0px 2px 30px 20px rgba(0,0,0,0.03);
  border-radius: .1rem .1rem 0 0;
  box-sizing: border-box;
  padding: .46rem .3rem 0;
  .details {
    .title {
      display: flex;
      justify-content: space-between;
      height: .56rem;
      align-items: center;
      h2 {
        font-size: .4rem;
        line-height: .56rem;
      }
      /deep/ .el-rate__icon, /deep/ .hover, /deep/ .el-rate__decimal {
        font-size: .4rem;
        transform: scale(1);
        color: #006B45 !important;
      }
    }
  }
}
</style>