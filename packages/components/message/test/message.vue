<template>
  <m-button type="primary" @click="openDefaultMessage">普通信息提示</m-button>
  <m-button type="primary" @click="success">成功信息提示</m-button>
  <m-button type="default" @click="error">错误信息提示</m-button>
  <m-button type="default" @click="openInfoMessage">功能操作提示</m-button> 
  <m-button type="primary" @click="openOneCustomIcon">单行自定义icon</m-button>
  <m-button type="primary" @click="openAreaDefault">多行文本</m-button>
  <m-button type="default" @click="openAreaError">多行文本错误状态</m-button>
  <m-button type="primary" @click="openCustomIcon">多行自定义icon</m-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { $Message } from "../index";
export default defineComponent({
  components: { },
  setup() {
    const openOneCustomIcon = () => {
      $Message.customIcon({
        title: '成功信息提示，',
        showClose: true,
        duration: 3000,
        customIcon: 'IconMeriComponentShow',
        className: 'message_custom',
        button: 'default',
        buttonClick: ()=>{
          console.log(1111)
        }
      })
    }
    const openCustomIcon = () => {
      $Message.customIcon({
        title: '成功信息提示，且需要让用户明确该操作对产品、其他模块和任务的影响文本文本文本文本文本文本文本文本文本',
        showClose: true,
        duration: 3000,
        customIcon: 'IconMeriComponentShow',
        className: 'message_custom',
        // button: 'default',
        buttonClick: ()=>{
          console.log(1111)
        }
      })
    }
    const openAreaDefault = () => {
      $Message.Default({
        title: '成功信息提示，且需要让用户明确该操作对产品、其他模块和任务的影响文本文本文本文本文本文本文本文本文本',
        showClose: true,
        duration: 3000,
        className: 'message_custom',
        button: 'default',
        buttonClick: ()=>{
          console.log(1111)
        }
      })
    }
    const openAreaError = () => {
      $Message.error({
        title: '成功信息提示，且需要让用户明确该操作对产品、其他模块和任务的影响文本文本文本文本文本文本文本文本文本',
        showClose: true,
        duration: 3000,
        className: 'message_custom',
        button: 'error',
        buttonClick: ()=>{
          console.log(1111)
        }
      });
    }
    const openDefaultMessage = () => {
      $Message.Default({
        title: '成功信息提示',
        showClose: true,
        duration: 3000,
        className: 'message_custom',
        button: 'default',
        buttonClick: ()=>{
          console.log(1111)
        }
      });
    }
    const openInfoMessage = () => {
      $Message.Info({
        title: '成功信息提示',
        showClose: true,
        duration: 3000,
        className: 'message_custom',
        // button: 'default',
        // buttonClick: ()=>{
        //   console.log(list)
        // }
      });
    }
    const success= ()=>{
      $Message.success({
        title: '成功信息提示',
        showClose: true,
        duration: 3000,
        className: 'message_custom',
        button: 'default',
        buttonClick: ()=>{
          console.log(1111)
        }
      });
    }

    const error= ()=>{
      $Message.error({
        title: '错误信息提示',
        duration: 3000,
        showClose: true,
        button: 'default',
        // buttonClick: ()=>{
        //   console.log(list)
        // }
      });
    }

    return { success, error, openDefaultMessage,  openInfoMessage, openAreaError, openAreaDefault, openCustomIcon, openOneCustomIcon};
  },
});
</script>
