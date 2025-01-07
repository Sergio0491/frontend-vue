<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent />

    <main class="container mx-auto p-4 flex flex-col flex-grow">
      <Searcher @search="onSearch" />

      <EmailsTable
        :emails="emails"
        :currentPage="currentPage"
        :lastPage="lastPage"
        :isLoading="isLoading"
        @page-change="onPageChange"
        @select-email="showEmailDetails"
      />

      <DescriptionModal
        v-if="selectedEmail"
        :email="selectedEmail"
        :visible="showModal"
        @close="showModal = false"
      />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, onMounted } from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import Searcher from '../components/SearchComponent.vue'
import EmailsTable from '../components/TableComponent.vue'
import DescriptionModal from '../components/DescriptionModal.vue'
import type { Email, ApiResponse } from '../types'

export default defineComponent({
  name: 'EmailSearcher',
  components: {
    HeaderComponent,
    Searcher,
    EmailsTable,
    DescriptionModal
  },
  setup() {
    const API_URL = inject<string>('API_URL', '')

    const emails = ref<Email[]>([])
    const currentPage = ref<number>(1)
    const lastPage = ref<number>(1)
    const searchTerm = ref<string>('')
    const showModal = ref<boolean>(false)
    const selectedEmail = ref<Email | null>(null)
    const isLoading = ref<boolean>(false)

    onMounted(() => {
      fetchEmails()
    })

    const fetchEmails = async (page = 1) => {
      try {
        isLoading.value = true
        const url = new URL(API_URL || '')
        url.searchParams.append('limit', "50")
        url.searchParams.append('page', page.toString())
        if (searchTerm.value) {
          url.searchParams.append('search', searchTerm.value)
        }

        const response = await fetch(url.toString())
        if (!response.ok) {
          throw new Error('Error al obtener correos')
        }

        const data: ApiResponse = await response.json()
        emails.value = data.emails
        currentPage.value = data.page
        lastPage.value = data.pages
      } catch (error) {
        console.error(error)
      } finally {
        isLoading.value = false
      }
    }

    const onSearch = (term: string) => {
      searchTerm.value = term
      currentPage.value = 1
      fetchEmails(1)
    }

    const onPageChange = (page: number) => {
      currentPage.value = page
      fetchEmails(page)
    }

    const showEmailDetails = (email: Email) => {
      selectedEmail.value = email
      showModal.value = true
    }

    return {
      emails,
      currentPage,
      lastPage,
      searchTerm,
      showModal,
      selectedEmail,
      isLoading,
      onSearch,
      onPageChange,
      showEmailDetails,
      fetchEmails
    }
  }
})
</script>

<style scoped>
</style>