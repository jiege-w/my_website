<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-16 23:10:54
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 18:44:03
 * @FilePath: \project4dyq\src\components\Home\MyCard\MyCard.vue
 * @Description: 首页右侧用户卡片
-->
<script setup>
import { reactive } from "vue";
const userInfo = reactive(JSON.parse(localStorage.getItem("userInfo")));
</script>
<template>
  <div class="my_card">
    <div class="my_card_bg">
      <img :src="userInfo.cardBg" alt="" />
    </div>
    <div class="my_card_info">
      <div class="my_card_info_avatar center">
        <el-avatar :size="80" :src="userInfo.avatar" />
      </div>
      <div class="my_card_info_personal_intro">
        {{ userInfo.desc }}
      </div>
      <el-divider content-position="center">count</el-divider>
      <div class="my_card_info_count">
        <el-badge :value="userInfo.article" type="primary" class="item">
          <el-button>文章</el-button>
        </el-badge>
        <el-badge :value="userInfo.comments" type="primary" class="item">
          <el-button>评论</el-button>
        </el-badge>
        <el-badge :value="userInfo.visit" type="primary" class="item">
          <el-button>访问</el-button>
        </el-badge>
        <el-badge :value="userInfo.browse" type="primary" class="item">
          <el-button>浏览</el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.my_card {
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  &_bg {
    width: 380px;
    height: 214px;
    filter: blur(2px);
  }
  &_info {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: white;
    padding: 1px;
    &_avatar {
      top: -40px;
    }
    &_personal_intro {
      width: 100%;
      height: 100px;
      padding: 0 20px;
      margin-top: 60px;
      box-sizing: border-box;
      color: #73757b;
      font-size: 15px;
      text-align: center;
    }
    &_count {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      padding-top: 20px;
    }
  }
}
</style>
