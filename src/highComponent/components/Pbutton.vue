<!--
 * $attrs增加了class和style，如果子组件只有一个根元素，类名和样式会直接挂载在根元素上
 * 移除了$listeners
 * 
-->
<template>
  <div>
    <a-button
      type="primary"
      html-type="submit"
      :disabled="$attrs.disabled"
      size="large"
      block
      @click="$emit('btnHandle')"
    >
      {{ $attrs.buttonText }}
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  emits: ["btnHandle"]
});
</script>

<style lang="scss" scoped></style>
