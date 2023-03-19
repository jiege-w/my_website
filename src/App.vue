<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-14 21:47:27
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 22:41:07
 * @FilePath: \project4dyq\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header/Header.vue";
</script>

<template>
  <Header></Header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  box-sizing: border-box;
}
</style>
