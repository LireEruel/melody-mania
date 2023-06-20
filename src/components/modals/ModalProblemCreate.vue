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

interface FormState {
  question: string
  is_multiple_choice: boolean
  answers: Array<string>
  hint1: string
  hint2: string
  option1: string
  option2: string
  option3: string
  option4: string
  option5: string
}
const formState = ref<FormState>({
  question: '',
  is_multiple_choice: false,
  answers: [],
  hint1: '',
  hint2: '',
  option1: '',
  option2: '',
  option3: '',
  option4: '',
  option5: ''
})

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
  }
  // {
  //   title: 'Tags',
  //   dataIndex: 'tags',
  //   key: 'tags'
  // }
]
</script>

<template>
  <a-modal :visible="props.visible" title="문제 출제" @cancel="emit('close-modal')" width="1000px">
    <div id="modalBodyProblemCreate" class="flex w-full">
      <div class="w-1/3">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold">음악 선택</h2>
          <button
            @click="openAddMusicModal"
            class="bg-green-500 hover:bg-green-700 text-white font-bold w-10 h-10 rounded-full p-2"
          >
            +
          </button>
        </div>

        <a-table
          :loading="loadingMusics"
          :columns="musicTableColumns"
          :data-source="musicList"
          :pagination="{ pageSize: 5 }"
        >
        </a-table>
      </div>
      <div class="ml-6 w-full">
        <h2 class="text-2xl font-bold">문제 정보</h2>

        <a-form :model="formState" name="basic" :wrapper-col="{ span: 16 }" autocomplete="off">
          <a-form-item
            name="isMultipleChoice"
            :label="isMultipleChoice ? '객관식' : '주관식'"
            class="flex items-center"
          >
            <a-switch v-model:checked="isMultipleChoice"></a-switch>
          </a-form-item>
          <a-form-item
            label="Question"
            name="question"
            :rules="[{ required: true, message: 'Please input question' }]"
          >
            <a-input v-model:value="formState.question" />
          </a-form-item>

          <a-form-item
            v-show="isMultipleChoice"
            label="Hint1"
            name="inputHint1"
            :rules="[{ message: 'Please input hint1' }]"
          >
            <a-input v-model:value="formState.hint1" />
          </a-form-item>

          <a-form-item
            v-show="isMultipleChoice"
            label="Hint2"
            name="inputAnswer"
            :rules="[{ message: 'Please input hint2' }]"
          >
            <a-input v-model:value="formState.hint2" />
          </a-form-item>

          <a-form-item
            v-show="isMultipleChoice"
            label="Option1"
            name="inputAnswer"
            :rules="[{ required: true, message: 'Please input option1' }]"
          >
            <a-input v-model:value="formState.option1" />
          </a-form-item>

          <a-form-item
            v-show="isMultipleChoice"
            label="Option2"
            name="inputAnswer"
            :rules="[{ required: true, message: 'Please input option2' }]"
          >
            <a-input v-model:value="formState.option2" />
          </a-form-item>
          <a-form-item
            v-show="isMultipleChoice"
            label="Option3"
            name="inputAnswer"
            :rules="[{ required: true, message: 'Please input option3' }]"
          >
            <a-input v-model:value="formState.option3" />
          </a-form-item>
          <a-form-item
            v-show="isMultipleChoice"
            label="Option4"
            name="inputAnswer"
            :rules="[{ required: true, message: 'Please input option4' }]"
          >
            <a-input v-model:value="formState.option4" />
          </a-form-item>
          <a-form-item
            v-show="isMultipleChoice"
            label="Option5"
            name="inputAnswer"
            :rules="[{ required: true, message: 'Please input option5' }]"
          >
            <a-input v-model:value="formState.option5" />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-modal>
  <modal-music-add
    :visible="musicAddModalVisible"
    @close-modal="closeModalMusicAdd"
    @uploaded-music="uploadedMusic"
  ></modal-music-add>
</template>

<style lang="scss">
#modalBodyProblemCreate {
  .addMusicModalBtn {
    background-color: #52c41a;
  }
}
</style>
