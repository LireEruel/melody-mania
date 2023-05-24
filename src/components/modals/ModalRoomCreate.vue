<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue/lib/vc-select/Select'
import { UserOutlined, EyeOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const participantCount = ref(5)
const checkPublicRoom = ref(true)
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

const emit = defineEmits(['close-modal'])
const subjects = ['K-POP', 'J-POP', '게임', '영화', '만화']
</script>

<template>
  <a-modal
    :visible="props.visible"
    title="새로운 방 설정"
    @cancel="emit('close-modal')"
    width="1000px"
    class="modal-room-create"
  >
    <div class="flex w-full gap-5">
      <div class="w-1/3 bg-white p-10 rounded-xl">
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
        </ul>
      </div>
      <div class="w-2/3">
        <h3 class="text-2xl font-bold bg-white p-5 rounded-xl">주제</h3>
        <ul class="grid grid-cols-4 gap-4 h-full">
          <li
            v-for="subject in subjects"
            :key="subject"
            class="flex items-center justify-center text-center w-auto bg-white p-5 rounded-xl border-3 border-solid hover:border-blue-500 cursor-pointer mr-3"
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
}
</style>
