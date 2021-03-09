<!--
 * @Description: Description
 * @Author: xwq
 * @Date: 2020-12-02 15:53:09
-->
<template>
  <a-list item-layout="horizontal" :data-source="dataList" bordered>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <template #title>
            <a href="https://www.antdv.com/">{{ item.title }}</a>
          </template>
          <template #avatar>
            <a-avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
  <div class="row">
    <Pbutton
      buttonText="提交数据"
      style="width:50%;margin:0 auto"
      @btnHandle="submitHandle"
      :disabled="disabled"
    ></Pbutton>
  </div>
  <v-dialog title="提醒" v-model:isShow="isShow" @confirm="dialogHandle">
    <template #content>
      <p v-hightLights="'yellow'">前方高能，请不要乱点</p>
      <p>前方高能，请不要乱点</p>
      <p>前方高能，请不要乱点</p>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject } from "vue";
import vDialog from "@components/dialog.vue";
export default defineComponent({
  components: {
    vDialog
  },
  setup() {
    const dataInfo = reactive({
      dataList: [
        {
          title: "Ant Design Title 1"
        },
        {
          title: "Ant Design Title 2"
        },
        {
          title: "Ant Design Title 3"
        },
        {
          title: "Ant Design Title 4"
        }
      ],
      disabled: false,
      isShow: false
    });
    const loadStatus = inject("loading");
    const submitHandle = () => {
      dataInfo.isShow = true;
    };

    const dialogHandle = () => {
      dataInfo.isShow = false;
    };

    return {
      ...toRefs(dataInfo),
      loadStatus,
      submitHandle,
      dialogHandle
    };
  }
});
</script>

<style lang="scss" scoped>
.row {
  color: $color-blue;
}
</style>
