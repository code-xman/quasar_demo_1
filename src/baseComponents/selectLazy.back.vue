<!-- Created by xj on 2021-05-11. selectLazy -->
<template>
  <div class="selectLazy">
    <q-select
      v-model="model"
      use-chips
      :options="optionList"
      @filter="filterFn"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            暂无选项
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>
<script>
import { ref, watch } from '@vue/composition-api'
export default {
  name: 'selectLazy',
  porps: {
    name: {
      type: String,
      require: true
    },
    options: {
      type: Array,
      require: true
    }
  },
  setup (props, {emit}) {
    const model = ref(null)
    const optionList = ref(null)
    optionList.value = props.options

    
    const filterFn = (val, update, abort) => {
      emit('filterFn', {name: props.name,val, update, abort})
    }

    watch(model, (val) => {
      emit("input", val);
    })
    watch(() => props.options, (val) => {
      optionList.value = val
    })
    return {
      model,
      optionList,
      filterFn
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
