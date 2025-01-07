<template>
  <div>
    <div v-if="isLoading" class="flex items-center justify-center py-4">
      <div class="text-blue-600 font-semibold">Cargando...</div>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2 text-left">Remitente</th>
            <th class="p-2 text-left">Asunto</th>
            <th class="p-2 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="email in emails"
            :key="email.message_id"
            @click="onRowClick(email)"
            class="cursor-pointer hover:bg-gray-100"
          >
            <td class="p-2">{{ email.from }}</td>
            <td class="p-2">{{ email.subject }}</td>
            <td class="p-2">{{ email.date }}</td>
          </tr>
        </tbody>
      </table>

      <div class="flex flex-wrap items-center justify-center space-x-4 mt-4">
        <button
          class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="onPrevPage"
        >
          Anterior
        </button>

        <span>Página {{ currentPage }} de {{ lastPage }}</span>

        <div class="flex items-center space-x-2">
          <input
            type="number"
            class="border border-gray-300 rounded w-16 text-center"
            :min="1"
            :max="lastPage"
            v-model.number="desiredPage"
          />
          <button
            class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            :disabled="desiredPage < 1 || desiredPage > lastPage || desiredPage === currentPage"
            @click="jumpToPage"
          >
            Ir
          </button>
        </div>

        <button
          class="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          :disabled="currentPage === lastPage"
          @click="onNextPage"
        >
          Siguiente
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue'
import type { Email } from '../types'

export default defineComponent({
  name: 'EmailsTable',
  props: {
    emails: {
      type: Array as PropType<Email[]>,
      default: () => []
    },
    currentPage: {
      type: Number,
      default: 1
    },
    lastPage: {
      type: Number,
      default: 1
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['page-change', 'select-email'],
  setup(props, { emit }) {
    const desiredPage = ref<number>(props.currentPage)

    const onPrevPage = () => {
      if (props.currentPage > 1) {
        emit('page-change', props.currentPage - 1)
      }
    }

    const onNextPage = () => {
      if (props.currentPage < props.lastPage) {
        emit('page-change', props.currentPage + 1)
      }
    }

    const jumpToPage = () => {
      emit('page-change', desiredPage.value)
    }

    const onRowClick = (email: Email) => {
      emit('select-email', email)
    }

    return {
      desiredPage,
      onPrevPage,
      onNextPage,
      jumpToPage,
      onRowClick
    }
  }
})
</script>