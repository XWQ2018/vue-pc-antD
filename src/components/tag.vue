<!--
 * @Description: 标签栏
 * @Author: xwq
 * @Date: 2020-12-30 14:28:24
-->

<template>
  <div class="tag-page row">
    <ul class="row label-wrap fill">
      <li
        class="label-item"
        v-for="(i, k) in tagsList"
        :key="k"
        :class="{ active: i.path == currentRoute }"
      >
        <router-link :to="{ path: i.path }">
          <span class="title">{{ i.title }}</span>
        </router-link>
        <CloseOutlined
          style="fontSize:12px;paddingLeft:5px;cursor:pointer"
          @click="closeTag(k)"
        />
      </li>
    </ul>
    <a-dropdown v-if="tagsList.length > 1">
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">关闭其他</a-menu-item>
          <a-menu-item key="2">全部关闭</a-menu-item>
        </a-menu>
      </template>
      <a-button :style="{ marginLeft: '8px', color: '#46AEF7' }">
        标签页 <DownOutlined />
      </a-button>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs,
  watch
} from "vue";
import { useRouter } from "vue-router";
import { CloseOutlined, DownOutlined } from "@ant-design/icons-vue";
interface RuleData {
  title: string;
  path: string;
  name: string;
}
export default defineComponent({
  emits: ["tagHandle"],
  components: {
    CloseOutlined,
    DownOutlined
  },
  setup(props, context) {
    const appInfo = getCurrentInstance();
    const { push } = useRouter(); //解构路由信息
    const dataInfo = reactive({
      tagsList: [] as Array<RuleData>,
      currentRoute: ""
    });
    // 当前路由信息
    const routerInfo = computed(
      () => (appInfo as any).ctx.$router.currentRoute.value
    );
    // 标签关闭
    const closeTag = index => {
      const dealIteam = dataInfo.tagsList.splice(index, 1)[0];
      const item = dataInfo.tagsList[index]
        ? dataInfo.tagsList[index]
        : dataInfo.tagsList[index - 1];
      if (item) {
        dealIteam.path ===
          (appInfo as any).ctx.$router.currentRoute.value.fullPath &&
          push(item.path);
      } else {
        push("/");
      }
    };
    // 储存路由
    const setRouter = route => {
      dataInfo.currentRoute = route.path;
      const isExist = dataInfo.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (dataInfo.tagsList.length >= 8) {
          dataInfo.tagsList.shift();
        }
        const data = {
          title: route.meta.title,
          path: route.fullPath,
          name: route.name
        };
        dataInfo.tagsList.push(data);
      }
      context.emit("tagHandle", route.path);
    };
    // 标签栏
    const handleMenuClick = item => {
      const routeInfo = (appInfo as any).ctx.$router.currentRoute.value;
      if (item.key == 1) {
        const result = dataInfo.tagsList.filter(i => i.path == routeInfo.path);
        dataInfo.tagsList = result;
      } else {
        const result = dataInfo.tagsList.filter(i => i.path == "/home");
        if (result.length > 0) {
          dataInfo.tagsList = result;
          push({
            path: "/home"
          });
        } else {
          dataInfo.tagsList = [];
          push("/");
        }
      }
    };
    onMounted(() => {
      setRouter((appInfo as any).ctx.$router.currentRoute.value);
    });
    watch(routerInfo, nval => {
      setRouter(nval);
    });
    return {
      closeTag,
      handleMenuClick,
      ...toRefs(dataInfo)
    };
  }
});
</script>

<style lang="scss" scoped>
.tag-page {
  .label-wrap {
    padding: 3px;
    .label-item {
      padding: 2px 8px;
      color: #666;
      background-color: #fff;
      margin-right: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
      &:hover {
        color: #1890ff;
        border-color: #1890ff;
        .title {
          color: #1890ff;
        }
      }
    }
  }
  .active {
    background-color: #1890ff !important;
    color: #fff !important;
    border-color: #1890ff;
    .title {
      color: #fff;
    }
    &:hover {
      color: #fff !important;
      .title {
        color: #fff !important;
      }
    }
  }
}
</style>
