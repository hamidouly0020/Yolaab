<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
  // Redirect legacy /realisations route to /realisation
  router.replace('/realisation')
})
</script>
