<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue/lib/vc-select/Select'
import { UserOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { createRoom } from '@/api/room/room'
import Swal from 'sweetalert2'
const emit = defineEmits(['close-modal'])
const props = defineProps<{
  visible: boolean
}>()

const participantCount = ref(5)
const checkPublicRoom = ref(true)
const subjects = ['K-POP', 'J-POP', '게임', '영화', '만화']
const selectedSubject = ref('')
const inputPassword = ref('')
const SelectParticipantCountOptions = ref<SelectProps['options']>([
  {
    value: 5,
    label: '5'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 7,
    label: '7'
  },
  {
    value: 8,
    label: '8'
  },
  {
    value: 9,
    label: '9'
  },
  {
    value: 10,
    label: '10'
  }
])

const onSelectedSubject = (subject: string) => {
  selectedSubject.value = subject
}

const onClickCreateBtn = () => {
  console.log('create btn clicked')
  console.log(
    participantCount.value,
    checkPublicRoom.value,
    selectedSubject.value,
    inputPassword.value
  )
  if (selectedSubject.value.length < 1) {
    Swal.fire({
      title: 'Error!',
      text: '주제를 확인해주세요',
      icon: 'error',
      confirmButtonText: '확인',
      heightAuto: false
    })
  } else {
    try {
      const res = createRoom(
        participantCount.value,
        checkPublicRoom.value,
        selectedSubject.value,
        inputPassword.value
      )
      console.log(res)
      Swal.fire({
        title: 'Success',
        text: '새로운 방이 생성되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
        heightAuto: false
      }).then(() => {
        window.location.replace('/room')
      })
    } catch {
      Swal.fire({
        title: 'Error!',
        text: '방 생성에 실패하였습니다.',
        icon: 'error',
        confirmButtonText: '확인',
        heightAuto: false
      })
    }
  }
}
</script>

<template>
  <a-modal
    :visible="props.visible"
    title="새로운 방 설정"
    @ok="onClickCreateBtn"
    @cancel="emit('close-modal')"
    width="1000px"
    class="modal-room-create"
  >
    <div class="flex w-full gap-5">
      <div class="w-1/3 h-80 bg-white p-10 rounded-xl">
        <h3 class="text-2xl font-bold mb-8">구성</h3>
        <ul class="flex gap-6 flex-col">
          <li class="flex justify-between items-center">
            <div class="flex">
              <user-outlined class="text-3xl mr-3" />
              <label class="text-2xl">참가자</label>
            </div>

            <a-select
              v-model:value="participantCount"
              size="large"
              :options="SelectParticipantCountOptions"
            >
            </a-select>
          </li>
          <li class="flex justify-between items-center">
            <div class="flex">
              <eye-outlined class="text-3xl mr-3" />
              <h3 class="text-2xl">공개 여부</h3>
            </div>
            <a-switch v-model:checked="checkPublicRoom" size="large"></a-switch>
          </li>
          <li v-show="!checkPublicRoom" class="flex justify-between items-center">
            <div class="flex">
              <lock-outlined class="text-3xl mr-3" />
              <a-input v-model:value="inputPassword" placeholder="비밀번호" />
            </div>
          </li>
        </ul>
      </div>
      <div class="w-2/3">
        <h3 class="text-2xl font-bold bg-white p-5 rounded-xl">주제</h3>
        <ul class="grid grid-cols-4 gap-4 h-full">
          <li
            v-for="subject in subjects"
            :key="subject"
            class="flex items-center justify-center text-center w-auto bg-white p-5 rounded-xl border-4 border-solid border-white hover:border-blue-200 cursor-pointer mr-3"
            :class="{ selected: subject == selectedSubject }"
            @click="() => onSelectedSubject(subject)"
          >
            {{ subject }}
          </li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>

<style lang="scss">
.modal-room-create {
  .ant-modal-body {
    background-color: #f0f0f0;
    min-height: 40vh;
  }
  .selected {
    border-color: #1890ff;
  }
}
</style>
