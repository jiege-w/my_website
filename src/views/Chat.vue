<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-16 00:10:25
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 18:43:08
 * @FilePath: \project4dyq\src\views\Chat.vue
 * @Description: 项目的聊天页面
-->
<script setup>
import { reactive, ref } from "vue";
import ChatPart from "../components/ChatPart/index.vue";
import { friend_list } from "../config/config_friend_list";
const userInfo = reactive(JSON.parse(localStorage.getItem("userInfo"))); //从本地中取用户信息，将json字符串转成对象
let friendList = reactive(friend_list); //好友列表获取
const navList = reactive([
  { id: 1, iconName: "home", code: "\ue678" },
  { id: 2, iconName: "message", code: "\ue711" },
  { id: 3, iconName: "person", code: "\ue612" },
  { id: 4, iconName: "video", code: "\ue603" },
  { id: 5, iconName: "date", code: "\ue8cf" },
]); //聊天界面的右侧导航栏项目

const curIdx = ref(2); //右侧导航栏当前的索引，因为其他模块没有内容 所以暂不支持切换
</script>
<template>
  <div class="chat">
    <section class="chat_left section">
      <div class="chat_left_container">
        <div class="chat_left_container_top">
          <div class="avatar_box">
            <el-avatar :size="50" :src="userInfo.avatar" />
          </div>
          <div class="nav_box">
            <div class="nav" v-for="item in navList" :key="item.id" :class="{ active: item.id === curIdx }">
              <span class="iconfont">{{ item.code }}</span>
            </div>
          </div>
        </div>
        <div class="chat_left_container_bottom">
          <div class="setting nav">
            <span class="iconfont">&#xe61b;</span>
          </div>
          <div class="more nav">
            <span class="iconfont">&#xe670;</span>
          </div>
        </div>
      </div>
    </section>
    <section class="chat_right section">
      <ChatPart :friendList="friendList"></ChatPart>
    </section>
  </div>
</template>
<style scoped lang="scss">
@import "../common/global.scss";
@mixin icon_common {
  .nav {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s linear;
    color: white;
    border-radius: 15px;
    &:hover {
      cursor: pointer;
      background-color: #888;
      color: #eee;
    }
    span {
      font-size: 25px;
    }
  }
  .active {
    background-color: white;
    color: #333;
  }
}
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f7f9fe;
  .section {
    height: 100%;
  }
  &_left {
    width: 70px;
    &_container {
      width: 100%;
      height: 100%;
      background-color: #80a4f7;
      border-radius: 0 25px 25px 0;
      @include flex_column;

      &_top {
        width: 100%;
        height: 270px;
        margin-top: 30px;
        @include flex_column;
        .nav_box {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          @include icon_common;
        }
      }

      &_bottom {
        width: 100%;
        @include flex_column;
        margin-bottom: 35px;
        @include icon_common;
      }
    }
  }
  &_right {
    flex: 1 1 0;
  }
}
</style>
