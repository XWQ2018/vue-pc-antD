<!--
 * @Description: 404
 * @Author: xwq
 * @Date: 2021-01-09 15:57:47
-->
<template>
  <div class="not-found">
    <div class="t-t">
      4
      <span class="t-t-c">0</span>
      4
    </div>
    <p class="desc">不好意思！页面走丢了.....</p>
    <div class="btn">
      <router-link :to="{ path: '/' }">
        <Pbutton buttonText="返回首页" color="#f00"></Pbutton>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.not-found {
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translate(-50%, -20%);
  .t-t {
    font-size: 200px;
    color: #46aef7;
    font-weight: 600;
    .t-t-c {
      font-size: 180px;
    }
  }
  .desc {
    text-align: center;
    background-color: #f2f2f2;
    padding: 5px 0;
  }
  .btn {
    margin: auto;
    margin-top: 20px;
    width: 50%;
  }
}
</style>
