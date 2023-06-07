<script setup lang="ts">
import secrets from '@/secrets'
import { ref } from 'vue'
const emit = defineEmits(['close-modal'])
const props = defineProps<{
  visible: boolean
}>()
const isMultipleChoice = ref(false)
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

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset
  },
  (error: any, result: any) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info)
      //   document
      //     .getElementById("uploadedimage")
      //     .setAttribute("src", result.info.secure_url);
    }
  }
)

const open = () => {
  myWidget.open()
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
      <button v-on:click="open" id="upload_widget" class="cloudinary-button">Upload files</button>
      <!-- <a-upload
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
      </a-upload> -->
      <a-table :columns="musicTableColumns"> </a-table>
    </div>
  </a-modal>
</template>
