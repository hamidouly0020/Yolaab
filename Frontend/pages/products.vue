<template>
  <div />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const router = useRouter()

onMounted(() => {
  // Redirect legacy /products route to /shop
  router.replace('/shop')
})
</script>
