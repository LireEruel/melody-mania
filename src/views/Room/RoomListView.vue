<script lang="ts" setup>
import { getRooms, joinRoom } from '@/api/room/room'
import type { Room } from '@/types/room'
import { SyncOutlined, TeamOutlined } from '@ant-design/icons-vue'
import Swal from 'sweetalert2'
import { onMounted, ref } from 'vue'
const searchValue = ref<string>('')

const onSearch = () => {}
const room_list = ref([] as Array<Room>)
const create_room_modal_visible = ref(false)
const on_loading_rooms = ref(false)
const selected_room_id = ref('')
onMounted(async () => {
  await loadingRooms()
})

const onOpenCreateRoomModal = () => {
  create_room_modal_visible.value = true
}

const onCloseCreateRoomModal = () => {
  create_room_modal_visible.value = false
}

const onClickedEnterBtn = () => {
  Swal.fire({
    title: 'Fetching Data',
    text: 'Wait',
    allowOutsideClick: false,
    showCancelButton: true,
    showConfirmButton: false,
    heightAuto: false,
    didOpen: async () => {
      try {
        console.log(selected_room_id.value)
        const response = await joinRoom(selected_room_id.value)

        // 결과 도착, SweetAlert2 텍스트 업데이트
        Swal.update({
          title: 'Fetching Data',
          text: 'Success'
        })
        Swal.close()
        window.location.replace('/room')
        console.log(response) // 결과 처리 로직
      } catch (error) {
        console.error('Error:', error)
        Swal.update({
          title: 'Fetching Data',
          text: 'Error occurred'
        })
      }
    }
  })
}

const onSelectedRoom = (room_id: string) => {
  if (selected_room_id.value == room_id) {
    selected_room_id.value = ''
  } else {
    selected_room_id.value = room_id
  }
}

const loadingRooms = async () => {
  try {
    on_loading_rooms.value = true
    const res = await getRooms()
    if (res) {
      room_list.value = res
      console.log(res)
    }
  } catch (e) {
    console.error(e)
  } finally {
    on_loading_rooms.value = false
  }
}

const onClickedManageProblemsBtn = () => {
  window.location.replace('/problems')
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

        <a-button
          @click="loadingRooms"
          :loading="on_loading_rooms"
          shape="circle"
          class="ml-5 mr-5"
        >
          <template #icon><sync-outlined /></template>
        </a-button>
      </div>
      <a-spin :spinning="on_loading_rooms">
        <div class="flex flex-wrap bg-gray-100 w-3/5 h-4/5 my-12 overflow-auto">
          <div
            v-for="room in room_list"
            :key="room._id"
            :class="{
              'selected-border': room._id == selected_room_id,
              'bg-sky-50': room._id == selected_room_id,
              'bg-white': room._id !== selected_room_id
            }"
            @click="() => onSelectedRoom(room._id)"
            class="flex flex-col justify-center items-center cursor-pointer h-48 px-6 pb-8 pt-10 mt-2 mr-0 mb-8 ml-10 shadow-xl ring-1 ring-gray-900/5 sm:max-w-sm sm:rounded-lg sm:px-10 border-2 border-solid hover:border-blue-300"
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
        <a-button type="primary" @click="onClickedManageProblemsBtn"> manage problems </a-button>
        <a-button
          @click="onOpenCreateRoomModal"
          type="primary"
          size="large"
          class="ml-10 mr-10 green-btn"
        >
          Create Room
        </a-button>
        <a-button
          size="large"
          type="primary"
          :disabled="!selected_room_id.length"
          @click="onClickedEnterBtn"
        >
          Enter
        </a-button>
      </div>
    </div>
    <modal-room-create :visible="create_room_modal_visible" @close-modal="onCloseCreateRoomModal">
    </modal-room-create>
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
