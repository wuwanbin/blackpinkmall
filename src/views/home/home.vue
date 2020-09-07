<template>
  <div
    id="home"
    class="wrapper"
  >
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab_control"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >

      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl2"
        :class="{fixed:isTabFixed}"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>

    </scroll>

    <back-top
      @click.native="backClick"
      v-show="isShowBackTop"
    >

    </back-top>

  </div>
</template>

<script>

import HomeSwiper from "./childComponent/HomeSwiper";
import RecommendView from "./childComponent/RecommendView";
import FeatureView from "./childComponent/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl"
import GoodList from "@/components/content/goods/GoodList"
import Scroll from "@/components/common/scroll/Scroll"
import BackTop from "@/components/content/backTop/BackTop"


import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { debounce } from "../../common/utils"


export default {
  name: "home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currutType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,

    };
  },
  computed: {
    showGoods () {
      return this.goods[this.currutType].list
    }
  },
  created () {
    //1.请求轮播图数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted () {
    //1.图片加载完成的时间监听
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    //3.监听item中图片加载完成
    this.$bus.$on('imageImageLoad', () => {
      refresh()
    })


  },
  methods: {
    /*
    *事件监听相关的方法
    */

    tabClick (index) {
      switch (index) {
        case 0:
          this.currutType = 'pop';
          break;
        case 1:
          this.currutType = 'new';
          break;
        case 2:
          this.currutType = 'sell';
          break;

      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick () {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll (position) {
      //1.判断backTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore () {
      this.getHomeGoods(this.currutType)
    },
    swiperImageLoad () {

      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /*
    *网络请求相关的方法
    */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {

        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()

      }
      )
    }


  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab_control {
  position: relative;
  z-index: 9;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
  height: 300px;
  overflow: hidden;
} */
</style>
