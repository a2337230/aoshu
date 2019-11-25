<template>
  <ul class="tabs">
    <li class="item" :class="{current: item.click}" v-for="(item, index) in tab" v-show="!item.hide" :key="item.title" @click="clickTab(index)">{{item.title}}</li>
  </ul>
</template>
<script>
export default {
  name: 'tabs',
  props: {
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab: [
        {
          title: '详情',
          click: true,
          hide: this.type
        },
        {
          title: '目录',
          click: false,
          hide: false
        },
        {
          title: '评论',
          click: false,
          hide:false
        }
      ]
    }
  },
  created () {
    this.clickTab(this.type)
  },
  methods: {
    clickTab (index) {
      this.tab.forEach(item => item.click = false)
      this.tab[index].click = true
      this.$emit('cuttentTabs', index)
    }
  },
}
</script>
<style lang="less" scoped>
.tabs {
  padding: 0 .3rem;
  display: flex;
  justify-content: space-around;
  .item {
    font-size: .3rem;
    line-height: .42rem;
    font-weight: bold;
    padding-bottom: .09rem;
    position: relative;
    color: #333;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: .6rem;
      height: .06rem;
      background-color: transparent;
      border-radius: 20%;
      left: 50%;
      margin-left: -0.3rem;
    }
  }
  .current {
    color: #006B45;
    &:after {
      background-color: #006B45;
    }
  }
}
</style>
