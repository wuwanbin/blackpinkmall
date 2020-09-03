<template>
  <div>
    <tabbar>
      <tabbaritem
        path="/home"
        activeColor="orange"
      >
        <svg
          class="icon "
          aria-hidden="true"
          slot="item-inco"
        >
          <use xlink:href="#icon-shouye1"></use>
        </svg>

        <svg
          class="icon "
          aria-hidden="true"
          slot="item-inco-active"
        >
          <use xlink:href="#icon-shouye"></use>
        </svg>
        <div slot="item-text">首页</div>
      </tabbaritem>
      <tabbaritem
        path="/category"
        activeColor="orange"
      >
        <svg
          class="icon"
          aria-hidden="true"
          slot="item-inco"
        >
          <use xlink:href="#icon-leimupinleifenleileibie2"></use>
        </svg>

        <svg
          class="icon "
          aria-hidden="true"
          slot="item-inco-active"
        >
          <use xlink:href="#icon-icon-test"></use>
        </svg>

        <div slot="item-text">分类</div>

      </tabbaritem>
      <tabbaritem
        path="/shutcart"
        activeColor="orange"
      >
        <svg
          class="icon"
          aria-hidden="true"
          slot="item-inco"
        >
          <use xlink:href="#icon-gouwuche"></use>
        </svg>

        <svg
          class="icon "
          aria-hidden="true"
          slot="item-inco-active"
        >
          <use xlink:href="#icon-gouwuche1"></use>
        </svg>

        <div slot="item-text">购物车</div>

      </tabbaritem>
      <tabbaritem
        path="/profile"
        activeColor="orange"
      >
        <svg
          class="icon"
          aria-hidden="true"
          slot="item-inco"
        >
          <use xlink:href="#icon-daohanglan-05"></use>
        </svg>

        <svg
          class="icon "
          aria-hidden="true"
          slot="item-inco-active"
        >
          <use xlink:href="#icon-wode"></use>
        </svg>

        <div slot="item-text">我的</div>
      </tabbaritem>
    </tabbar>
  </div>

</template>

<script>
import tabbar from "./tabbar/TabBar";
import tabbaritem from "./tabbar/TabBarItem";

export default {
  name: "",
  components: {
    tabbar,
    tabbaritem
  }

};
</script>

<style scoped>
#tabbar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -1px 1px rgba(0, 0, 0, 0.1);
}
.tabbar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
