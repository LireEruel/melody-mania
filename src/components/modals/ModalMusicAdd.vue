<script setup lang="ts">
import { addMusic } from '@/api/music/api'
import secrets from '@/secrets'
import { ref } from 'vue'
const emit = defineEmits(['close-modal'])
const props = defineProps<{
  visible: boolean
}>()
const cloudName = secrets.cloudinary.cloudName
const uploadPreset = secrets.cloudinary.uploadPreset

const formState = ref<FormState>({
  musicName: '',
  singer: '',
  tags: [] as Array<string>
})

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset
  },
  async (error: any, result: any) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info)
      await addMusic(
        formState.value.musicName,
        result.info.secure_url,
        formState.value.singer,
        formState.value.tags
      )
      //   document
      //     .getElementById("uploadedimage")
      //     .setAttribute("src", result.info.secure_url);
    }
  }
)

const open = () => {
  myWidget.open()
}

interface FormState {
  musicName: string
  singer: string
  tags: Array<string>
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
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item
          label="Music Name"
          name="musicName"
          :rules="[{ required: true, message: 'Please input music name!' }]"
        >
          <a-input v-model:value="formState.musicName" />
        </a-form-item>

        <a-form-item
          label="Singer"
          name="singer"
          :rules="[{ message: 'Please input your password!' }]"
        >
          <a-input v-model:value="formState.singer" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button
            :disabled="formState.musicName === ''"
            v-on:click="open"
            type="primary"
            id="upload_widget"
            class="cloudinary-button"
            >Upload files</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>
