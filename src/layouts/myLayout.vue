<!-- Created by xj on 2021-04-28. myLayout -->
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="baseObj.leftDrawerOpen = !baseObj.leftDrawerOpen"
        />

        <q-toolbar-title>
          A Quasar Project
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="baseObj.leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          菜单
        </q-item-label>
        <q-item
          v-for="item in menuList"
          :key="item.name"
          clickable
          @click="$router.push(item.path)"
        >
          <q-item-section v-if="item.icon" avatar>
            <q-icon :name="item.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <!-- <q-item-label caption>
              {{ item.caption }}
            </q-item-label> -->
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <q-page class="fit ">
        <router-view class="fit absolute q-pa-sm" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "myLayout",
  setup() {
    const baseObj = reactive({
      leftDrawerOpen: true
    });
    const menuList = ref([
      {
        name: "test1",
        title: "test1",
        icon: "school",
        path: "test1"
      },
      {
        name: "demo1",
        title: "demo1",
        icon: "school",
        path: "demo1"
      },
      {
        name: "demo2",
        title: "demo2",
        icon: "school",
        path: "demo2"
      }
    ]);

    return {
      baseObj,
      menuList
    };
  }
};
</script>
<style lang="scss" scoped></style>
