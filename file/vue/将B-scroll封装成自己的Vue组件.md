# 将B-scroll封装成自己的Vue组件

在Vue项目开发的过程中，某些项目需求的实现，我们需要引入第三方的插件，而使用这些第三方插件的时候我们需要使用大量的命令式代码，这显然不是Vue所提倡的，因此，我们有强烈的需求将第三方插件抽象为自己的组件！在移动开发常常遇到需要做滚动效果的情况,这时候需要引入第三库B-scroll,这次就来做一个尝试,将B-scroll封装成Vue的插件.

1) 安装: `npm install better-scroll`;

2) 创建scroll.vue模板:
    
    
    <div ref="wrapper" style="height: 100%;overflow: hidden">
          <slot></slot>
        </div>
        
 
3) 一个组件与外部通信的接口是:**props**,这里面封装入better-scroll的常规配置项:
 
 
    props: {
          probeType: {
            type: Number,
            default: 1
          },
          /**
           * 点击列表是否派发click事件
           */
          click: {
            type: Boolean,
            default: true
          },
          /**
           * 是否开启横向滚动
           */
          scrollX: {
            type: Boolean,
            default: false
          },
          /**
           * 是否派发滚动事件
           */
          listenScroll: {
            type: Boolean,
            default: false
          },
          /**
           * 列表的数据
           */
          data: {
            type: Array,
            default: null
          },
          /**
           * 是否派发滚动到底部的事件，用于上拉加载
           */
          pullup: {
            type: Boolean,
            default: false
          },
          /**
           * 是否派发顶部下拉的事件，用于下拉刷新
           */
          pulldown: {
            type: Boolean,
            default: false
          },
          /**
           * 是否派发列表滚动开始的事件
           */
          beforeScroll: {
            type: Boolean,
            default: false
          },
          /**
           * 当数据更新后，刷新scroll的延时。
           */
          refreshDelay: {
            type: Number,
            default: 20
          }
        }
        
4) 通过 methods 暴露的一些方法对 better-scroll 的方法做一层代理:


    methods: {
          _initScroll() {
            if (!this.$refs.wrapper) {
              return
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click,
              scrollX: this.scrollX
            })
    
            // 是否派发滚动事件
            if (this.listenScroll) {
              let me = this
              this.scroll.on('scroll', (pos) => {
                me.$emit('scroll', pos)
              })
            }
    
            // 是否派发滚动到底部事件，用于上拉加载
            if (this.pullup) {
              this.scroll.on('scrollEnd', () => {
                // 滚动到底部
                if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                  this.$emit('scrollToEnd')
                }
              })
            }
    
            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
              this.scroll.on('touchEnd', (pos) => {
                // 下拉动作
                if (pos.y > 50) {
                  this.$emit('pulldown')
                }
              })
            }
    
            // 是否派发列表滚动开始的事件
            if (this.beforeScroll) {
              this.scroll.on('beforeScrollStart', () => {
                this.$emit('beforeScroll')
              })
            }
          },
          disable() {
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable()
          },
          enable() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable()
          },
          refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh()
          },
          scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
          },
          scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
          }
        }
        
5) 通过 watch 传入的 data，当 data 发生改变的时候，在适当的时机调用 refresh 方法重新计算 better-scroll 确保滚动效果正常
 
 
    watch: {
            data(){
              setTimeout(() => { this.refresh() }, this.refreshDelay);
            }
          // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    
        }
        
6) 最後在main.js全局註冊組件即可.

  
    Vue.component('scroll' , scroll);


    
        
        
        
