<script setup lang="ts">
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close-modal'])
</script>

<template>
  <a-modal :visible="props.visible" title="Basic Modal" @cancel="emit('close-modal')">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>
