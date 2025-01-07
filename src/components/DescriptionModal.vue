<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div class="bg-white rounded shadow-lg p-4 w-11/12 max-w-2xl max-h-full overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">Detalles del Correo</h2>
          <button @click="close" class="text-gray-500">&times;</button>
        </div>
        <div class="mb-2">
          <p><strong>Remitente:</strong> {{ email.from }}</p>
          <p><strong>Asunto:</strong> {{ email.subject }}</p>
          <p><strong>Fecha:</strong> {{ email.date }}</p>
        </div>
        <div class="border-t pt-2">
          <p class="whitespace-pre-line">
            {{ email.body }}
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Email } from '../types';

export default defineComponent({
  name: 'DescriptionModal',
  props: {
    email: {
      type: Object as PropType<Email>,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(_, { emit }) {
    const close = () => {
      emit('close')
    }
    return { close }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>