<script setup lang="ts">
import secrets from '@/secrets'
import { ref } from 'vue'

const emit = defineEmits(['close-modal'])
const props = defineProps<{
  visible: boolean
}>()
const isMultipleChoice = ref(false)
const fileList = ref([])
const cloudName = secrets.cloudinary.cloudName
const uploadPreset = secrets.cloudinary.uploadPreset

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

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}
const handleChange = (info: FileInfo) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (info.file.status === 'done') {
    console.log(`${info.file.name} file uploaded successfully`)
  } else if (info.file.status === 'error') {
    console.log(`${info.file.name} file upload failed.`)
  }
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
      <a-upload
        v-model:file-list="fileList"
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        @change="handleChange"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          Click to Upload
        </a-button>
      </a-upload>
      <a-table :columns="musicTableColumns"> </a-table>
    </div>
  </a-modal>
</template>
