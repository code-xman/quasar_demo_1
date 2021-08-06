<!-- Created by xj on 2021-04-29. baseForm -->
<template>
  <div class="baseForm">
    <q-form class="row col-auto" ref="aForm">
      <q-item
        class="row"
        v-for="item in formObj.list"
        :key="item.name"
        :class="item.col || 'col-6'"
      >
        <span class="q-mr-sm inputLabel">{{ item.label }}</span>
        <component
          class="col"
          :is="item.tag"
          :name="item.name"
          v-bind="item.optionObj"
          v-on="item.events"
          :value="valueObj[item.name]"
          :rules="item.rules"
          @input="val => valChange(item.name, val)"
          @filter="
            (val, update, abort) =>
              filterFn({ name: item.name, val, update, abort })
          "
        >
        </component>
      </q-item>
    </q-form>
  </div>
</template>
<script>
import { copy } from "src/utils/index";
import inputDate from "src/baseComponents/inputDate";
import inputMoney from "src/baseComponents/inputMoney";
// import selectLazy from "src/baseComponents/selectLazy";
import {
  QSelect,
  QInput,
  QRadio,
  QCheckbox,
  QToggle,
  QBtnToggle,
  QOptionGroup,
  QSlider,
  QRange,
  QTime,
  QDate
} from "quasar";
import { ref, watch } from "@vue/composition-api";
export default {
  name: "baseForm",
  components: {
    QSelect,
    QInput,
    QRadio,
    QCheckbox,
    QToggle,
    QBtnToggle,
    QOptionGroup,
    QSlider,
    QRange,
    QTime,
    QDate,
    inputDate,
    inputMoney
  },
  props: {
    formObj: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    let valueObj = ref({});
    valueObj.value = copy(props.formObj.valueObj);

    const filterFn = filterObj => {
      emit("filterFn", filterObj);
    };

    function valChange(name, val) {
      emit("valChange", name, val);
    }
    watch(props.formObj.valueObj, val => {
      valueObj.value = copy(props.formObj.valueObj);
    });

    return {
      valueObj,
      valChange,
      filterFn
    };
  }
};
</script>
<style lang="scss" scoped>
.inputLabel {
  line-height: 56px;
}
// 去除数字框右侧上下按钮
::v-deep input[type="number"]::-webkit-outer-spin-button,
::v-deep input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
