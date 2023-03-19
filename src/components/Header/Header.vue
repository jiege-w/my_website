<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-14 23:17:50
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 18:43:35
 * @FilePath: \project4dyq\src\components\Header\Header.vue
 * @Description: 首页头部导航栏
-->
<script setup>
import { RouterLink } from "vue-router";
import { ref, reactive } from "vue";
const tabList = reactive([
  { id: 1, tabName: "在线商城", route: "/shopping" },
  { id: 2, tabName: "论坛中心", route: "/" },
  { id: 3, tabName: "在线问诊", route: "/Chat" },
  { id: 4, tabName: "我的购物车", route: "/cart" },
  { id: 5, tabName: "我的订单", route: "/order" },
]); //顶部导航
let currentIdx = ref(2); //当前选中tab的索引

/**
 * @description: 改变id值切换tab
 * @param {*} id tab的id
 * @return {*}
 */
const changeTab = (id) => {
  currentIdx.value = id;
};
</script>
<template>
  <div class="header">
    <nav class="header_container">
      <div class="header_logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <nav class="header_tab">
        <div class="header_tab_item" :class="{ active: currentIdx === item.id }" v-for="item in tabList" :key="item.id">
          <RouterLink
            :to="item.route"
            :style="{ color: currentIdx === item.id ? '#70a5fb' : '', textDecoration: 'none', transition: ' color 0.3s linear' }"
            @click="changeTab(item.id)"
            >{{ item.tabName }}</RouterLink
          >
        </div>
      </nav>
      <div class="header_login_register">
        <div style="margin-right: 10px"><el-button size="large">登录</el-button></div>
        <div><el-button size="large">快速注册</el-button></div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
  caret-color: transparent;
  z-index: 10;
  &_container {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &_logo {
    width: 60px;
    height: 100%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &_tab {
    width: 500px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #ddd;
    font-size: 14px;
    box-sizing: border-box;
    margin-right: 350px;
    &_item {
      height: 100%;
      border-color: #ddd;
      transition: border-color 0.5s linear;
      &:hover {
        cursor: pointer;
      }
    }
    .active {
      border-bottom: 2px solid #70a5fb;
      color: #70a5fb;
    }
  }
  &_login_register {
    display: flex;
  }
}
</style>
