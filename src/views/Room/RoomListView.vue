<script lang="ts" setup>
import { getRooms } from '@/api/room/room'
import type { Room } from '@/types/room'
import { SyncOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { onMounted, ref } from 'vue'
const searchValue = ref<string>('')

const onSearch = () => {}
const room_list = ref([] as Array<Room>)
const createRoomModalVisible = ref(false)
const onLoadingRooms = ref(false)

onMounted(async () => {
  await loadingRooms()
})

const onOpenCreateRoomModal = () => {
  createRoomModalVisible.value = true
}

const onCloseCreateRoomModal = () => {
  createRoomModalVisible.value = false
}

const loadingRooms = async () => {
  try {
    onLoadingRooms.value = true
    const res = await getRooms()
    if (res) {
      room_list.value = res
    }
  } catch (e) {
    console.error(e)
  } finally {
    onLoadingRooms.value = false
  }
}
</script>

<template>
  <div class="flex justify-center items-center w-screen h-full">
    <div class="flex flex-col items-center justify-center w-4/5 h-full">
      <h3 class="text-center text-6xl font-bold text-gray-800">Melody Mania</h3>
      <div class="flex">
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
      <a-spin :spinning="onLoadingRooms">
        <div class="flex flex-wrap bg-gray-100 w-3/5 h-4/5 my-12 overflow-auto">
          <div
            v-for="room in room_list"
            :key="room._id"
            class="flex flex-col justify-center items-center cursor-pointer bg-white h-48 px-6 pb-8 pt-10 mt-2 mr-0 mb-8 ml-10 shadow-xl ring-1 ring-gray-900/5 sm:max-w-sm sm:rounded-lg sm:px-10 border-2 border-solid hover:border-blue-500"
          >
            <h5 class="text-2xl">
              {{ room.subject }} <span>#{{ room._id.substring(0, 3) }}</span>
            </h5>
            <div class="flex flex-col items-center text-lg">
              <team-outlined />
              <p>{{ room.participants_list.length }} / {{ room.participants_count }}</p>
            </div>
          </div>
        </div>
      </a-spin>
      <div>
        <a-button @click="onOpenCreateRoomModal" type="primary" size="large" class="mr-10">
          Create
        </a-button>
        <a-button size="large"> Enter </a-button>
      </div>
    </div>
    <modal-room-create
      :visible="createRoomModalVisible"
      @close-modal="onCloseCreateRoomModal"
    ></modal-room-create>
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
