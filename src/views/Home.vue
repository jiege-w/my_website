<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-14 22:05:53
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 22:39:26
 * @FilePath: \project4dyq\src\views\Home.vue
 * @Description: 项目的首页
-->
<script setup>
import { reactive } from "vue";
import MyCard from "../components/Home/MyCard/MyCard.vue";
import Rank from "../components/Home/Rank/Rank.vue";
import { userInfo } from "../config/config_user";
import { swiper_list } from "../config/config_home_swiper";
import { article_list } from "../config/config_home_article";

import Footer from "../components/Footer/Footer.vue";
localStorage.setItem("userInfo", JSON.stringify(userInfo)); //将登陆用户的信息存储到本地缓存，此处要转化成json字符串，本地存储不支持对象存储
const swiperList = reactive(swiper_list); //轮播的列表
const articleList = reactive(article_list); //文章的列表
</script>
<template>
  <div class="home_page">
    <div class="home_page_body">
      <div class="home_page_body_left">
        <div style="border-radius: 15px; overflow: hidden">
          <el-carousel trigger="click" height="478px">
            <el-carousel-item v-for="item in swiperList" :key="item.id">
              <div class="home_page_body_left_swiper_img">
                <img :src="item.imgUrl" alt="" />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <div class="home_page_body_left_article_list">
          <div class="home_page_body_left_article_list_item_box" v-for="item in articleList" :key="item.id">
            <div class="user_info">
              <div><el-avatar :size="25" :src="item.authAvatar" /></div>
              <div class="user_info_tags">
                <div v-for="element in item.tags" class="tags" :key="element.id">{{ element.content }}</div>
              </div>
            </div>
            <div class="body">
              <div class="body_left">
                <div class="body_left_title">
                  <h3>{{ item.title }}</h3>
                </div>
                <div class="body_left_content">
                  <p>
                    {{ item.desc }}
                  </p>
                </div>
                <div class="body_left_review">
                  <div class="icon_box">
                    <div>
                      <img src="/src/assets/icon/look.svg" alt="" />
                    </div>
                    <div>{{ item.watch }}</div>
                  </div>
                  <div class="icon_box">
                    <div>
                      <img src="/src/assets/icon/review.svg" alt="" />
                    </div>
                    <div>{{ item.comments }}</div>
                  </div>
                  <div class="icon_box">
                    <div>
                      <img src="/src/assets/icon/like.svg" alt="" />
                    </div>
                    <div>{{ item.likes }}</div>
                  </div>
                </div>
              </div>
              <div class="body_right">
                <div class="body_right_picture">
                  <img :src="item.img" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home_page_body_right">
        <MyCard></MyCard>
        <Rank></Rank>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped lang="scss">
@import "../common/global.scss";
.home_page {
  &_body {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    &_left {
      width: 800px;
      &_swiper_img {
        @include set_w_h(1000px, 478px);
        img {
          @include set_w_h(100%, 100%);
        }
      }
      &_article_list {
        width: 100%;
        margin: 10px 0;
        border-radius: 15px;
        overflow: hidden;
        &_item_box {
          @include set_w_h(100%, 150px);
          padding: 10px 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #f2f2f5;
          background-color: white;
          cursor: pointer;
          &:hover {
            background-color: #fafafa;
          }
          .user_info {
            @include flex_col_center;
            &_tags {
              display: flex;
              margin-left: 10px;
              .tags {
                padding: 0 10px;
                position: relative;
                border-left: 1px solid #e5e6eb;
                color: #8c919e;
              }
            }
          }
          .body {
            display: flex;
            justify-content: space-between;
            &_left {
              margin-top: 10px;
              @include set_w_h(580px, 84px);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              &_content {
                color: #8c919e;
                p {
                  width: 580px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
              &_review {
                display: flex;
                .icon_box {
                  width: 70px;
                  @include flex_col_center;
                }
                img {
                  @include set_w_h(17px, 17px);
                }
              }
            }
            &_right {
              @include set_w_h(150px, 84px);
              img {
                @include set_w_h(100%, 100%);
                border-radius: 6px;
              }
            }
          }
        }
      }
    }
    &_right {
      width: 380px;
    }
  }
}
</style>
