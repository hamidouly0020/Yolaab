<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
  // Redirect legacy /reservations path to singular /reservation
  router.replace('/reservation')
})
</script>
