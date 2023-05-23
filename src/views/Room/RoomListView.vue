<script lang="ts" setup>
import { SyncOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
const searchValue = ref<string>('')

const onSearch = () => {}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-full">
    <div class="flex flex-col items-center justify-center w-4/5 h-full">
      <h3 class="text-center text-6xl font-bold text-gray-800">방</h3>
      <div>
        <a-input-search
          v-model:value="searchValue"
          placeholder="input search text"
          style="width: 800px font-size: 2rem"
          @search="onSearch"
        />

        <a-button shape="circle" class="ml-5">
          <template #icon><sync-outlined /></template>
        </a-button>
      </div>
      <div class="flex flex-wrap bg-gray-100 w-3/5 h-3/5 my-12 overflow-auto">
        <div
          class="flex flex-col justify-center items-center cursor-pointer bg-white h-48 px-6 pb-8 pt-10 mt-2 mr-0 mb-8 ml-10 shadow-xl ring-1 ring-gray-900/5 sm:max-w-sm sm:rounded-lg sm:px-10 border-2 border-solid hover:border-blue-500"
        >
          <h5 class="text-2xl">게임 <span>#1Ap</span></h5>
          <div>
            <team-outlined />
            <p>0/5</p>
          </div>
        </div>
      </div>
      <div>
        <a-button type="primary" size="large" class="mr-10"> Create </a-button>
        <a-button size="large"> 입장 </a-button>
      </div>
    </div>
  </div>
</template>
