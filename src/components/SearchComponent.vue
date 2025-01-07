<template>
  <div class="flex space-x-2 my-4">
    <input
      v-model="searchTerm"
      @keyup.enter="onSearch"
      type="text"
      placeholder="Buscar correos..."
      class="border border-gray-300 rounded px-3 py-2 w-full"
    />
    <button
      class="bg-blue-600 text-white px-4 py-2 rounded"
      @click="onSearch"
    >
      Buscar
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'SearcherComponent',
  emits: ['search'],
  setup(_, { emit }) {
    const searchTerm = ref('')

    const onSearch = () => {
      emit('search', searchTerm.value)
    }

    return {
      searchTerm,
      onSearch
    }
  }
})
</script>