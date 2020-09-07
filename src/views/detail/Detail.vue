<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>

    </scroll>

  </div>
</template>

<script>
import detailNavBar from "./childComponents/detailNavBar"
import detailSwiper from "./childComponents/detailSwiper"
import detailBaseInfo from "./childComponents/detailBaseInfo"
import detailShopInfo from "./childComponents/detailShopInfo"

import Scroll from "@/components/common/scroll/Scroll"

import { getDetail, Goods, Shop } from "@/network/detail"

export default {
  name: "Detail",
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}

    }
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    Scroll
  },
  created () {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result
      //1.获取顶部的轮播数据
      this.topImages = data.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)


    })
  }

};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  /* overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0; */
  height: calc(100% - 44px);
}
</style>
