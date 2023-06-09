<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['close-modal'])
const props = defineProps<{
  visible: boolean
}>()
const isMultipleChoice = ref(false)
const musicAddModalVisible = ref(false)

const musicTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Singer',
    dataIndex: 'singer',
    key: 'singer'
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags'
  }
]

const openAddMusicModal = () => {
  musicAddModalVisible.value = true
}

const closeModalMusicAdd = () => {
  musicAddModalVisible.value = false
}
</script>

<template>
  <a-modal
    :visible="props.visible"
    title="문제 출제"
    @cancel="emit('close-modal')"
    width="1000px"
    class="modal-room-create"
  >
    <div>
      <label>{{ isMultipleChoice ? '객관식' : '주관식' }}</label>
      <a-switch v-model:checked="isMultipleChoice"></a-switch>
    </div>
    <div>
      <p>음악 선택</p>
      <a-button @click="openAddMusicModal">음악 추가</a-button>
      <a-table :columns="musicTableColumns"> </a-table>
    </div>
  </a-modal>
  <modal-music-add
    :visible="musicAddModalVisible"
    @close-modal="closeModalMusicAdd"
  ></modal-music-add>
</template>
