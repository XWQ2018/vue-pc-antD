<!--
 * @Description: 弹窗
 * @Author: xwq
 * @Date: 2020-12-31 10:32:41
-->
<template>
  <div class="dialog">
    <div class="wrap" v-show="isShow">
      <p class="title">{{ title }}</p>
      <div class="content">
        {{ content }}
        <slot name="content"></slot>
      </div>
      <div class="btn row">
        <a-button
          class="fill"
          :style="{ marginRight: '5px' }"
          @click="$emit('update:isShow', false)"
          >{{ cancelText }}</a-button
        >
        <a-button
          class="fill"
          type="primary"
          @click="$emit('update:isShow', false)"
        >
          {{ confirmText }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// interface rule {
//     title: string;
//     confirmText?: string;
//     confirmType?: string;
//     cancelText?: string;
// }
export default defineComponent({
  props: {
    // userInfo: Array as PropType<rule[]>,
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      required: true,
      type: String
    },
    confirmText: {
      type: String,
      default: "确认"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    content: {
      type: String
    }
  },
  setup(prop, context) {
    const confirm = () => {
      const { emit } = context;
      emit("confirm");
    };
    return {
      confirm
    };
  }
});
</script>

<style lang="scss" scoped>
.wrap {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #fff;
  padding: 12px;
  border-radius: 10px;
  max-width: 300px;
  .title {
    text-align: center;
    padding: 5px 0;
    &::after {
      display: block;
      content: "";
      width: 100%;
      height: 1px;
      border-bottom: 0.5px solid #f2f2f2;
    }
  }
  .content {
    margin-bottom: 20px;
    word-break: break-all;
    font-size: 14px;
  }
  .btn {
  }
}
</style>
