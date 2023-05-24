<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue/lib/vc-select/Select'
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
  <a-modal :visible="props.visible" title="새로운 방 설정" @cancel="emit('close-modal')">
    <div>
      <div>
        <h3>구성</h3>
        <div>
          <label>참가자</label>
          <a-select v-model:value="participantCount" :options="SelectParticipantCountOptions">
          </a-select>
        </div>
        <div>
          <h3>공개 여부</h3>
          <a-switch v-model:checked="checkPublicRoom"></a-switch>
        </div>
      </div>
      <div>
        <h3>주제</h3>
        <ul>
          <li v-for="subject in subjects" :key="subject">
            {{ subject }}
          </li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>
