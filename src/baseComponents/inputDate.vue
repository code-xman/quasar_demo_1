<!-- Created by xj on 2021-04-29. inputDate -->
<template>
  <div class="inputDate">
    <q-input v-model="date" mask="date">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date v-model="date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
import { ref, watch } from "@vue/composition-api";
export default {
  name: "inputDate",
  setup(props, { emit }) {
    let date = ref("");

    watch(date, val => {
      emit("input", val);
    });

    return {
      date
    };
  }
};
</script>
<style lang="scss" scoped></style>
