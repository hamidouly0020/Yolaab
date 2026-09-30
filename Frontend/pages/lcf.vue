<template>
  <NuxtLayout>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <p class="text-gray-600 mb-4">La section LCF a été déplacée.</p>
        <NuxtLink to="/admin" class="text-blue-600 hover:underline font-semibold">
          Accédez à l'admin → Onglet LCF
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// This page redirects to /admin where LCF is integrated as a tab
// No logic needed here
</script>
