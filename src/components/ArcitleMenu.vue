<template>
  <ul class="arcitle">
    <li v-for="item in arcitle" :key="item.id" @click="goArcitle">
      <div class="left">
        <img :src="item.img" alt="">
      </div>
      <div class="right">
        <h3>{{item.title}}</h3>
        <p>{{item.des}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'Arcitle',
  props: {
    arcitle: {
      type: Array,
      default: () => { return [] }
    }
  },
  methods: {
    goArcitle () {
      this.$router.push('/arcitle')
    }
  },
}
</script>
<style lang="less" scoped>
.arcitle {
  li {
    height: 1.68rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: .35rem;
    &:last-child {
      margin-bottom: 0;
    }
    .left {
      width: 3rem;
      height: 1.68rem;
      border-radius: .2rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 3.54rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: .3rem;
        line-height: .36rem;
        color: #031D14;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        // text-align: center;
      }
      p {
        font-size: .24rem;
        line-height: .36rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>