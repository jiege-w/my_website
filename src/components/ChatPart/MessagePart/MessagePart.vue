<!--
 * @Author: zhoujie wuzhoujie666@gmail.com
 * @Date: 2023-03-18 13:08:41
 * @LastEditors: zhoujie wuzhoujie666@gmail.com
 * @LastEditTime: 2023-03-19 19:32:47
 * @FilePath: \project4dyq\src\components\ChatPart\MessagePart\MessagePart.vue
 * @Description: 聊天页面聊天的内容包括头部、内容、编辑区域的部分的组件
-->
<script setup>
import { List, VideoCamera, Select } from "@element-plus/icons-vue";
import MessageContent from "./MeasageContent/MessageContent.vue";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
const content = ref(null); //获取组建实例
const inputArea = ref(null); //获取dom元素
const dialogFormVisible = ref(false); //弹出框 默认为不可见
const formLabelWidth = "75px"; //label的宽度
const form = reactive({
  name: "",
  sex: "",
  age: "",
  num: "",
  result: "",
  medicion: "",
  more: "",
  doctor: "",
}); //表单收集的值
const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
]; //表单处方选择下拉框的内容

let message = ref(""); //发送的消息 默认为空
const drawer = ref(false); //视频弹出框 默认为关闭
const direction = ref("rtl"); //视频弹出框的弹出方向
const props = defineProps(["chooseInfo", "histroy"]); //接受props
/**
 * @description: 点击视频左侧的蒙层触发的弹出框（防误触）
 * @param {*} done 点击确认执行
 * @return {*}
 */
const handleClose = (done) => {
  ElMessageBox.confirm("是否确定中断视频？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const emit = defineEmits(["send", "done"]); //注册emit 可触发父组件对应的方法
/**
 * @description: 简易的数据双向绑定，由于聊天可能会发表情或者是动图，所以不能用input框去做，要用h5标签的contenteditable属性，这个可编辑容器可以实现input不能实现的，
 * 缺点是vue没有对这个做数据双向绑定，所以我们要做个简易的双向数据绑定
 * @return {*}
 */
const handleInput = () => {
  const inputContent = inputArea.value.innerHTML; //通过获取dom来获取输入的内容
  message.value = inputContent;
};
/**
 * @description: 移动到可当滚动区域最下面
 * @return {*}
 */
const toBottom = () => {
  content.value.toBottom();
};
/**
 * @description: 发送消息
 * @return {*}
 */
const send = async () => {
  event.preventDefault(); // 阻止浏览器默认换行操作，主要是阻止按回车换行
  if (!message.value) return;
  emit("send", message.value); //触发父组件的发送消息按钮 因为消息历史这个数据是在父组件拿的 所以要在父组件修改
  message.value = "";
};
defineExpose({ toBottom }); //向父组件暴露方法
</script>
<template>
  <div class="message_part">
    <div class="message_part_header" v-show="JSON.stringify(chooseInfo) !== '{}'">
      <div class="message_part_header_content">
        <div class="user_info">
          <div class="avatar">
            <el-avatar :size="45" :src="chooseInfo.avatar" />
          </div>
          <div class="nick">
            <div>{{ chooseInfo.nickName }}</div>
            <div>欢迎您来咨询</div>
          </div>
        </div>
        <div class="button_list">
          <el-tooltip class="box-item" effect="light" content="视频问诊" placement="bottom">
            <el-button type="primary" size="large" circle @click="drawer = true">
              <el-icon :size="20">
                <VideoCamera />
              </el-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip class="box-item" effect="light" content="处方单" placement="bottom">
            <el-button type="primary" size="large" circle @click="dialogFormVisible = true">
              <el-icon :size="20">
                <List />
              </el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="light" content="完成" placement="bottom">
            <el-button type="primary" size="large" circle @click="emit('done', chooseInfo.uid)">
              <el-icon :size="20">
                <Select />
              </el-icon>
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="message_part_body">
      <MessageContent ref="content" :histroy="props.histroy"></MessageContent>
    </div>
    <div class="message_part_edit" v-show="JSON.stringify(chooseInfo) !== '{}'">
      <div class="edit_box">
        <div class="edit_box_in clearfix">
          <div>
            <div class="content">
              <pre ref="inputArea" contenteditable="true" class="input" @input="handleInput" @keydown.enter="send">{{ message }}</pre>
            </div>
          </div>
          <div>
            <span class="iconfont">&#xe614;</span>
            <span class="iconfont">&#xe60d;</span>
            <span class="iconfont" @click="send">&#xe67d;</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="处方单" width="550" center>
      <el-form :model="form" label-position="left" size="default">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="患者姓名:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="患者性别:" :label-width="formLabelWidth">
              <el-select v-model="form.sex" placeholder="请选择">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="患者年龄:" :label-width="formLabelWidth">
              <el-input v-model="form.age" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="患者编号:" :label-width="formLabelWidth">
              <el-input v-model="form.num" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="临床诊断:" :label-width="formLabelWidth">
              <el-input v-model="form.result" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="处方单:" :label-width="formLabelWidth">
              <el-select v-model="form.medicion" multiple placeholder="请选择" style="width: 100%">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:" :label-width="formLabelWidth">
              <el-input v-model="form.more" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="主治医生:" :label-width="formLabelWidth">
              <el-input v-model="form.doctor" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="large" @click="dialogFormVisible = false">取消</el-button>
          <el-button size="large" type="primary" @click="dialogFormVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <el-drawer v-model="drawer" :direction="direction" :before-close="handleClose" size="400" :with-header="false">
      <div class="video_container">
        <div class="video_bg" :style="{ backgroundImage: `url('${chooseInfo.avatar}')` }"></div>
        <div class="mask">
          <div class="user">
            <div>
              <el-avatar :size="150" :src="chooseInfo.avatar" />
            </div>
            <div>yikecao</div>
            <div>正在等待对方接受邀请<span>.</span><span>.</span><span>.</span></div>
          </div>
          <div class="operation center">
            <div @click="drawer = false"><span class="iconfont">&#xe640;</span></div>
            <div>取消</div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<style scoped lang="scss">
:deep(.el-drawer__body) {
  padding: 0;
}
:deep(.el-dialog__body) {
  padding: 25px 25px 0;
}
:deep(.el-input__wrapper) {
  border-radius: 3px !important;
}
.message_part {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &_header {
    width: 100%;
    height: 68px;
    border-bottom: 1px solid #dee0e3;
    flex-shrink: 0;
    &_content {
      width: calc(100% - 60px);
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .user_info {
        display: flex;
        align-items: center;
        .nick {
          margin-left: 20px;
          & > :first-child {
            font-size: 16px;
            font-weight: 900;
          }
          & > :last-child {
            color: #90aac8;
          }
        }
      }
      .button_list {
        font-size: 20px;
      }
    }
  }
  &_body {
    flex: auto;
    overflow: auto;
  }
  &_edit {
    width: 100%;
    min-height: 65px;
    flex-shrink: 0;
    .edit_box {
      width: calc(100% - 60px);
      min-height: 25px;
      border: 1px solid #dee0e3;
      border-radius: 5px;
      margin: 0 auto;
      &_in {
        width: calc(100% - 20px);
        min-height: 25px;
        padding: 10px;
        & > div:first-child {
          max-width: 100%;
          min-width: calc(100% - 130px);
          display: inline-block;
          line-height: 30px;
          .content {
            max-height: 100px;
            overflow-y: scroll;
            scrollbar-width: thin;
            font-variant-ligatures: none;
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
            .input {
              min-height: 25px;
              overflow-x: hidden;
              outline: none;
              padding: none;
              width: 100%;
              margin: 0;
              white-space: pre-wrap;
              word-wrap: break-word;
              font-size: 13px;
              font-weight: 400;
              font-family: sans-serif;
            }
          }
        }
        & > div:last-child {
          float: right;
          line-height: 25px;
          span {
            font-size: 25px;
            line-height: 25px;
            padding-left: 10px;
            cursor: pointer;
            &:last-child {
              color: #629cfb;
            }
          }
        }
      }
    }
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .video_container {
    width: 100%;
    height: 100%;
    position: relative;
    .video_bg {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      filter: blur(10px);
    }
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.6);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      .user {
        margin-bottom: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > :nth-child(2) {
          font-size: 30px;
          margin-top: 20px;
        }
        & > :last-child {
          margin-top: 20px;
        }
      }

      .operation {
        bottom: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > :first-child {
          width: 80px;
          height: 80px;
          background-color: #e4523d;
          text-align: center;
          border-radius: 50%;
          cursor: pointer;
          span {
            font-size: 40px;
            line-height: 80px;
          }
        }
        & > :last-child {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
