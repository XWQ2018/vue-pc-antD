<!--
 * @Description: layout
 * @Author: xwq
 * @Date: 2021-01-09 13:40:40
-->
<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="sys-name">
        <span class="sys-title">运营后台系统</span>
      </div>
      <a-menu
        theme="dark"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @click="menuClick"
      >
        <template v-for="item in menuInfo" :key="item.key">
          <template v-if="item.children.length === 1">
            <a-menu-item :key="item.children[0].path">
              <BankFilled />
              <span>{{ item.children[0].meta.title }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item.meta.key">
              <template #title>
                <span>
                  <PieChartFilled />
                  <span>{{ item.meta.title }}</span>
                </span>
              </template>
              <a-menu-item :key="item2.path" v-for="item2 in item.children">{{
                item2.meta.title
              }}</a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="ly-head">
        <a-avatar
          class="pic"
          :size="38"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608013399774&di=6f40b46a0834e07a3280a45409994f72&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201611%2F14%2F20161114085427_L2eU8.jpeg"
        >
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <span class="name">张三丰</span>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <CaretDownOutlined style="color:#fff" />
          </a>
          <template #overlay>
            <a-menu @click="setting">
              <a-menu-item key="datum">
                <a href="javascript:;">个人资料</a>
              </a-menu-item>
              <a-menu-item key="setting">
                <a href="javascript:;">系统设置</a>
              </a-menu-item>
              <a-menu-item key="loginOut">
                <a href="javascript:;">退出系统</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content style="margin: 0">
        <a-breadcrumb style="margin: 0 0 16px 0;background-color:#fff">
          <a-breadcrumb-item>
            <v-tag @tagHandle="tagHandle"></v-tag>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  ref,
  watch,
  PropType
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { removeToken } from "../utils/auth";
import {
  UserOutlined,
  PieChartFilled,
  BankFilled,
  CaretDownOutlined,
  CloseOutlined
} from "@ant-design/icons-vue";
import vTag from "./tag.vue";

// import { Layout, Form, Breadcrumb, Menu, Avatar, Dropdown } from "ant-design-vue";

export default defineComponent({
  components: {
    UserOutlined,
    PieChartFilled,
    BankFilled,
    CaretDownOutlined,
    CloseOutlined,
    vTag
  },
  setup() {
    const { push, options, replace } = useRouter(); //解构路由信息
    const store = useStore(); //仓库信息
    const { value } = reactive(useRouter().currentRoute); //获取当前页面路由信息
    const dataInfo = reactive({
      selectedKeys: value.path == "/home" ? ["/home"] : [value.path],
      collapsed: false,
      menuInfo: (options.routes as Array<any>).filter(i => i.meta.show),
      openKeys: [] as any[] // ts默认初始化空数组为never1]类型,必须给定类型
    });
    //类型定义规则
    interface ruleInfo {
      item: object;
      key: string;
      keyPath: Array<string>;
    }
    //菜单点击
    const menuClick = (opt: ruleInfo) => {
      dataInfo.selectedKeys.splice(0, 1, opt.key);
      push(opt.key);
    };
    const routerFormate = (Rou: string): void => {
      //处理选中的菜单自动展开，i.meta!.key如果确定已经定义必须加上感叹号，否则会提示undefind
      dataInfo.menuInfo!.forEach(i => {
        if (Rou != i.path && Rou.includes(i.path)) {
          dataInfo.openKeys = [i.meta!.key];
        }
      });
    };
    // 更新菜单高亮
    const tagHandle = val => {
      dataInfo.selectedKeys.splice(0, 1, val);
    };
    const setting = ({ item, key, keyPath }) => {
      if (key == "loginOut") {
        removeToken();
        store.commit("author/REMOVE_TOKEN");
        setTimeout(() => {
          replace("/login");
        }, 200);
      }
    };
    watch(
      () => dataInfo.selectedKeys.join(),
      nVal => {
        routerFormate(nVal);
      }
    );
    onMounted(() => {
      routerFormate(value.path);
    });
    return {
      menuClick,
      setting,
      tagHandle,
      ...toRefs(dataInfo)
    };
  }
});
</script>

<style lang="scss" scoped>
#components-layout-demo-side {
  .sys-name {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    .sys-title {
      color: #fff;
      font-weight: 600;
    }
  }
}
.ly-head {
  padding: 0 20px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .name {
    padding: 0 10px;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
  }
}
</style>
