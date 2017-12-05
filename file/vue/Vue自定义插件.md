# vue自定义插件

>  在vue项目中，可以自定义组件像vue-resource 或者vue-router 那样使用vue.use()方法来使用,从而避免重复的调用组件的引入,以下我提供一个loading插件具体的实现方法:

首先先建立一个loading文件夹，文件夹中包含**index.js**和一个**loading.vue**,在index.js中处理封装成插件的逻辑，而在loading.vue中定义html结构和动画实现以及暴露loading的显示和隐藏方法。

    ``<template>
          <transition :name="animateName">
            <div class="loadings" v-show="isShow">
              <div class="loadings__loader">
                <div class="loadings__loader__dot"></div>
                <div class="loadings__loader__dot"></div>
                <div class="loadings__loader__dot"></div>
                <div class="loadings__loader__dot"></div>
                <div class="loadings__loader__dot"></div>
              </div>
            </div>
          </transition>
        </template>

        <script>
            export default {
              data() {
                return {
                  isShow: false,
                  hasAnimate: true,
                }
              },
              computed: {
                /**
                 * 动画效果样式，没有返回空
                 * @return {String} 样式
                 */
                animateName() {
                  return this.hasAnimate ? 'opacity' : ''
                },
              },
              methods: {
                /**
                 * 开启动画效果
                 */
                opemAnimate() {
                  this.hasAnimate = true
                },
                /**
                 * 去除动画效果
                 * @return {Promise} 返回promise
                 */
                removeAnimate() {
                  return new Promise((resolve) => {
                    this.hasAnimate = false
                    resolve()
                  })
                },
                /**
                 * 显示动画loading
                 */
                show() {
                  this.isShow = true
                },
                /**
                 * 隐藏动画loading
                 */
                hide() {
                  this.isShow = false
                },
              },
            }
        </script>``

在**index.js**中定义install方法,第一个参数是Vue(即Vue.use()调用的时候默认会传Vue这个对象给install方法),在install函数中,首先将loading.vue封装成插件,从loading.vue中取出show和hide方法，并加以封装成$loading和loading.end方法，Vue.use()以后，
$loading和loading.end方法就会出现在Vue的原型之中。我将它放在window对象中方便调用！

    ``import Loading from './loading.vue'

      export default {
        /**
         * 每个插件都有的install方法，用于安装插件
         * @param {Object} Vue - Vue类
         * @param {Object} [pluginOptions] - 插件安装配置
         */
        install(Vue, pluginOptions = {}) {
          // 创建"子类"方便挂载
          const VueLoading = Vue.extend(Loading);
          let loading = null;

          /**
           * 初始化并显示loading
           * @returns {Promise} Promise实例
           */
          function $loading() {
            return new Promise((resolve) => {
              // 第一次调用
              if (!loading) {
                loading = new VueLoading();
                // 手动创建一个未挂载的实例
                loading.$mount();
                // 挂载
                document.querySelector(pluginOptions.container || 'body').appendChild(loading.$el)
              }
              // 显示loading
              loading.show();
              resolve()
            })
          }
          // 定义关闭loading方法
          $loading.end = (noAnimate = false) => {
            return new Promise((resolve) => {
              if (!loading || !loading.isShow) {
                resolve();
                return;
              }
              // 首页判断是否在关闭时需要动画
              if (noAnimate) {
                // 默认只在此次行为下移除动画,之后的行为仍有动画
                loading.removeAnimate().then(() => {
                  loading.opemAnimate()
                })
              }
              loading.hide()
            })
          };
          // loading插件放在window对象中方便调用
          window.loading = Vue.prototype.$loading = $loading
        },
      }``


