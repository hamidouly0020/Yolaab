<template>
  <div class="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
    <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
      <Lock :size="20" class="text-blue-600" />
      Authentification LCF
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Code d'accès</label>
        <input
          v-model="code"
          type="password"
          placeholder="Entrez le code"
          class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
          :disabled="isLoading"
        />
      </div>

      <div v-if="error" class="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded text-sm">
        {{ error }}
      </div>

      <button
        type="submit"
        :disabled="isLoading || !code"
        class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="!isLoading">Valider</span>
        <span v-else>Vérification...</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Lock } from 'lucide-vue-next';

const props = defineProps<{
  apiUrl: string;
}>();

const emit = defineEmits<{
  success: [token: string, expiresIn: string];
}>();

const code = ref('');
const isLoading = ref(false);
const error = ref('');

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    const response = await $fetch(`${props.apiUrl}/lcf/authenticate`, {
      method: 'POST',
      body: { code: code.value },
    });

    if (response && response.token) {
      sessionStorage.setItem('lcf_token', response.token);
      emit('success', response.token, response.expiresIn);
      code.value = '';
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Code d\'accès invalide';
  } finally {
    isLoading.value = false;
  }
};
</script>
