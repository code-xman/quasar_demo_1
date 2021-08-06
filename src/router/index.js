import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // console.log('Router :>> ', Router);
  // 重写 push和replace方法；处理跳转同路径报错的问题
  //push 
  const VueRouterPush = Router.__proto__.push 
  Router.__proto__.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
  }

  //replace
  const VueRouterReplace = Router.__proto__.replace
  Router.__proto__.replace = function replace (to) {
    return VueRouterReplace.call(this, to).catch(err => err)
  }

  return Router
}
