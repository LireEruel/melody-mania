<script lang="ts" setup>
import { Cloudinary } from '@cloudinary/url-gen'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dwn77lk2b'
  }
})
</script>

<template>
  <div class="flex justify-center items-center w-screen h-full">
    <div class="flex flex-col items-center justify-center w-4/5 h-full">
      <h3 class="text-center text-6xl font-bold text-gray-800">Problems</h3>
      <a-button>add problem</a-button>
      <div class="flex">
        <a-table />
      </div>
    </div>
  </div>
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
