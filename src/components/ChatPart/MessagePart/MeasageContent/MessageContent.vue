<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-18 17:05:06
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 18:41:46
 * @FilePath: \project4dyq\src\components\ChatPart\MessagePart\MeasageContent\MessageContent.vue
 * @Description: 聊天页面仅仅聊天内容的组件
-->
<script setup>
import { nextTick, ref } from "vue";
const scroll = ref(null); //获取滚动区域的组建实例
const props = defineProps(["histroy"]);
/**
 * @description: 滚动到区域最下面 其他组件的最终都是调用的这个方法
 * @return {*}
 */
const toBottom = async () => {
  await nextTick(); //这个执行完页面渲染完成
  scroll.value.scrollTop = scroll.value.scrollHeight; //页面渲染完成后 让滚动区域距离顶部的距离等于可滚动区域的高度 这样就可以滚动到底部了，一定要等页面渲染完成才可进行此操作，不然可能消息发出去在高度还没发生变化就赋值 导致页面到不了最下部
};

defineExpose({ toBottom }); //把这个方法暴露出去给父组件
</script>
<template>
  <div ref="scroll" class="message_content">
    <div class="message_container">
      <div class="message_item" :class="{ active: item.sendObj }" v-for="item in props.histroy">
        <div class="avatar">
          <el-avatar :size="50" :src="item.avatar" />
        </div>
        <div class="content" :class="{ active: item.sendObj }">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.message_content {
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }
  .message_container {
    width: calc(100% - 60px);
    height: 100%;
    margin: 0 auto;
    .message_item {
      width: 100%;
      padding: 15px 0;
      display: flex;
      color: black;
      font-size: 13px;
      .content {
        max-width: 70%;
        border-radius: 15px;
        background-color: white;
        margin: 0 20px;
        p {
          padding: 20px 15px;
        }
      }
      .active {
        background-color: #629cfb;
      }
    }
    .active {
      flex-direction: row-reverse;
      color: white;
    }
  }
}
</style>
