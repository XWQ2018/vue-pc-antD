<!--
 * @Description: login
 * @Author: xwq
 * @Date: 2020-12-13 15:41:44
-->
<template>
  <div class="login-wrap">
    <div class="wrap-content">
      <div class="ms-login">
        <div class="ms-title">登录系统</div>
        <!-- @submit="handleSubmit" -->
        <a-form
          layout="vertical"
          :model="formInline"
          v-bind="layout"
          :rules="rules"
          ref="ruleForm"
          @submit.prevent
        >
          <a-form-item name="username">
            <a-input
              v-model:value="formInline.username"
              placeholder="Username"
              :maxlength="11"
            >
              <template #prefix
                ><UserOutlined style="color:rgba(0,0,0,.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item name="password">
            <a-input
              v-model:value="formInline.password"
              type="password"
              placeholder="Password"
              :maxlength="10"
            >
              <template #prefix
                ><LockOutlined style="color:rgba(0,0,0,.25)"
              /></template>
            </a-input>
          </a-form-item>
          <a-form-item style="margin-bottom:0">
            <Pbutton
              @btnHandle="handleSubmit"
              buttonText="登 录"
              color="#f00"
            ></Pbutton>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
  ref
} from "vue";
import { useStore } from "vuex";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined
  },
  setup(prop, context) {
    const appCtx = getCurrentInstance();
    const store: any = useStore();
    // 验证规则
    const validateUsername = async (rule, value, callback) => {
      console.log(rule);
      console.log(callback);
      if (value === "") {
        return Promise.reject("请输入手机号");
      } else if (value.length < 11) {
        return Promise.reject("请输入正确的手机号");
      } else {
        return Promise.resolve();
      }
    };
    const validatePassword = async (rule, value, callback) => {
      if (value === "") {
        return Promise.reject("请输入密码");
      } else if (value.length < 6) {
        return Promise.reject("密码长度规则错误");
      } else {
        return Promise.resolve();
      }
    };
    const formInfo = reactive({
      formInline: {
        username: "",
        password: ""
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 24 }
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    });
    // 绑定元素，即2.0的$refs
    const ruleForm = ref();
    const handleSubmit = () => {
      ruleForm.value
        .validate()
        .then(() => {
          store.dispatch("author/Login", formInfo.formInline);
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };
    // const w_height = ref();
    onMounted(() => {
      // w_height.value = window.getComputedStyle(<HTMLBodyElement>document.body).height;
      // console.log("===", w_height.value);
    });
    return {
      ...toRefs(formInfo),
      handleSubmit,
      ruleForm
    };
  }
});
</script>

<style lang="scss" scoped>
.login-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../assets/img/login-bg-default.jpg");
  background-size: 100%;

  // background-size: cover;
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background: url("../assets/img/login-bg-default.jpg") no-repeat center center;
  .wrap-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    margin-top: -190px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
    .ms-login {
      padding: 20px 40px 20px 40px;
      width: 100%;
      .ms-title {
        text-align: center;
        font-weight: 600;
        font-size: 20px;
        color: #fff;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
