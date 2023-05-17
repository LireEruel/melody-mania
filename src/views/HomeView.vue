<script setup lang="ts">
import { ref } from 'vue'
import { sendMessage } from '@/socket/socket'
import { cmd } from '@/types/socket'

const inputText = ref('')
const onClickSendBtn = () => {
  sendMessage(cmd.req.connect, inputText.value)
}
</script>

<template>
  <main>
    <input type="text" v-model="inputText" />
    <button @click="onClickSendBtn()">Connect</button>
  </main>
</template>
