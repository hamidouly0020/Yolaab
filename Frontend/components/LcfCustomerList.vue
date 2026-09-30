<template>
  <div class="space-y-6">
    <!-- List Section -->
    <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <Users :size="20" class="text-blue-600" />
          Clients fidèles ({{ customers.length }})
        </h3>
        <button
          @click="showForm = !showForm"
          class="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-all flex items-center gap-2 text-sm"
        >
          <Plus :size="18" />
          Ajouter
        </button>
      </div>

      <!-- Add Form -->
      <div v-if="showForm" class="bg-blue-50 p-6 rounded-xl mb-6 border-2 border-blue-200">
        <h4 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Plus :size="18" class="text-blue-600" />
          Ajouter un client fidèle
        </h4>

        <form @submit.prevent="handleAddCustomer" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              v-model="newCustomer.nom"
              type="text"
              placeholder="Nom"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
            <input
              v-model="newCustomer.telephone"
              type="tel"
              placeholder="Téléphone"
              class="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <textarea
            v-model="newCustomer.notes"
            placeholder="Notes (optionnelles)"
            rows="3"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
          />

          <div v-if="formError" class="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-sm">
            {{ formError }}
          </div>

          <div class="flex gap-3">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all font-bold disabled:opacity-50"
            >
              <span v-if="!isSubmitting">Ajouter</span>
              <span v-else>Ajout en cours...</span>
            </button>
            <button
              type="button"
              @click="resetForm"
              class="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all font-bold"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>

      <!-- Customers List -->
      <div v-if="customers.length === 0" class="text-center py-8 text-gray-500">
        <Users :size="32" class="mx-auto mb-2 text-gray-300" />
        <p>Aucun client fidèle enregistré</p>
      </div>

      <div v-else class="grid gap-4">
        <div
          v-for="customer in customers"
          :key="customer.id"
          class="border-2 border-blue-100 rounded-xl p-4 hover:shadow-lg transition-all"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <h4 class="font-semibold text-gray-800">{{ customer.nom }}</h4>
              <p class="text-sm text-gray-600">📞 {{ customer.telephone }}</p>
              <p v-if="customer.notes" class="text-sm text-gray-600 mt-2">📝 {{ customer.notes }}</p>
            </div>
            <button
              @click="deleteCustomer(customer.id)"
              class="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all"
            >
              <Trash2 :size="18" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Users, Plus, Trash2 } from 'lucide-vue-next'

interface Customer {
  id: string
  nom: string
  telephone: string
  notes?: string
}

const props = defineProps<{
  apiUrl: string
}>()

const customers = ref<Customer[]>([])
const showForm = ref(false)
const isSubmitting = ref(false)
const formError = ref('')

const newCustomer = ref({
  nom: '',
  telephone: '',
  notes: '',
})

const resetForm = () => {
  newCustomer.value = {
    nom: '',
    telephone: '',
    notes: '',
  }
  showForm.value = false
  formError.value = ''
}

const handleAddCustomer = async () => {
  formError.value = ''
  isSubmitting.value = true

  try {
    const token = sessionStorage.getItem('lcf_token')
    if (!token) {
      formError.value = 'Session expirée. Veuillez vous authentifier.'
      return
    }

    // TODO: Appel API backend pour ajouter le client
    const newCust: Customer = {
      id: Date.now().toString(),
      nom: newCustomer.value.nom,
      telephone: newCustomer.value.telephone,
      notes: newCustomer.value.notes || undefined,
    }

    customers.value.push(newCust)
    resetForm()
    alert('✅ Client fidèle ajouté avec succès')
  } catch (err: any) {
    formError.value = 'Erreur lors de l\'ajout'
  } finally {
    isSubmitting.value = false
  }
}

const deleteCustomer = async (id: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) return

  try {
    const token = sessionStorage.getItem('lcf_token')
    if (!token) {
      alert('Session expirée.')
      return
    }

    // TODO: Appel API backend pour supprimer le client
    customers.value = customers.value.filter(c => c.id !== id)
    alert('✅ Client supprimé')
  } catch (err: any) {
    alert('Erreur lors de la suppression')
  }
}

const loadCustomers = async () => {
  try {
    const token = sessionStorage.getItem('lcf_token')
    if (!token) return

    // TODO: Appel API backend pour charger les clients
    // Les clients seront chargés quand le backend sera prêt
  } catch (err) {
    console.error('Erreur de chargement des clients:', err)
  }
}

onMounted(loadCustomers)
</script>

