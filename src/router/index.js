import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '艾舒专区',
      component: () => import('@/views/Home')
    },
    {
      path: '/aishulive',
      name: '艾舒直播专区',
      component: () => import('@/views/AishuLive')
    },
    {
      path: '/arcitle',
      name: '文章',
      component: () => import('@/views/Arcitle')
    },
    {
      path: '/livetv',
      name: '直播',
      component: () => import('@/views/livetv')
    },
    {
      path: '/livevideo',
      name: '课程播放页',
      component: () => import('@/views/LiveVideo')
    },
    {
      path: '/Course_Live',
      name: '直播页',
      component: () => import('@/views/LiveCourseware')
    }
  ]
})
