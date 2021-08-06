<!-- Created by xj on 2021-04-28. bottomBtn -->
<template>
  <div class="bottomBtn text-right q-mt-md q-px-sm">
    <q-btn
      v-for="btn in btnList"
      class="q-ml-sm"
      :loading="btn.loading || false"
      :key="btn.type"
      :color="btn.color || 'white'"
      :text-color="btn.textColor || 'black'"
      :label="btn.label"
      @click="btnClick(btn.type)"
    />
  </div>
</template>
<script>
export default {
  name: "bottomBtn",
  props: {
    btnList: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    function btnClick(type) {
      emit("btnClick", type);
    }

    return {
      btnClick
    };
  }
};
</script>
<style lang="scss" scoped>
.bottomBtn {
  height: 50px;
}
</style>
