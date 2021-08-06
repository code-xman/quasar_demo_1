<!-- Created by xj on 2021-05-10. inputMoney -->
<template>
  <div class="inputMoney">
    <q-input
      :clearable="clearable"
      :clear-icon="clearIcon"
      v-model="showVal"
      @blur="formatter"
      @focus="deFormatter"
    ></q-input>
  </div>
</template>
<script>
import { formatMoney } from 'src/utils/index'
import { ref } from '@vue/composition-api'
export default {
  name: 'inputMoney',
  props: {
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearIcon: {
      type: String,
      default: ''
    }
  },
  setup (props, {emit}) {
    let showVal = ref('')
    if (!!props.value) {
      showVal = formatMoney(Number(props.value.replace(/,/g, '')))
    }
    const formatter = () => {
      if (!!showVal.value) {
        showVal.value = formatMoney(Number(showVal.value.replace(/,/g, '')))
        emit("input", showVal.value);
      }
    }
    const deFormatter = () => {
      if (!!showVal.value) {
        showVal.value = showVal.value.replace(/,/g, '')
        emit("input", showVal.value);
      }
    }

    return {
      showVal,
      formatter,
      deFormatter
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
