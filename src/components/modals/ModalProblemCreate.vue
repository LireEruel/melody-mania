<script setup lang="ts">
import { getMusicList } from '@/api/music/api'
import type { Music } from '@/types/music'
import { onMounted, ref } from 'vue'
import ModalMusicAdd from './ModalMusicAdd.vue'
const emit = defineEmits(['close-modal'])
const props = defineProps<{
  visible: boolean
}>()
const musicList = ref([] as Array<Music>)
const isMultipleChoice = ref(false)
const musicAddModalVisible = ref(false)
const on_loading_musics = ref(false)

const loadingMusics = async () => {
  try {
    on_loading_musics.value = true
    const res = await getMusicList()
    if (res) {
      musicList.value = res
      console.log(res)
    }
  } catch (e) {
    console.error(e)
  } finally {
    on_loading_musics.value = false
  }
}

const openAddMusicModal = () => {
  musicAddModalVisible.value = true
}

const closeModalMusicAdd = () => {
  musicAddModalVisible.value = false
}

const uploadedMusic = async () => {
  await loadingMusics()
}

onMounted(async () => {
  await loadingMusics()
})

const musicTableColumns = [
  {
    title: 'Name',
    dataIndex: 'music_name',
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
      <a-table :columns="musicTableColumns" :data-source="musicList"> </a-table>
    </div>
  </a-modal>
  <modal-music-add
    :visible="musicAddModalVisible"
    @close-modal="closeModalMusicAdd"
    @uploaded-music="uploadedMusic"
  ></modal-music-add>
</template>
