<template>
  <div
    class="tabbar-item"
    @click="itemClick"
  >
    <div v-if="!isActive">
      <slot name="item-inco"></slot>
    </div>
    <div v-else>
      <slot name="item-inco-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
// import "../../assets/font/iconfont.js";
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },

  data () {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
    }
  }


};
</script>

<style scoped>
</style>
