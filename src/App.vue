<template>
  <div class="loading" v-show="load">
    <a-spin tip="加载中..." size="small" :spinning="true"> </a-spin>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    return {
      load: computed(() => store.state.app.loading)
    };
  }
});
</script>
<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
  z-index: 1;
}
</style>
