<script lang="ts" setup>
import ModalProblemCreateVue from '@/components/modals/ModalProblemCreate.vue'
import { ref } from 'vue'
const createProblemModalVisible = ref(false)

const openCreateProblemModal = () => {
  createProblemModalVisible.value = true
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-full">
    <div class="flex flex-col items-center justify-center w-4/5 h-full">
      <h3 class="text-center text-6xl font-bold text-gray-800">Problems</h3>
      <a-button @click="openCreateProblemModal">add problem</a-button>
      <div class="flex">
        <a-table />
      </div>
    </div>
  </div>
  <ModalProblemCreateVue :visible="createProblemModalVisible" />
</template>

<style>
.ant-spin-nested-loading {
  width: 100%;
  height: 70%;
}
.ant-spin-container {
  display: flex;
  justify-content: center;
  height: 100%;
}
</style>
