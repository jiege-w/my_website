<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-18 00:51:34
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 19:29:35
 * @FilePath: \project4dyq\src\components\ChatPart\index.vue
 * @Description: 聊天页面去除右侧导航栏以外的部分
-->
<script setup>
import { ref, reactive } from "vue";
import { Search, Bell, Clock, Discount, MuteNotification } from "@element-plus/icons-vue";
import MessagePart from "./MessagePart/MessagePart.vue";
import { messageHistory } from "../../config/config_chatHistory";
const messageBody = ref(null); //获取聊天内容容器的组建实例
const props = defineProps(["friendList"]); //接收一个父组件传来的props
let friendList = reactive(props.friendList); //转存一份 子组件不能直接修改父组件的prop 后果：脏数据 存一份组件内的响应性变量
const search = ref(""); //搜索框的输入内容 默认值为空 表单数据双向绑定
let friendCurIdx = ref(0); //当前选中的好友的索引，默认为0（不选中任何好友）用索引和index + 1进行判断 判断两者是否相等，相等则为选中，列表从index + 1开始，0表示不选中任何一个
let chooseInfo = reactive({}); //选中的好友的信息 默认为空
let histroy = reactive([]); //和好友的聊天记录 默认为空数组
const muteStatus = ref(false); //聊天页面右上角是否静音的按钮 默认不是静音
/**
 * @description:点中好友获取TA的信息，匹配对应的聊天记录
 * @param {*} index 点中的好友的索引 此处是遍历索引 从0开始 比index = id - 1
 * @param {*} uid 点中的好友的id（用户的唯一id）
 * @param {*} avatar 点中的好友的头像
 * @param {*} nickName 点中的好友的昵称
 * @return {*} void
 */
const chooseFriend = async (index, uid, avatar, nickName) => {
  friendCurIdx.value = index + 1;
  setTimeout(() => {
    friendList[index].unRead = 0;
  }, 200); //延时200ms 等未读消息状态圆圈消失后将未读消息置0
  chooseInfo.uid = uid;
  chooseInfo.avatar = avatar;
  chooseInfo.nickName = nickName;
  const action = new Map(messageHistory); //new一个Map对象读取键值对
  histroy = reactive(action.get(`user_${uid}`)) || histroy; //获取user_${}对应的值 值为聊天记录
  //聊天记录存在的操作 根据消息发出方判断对应的消息显示的头像
  if (histroy?.length) {
    histroy.forEach((item) => {
      item.avatar = !item.sendObj ? chooseInfo.avatar : JSON.parse(localStorage.getItem("userInfo")).avatar;
    });
  }
  messageBody.value.toBottom(); //聊天内容始终定位到可滚动区域的最下面
};
/**
 * @description:发送消息
 * @param {*} message 要发送的消息内容
 * @return {*}
 */
const send = async (message) => {
  //在聊天记录的最后面加上我发的这条消息
  histroy.push({
    id: histroy.length + 1,
    sendObj: 1,
    content: message,
    timeStamp: Date.now(),
    avatar: JSON.parse(localStorage.getItem("userInfo")).avatar,
  });
  //发完后定位到滚动页最下
  messageBody.value.toBottom();
  //设置一个定时的回复
  reply();
};
/**
 * @description: 定时的回复 回复时间是0-8秒随机
 * @return {*}
 */
const reply = () => {
  const delay = Math.random() * 8;
  setTimeout(() => {
    histroy.push({
      id: histroy.length + 1,
      sendObj: 0,
      content: "曾经沧海难为水，除却巫山不是云",
      timeStamp: Date.now(),
      avatar: chooseInfo.avatar,
    });
    messageBody.value.toBottom();
  }, delay * 1000);
};

const done = (uid) => {
  console.log(friendList);
  const index = friendList.findIndex((item) => item.uid === uid);
  friendList.splice(index, 1);
  friendCurIdx.value = 0;
  histroy = [];
  chooseInfo = {};
};
</script>
<template>
  <div class="chat_part">
    <section class="section_left">
      <div class="search_box">
        <el-input style="border-radius: 10px" v-model="search" class="w-50 m-2" size="large" placeholder="Search" :prefix-icon="Search" />
      </div>
      <div class="contact_list">
        <div
          class="contact_card"
          :class="{ active: friendCurIdx === index + 1 }"
          v-for="(item, index) in friendList"
          :key="item.id"
          @click="chooseFriend(index, item.uid, item.avatar, item.nickName)"
        >
          <div class="contact_card_content">
            <div class="avatar">
              <el-badge :value="item.unRead" class="item" :hidden="friendCurIdx === item.id || !item.unRead">
                <el-avatar :size="45" :src="item.avatar" />
              </el-badge>
            </div>
            <div class="message_info">
              <div>
                <div>{{ item.nickName }}</div>
                <div>2022年12月22日</div>
              </div>
              <div>{{ item.latestMessage }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section_center">
      <MessagePart ref="messageBody" :chooseInfo="chooseInfo" :histroy="histroy" @send="send" @done="done"></MessagePart>
    </section>
    <section class="section_right">
      <div class="section_right_container">
        <div @click="muteStatus = !muteStatus">
          <div v-show="!muteStatus">
            <el-icon :size="20"><Bell /></el-icon>
          </div>
          <div v-show="muteStatus">
            <el-icon :size="20"><MuteNotification /></el-icon>
          </div>
        </div>
        <div>
          <el-icon :size="20"><Discount /></el-icon>
        </div>
        <div>
          <el-icon :size="20"><Clock /></el-icon>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
@import "../../common/global.scss";
:deep(.el-input__wrapper) {
  border-radius: 20px;
}
.chat_part {
  width: 100%;
  height: 100%;
  display: flex;
  .section_left {
    width: 350px;
    height: 100%;
    border-right: 1px solid #dee0e3;
    flex-shrink: 0;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .search_box {
      width: 310px;
      margin: 0 auto;
      margin-top: 35px;
    }
    .contact_list {
      width: 310px;
      margin: 0 auto;
      margin-top: 15px;
      .contact_card {
        width: 100%;
        height: 75px;
        background-color: white;
        border-radius: 15px;
        margin-bottom: 15px;
        transition: transform 0.1s ease-in;
        transform-origin: center;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
          box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
        }
        &_content {
          width: 290px;
          height: 100%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .message_info {
            height: 35px;
            width: 240px;
            @include flex_column;
            & > div {
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            & > :first-child {
              display: flex;
              justify-content: space-between;
              align-items: center;
              & > :first-child {
                font: {
                  size: 16px;
                  weight: 900;
                  family: "Bahnschrift";
                }
              }
              & > :last-child {
                color: #90aac8;
              }
            }
            & > :last-child {
              color: #90aac8;
            }
          }
        }
      }
      .active {
        transform: scale(1.1);
        box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  .section_center {
    flex: auto;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    // background-color: darkseagreen;
  }
  .section_right {
    width: 48px;
    min-height: 100%;
    background-color: #ededed;
    flex-shrink: 0;
    &_container {
      width: 38px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 30px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
