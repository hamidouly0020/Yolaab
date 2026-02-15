<template>
  <div class="min-h-screen bg-white">
    <Navigation />
    <slot />

    <!-- WhatsApp floating button (global) -->
    <a
      href="https://wa.me/221767957899?text=Bonjour%20Yoolab%20!%20J%20ai%20une%20demande."
      target="_blank"
      rel="noopener noreferrer"
      class="fixed right-6 md:bottom-6 bottom-24 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-transform transform hover:scale-105"
      aria-label="Contactez Yoolab sur WhatsApp"
      title="Contactez Yoolab sur WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12 .03C5.37 .03 .02 5.39 .02 12.02c0 2.12 .56 4.17 1.62 6.01L0.02 24l6.25-1.63c1.78 1.1 3.98 1.66 6.1 1.66 6.63 0 12.02-5.4 12.02-12.03 0-1.94-.48-3.8-1.69-5.48zM12.02 21.75c-1.49 0-2.93-.41-4.19-1.17l-.3-.18-3.73.97 1-3.63-.2-.34c-.62-1.01-1.02-2.18-1.02-3.41 0-4.97 4.02-9 9-9 2.41 0 4.68.94 6.38 2.64 1.7 1.7 2.64 3.97 2.64 6.38 0 4.97-4.03 9-9 9zM17.07 14.9c-.22-.11-1.3-.64-1.5-.71-.2-.08-.34-.11-.49.12-.15.24-.6.78-.73.95-.13.18-.27.21-.5.08-.24-.13-1.03-.38-1.91-1.21-.67-.64-1.13-1.41-1.27-1.66-.14-.25-.02-.39.1-.51.11-.12.25-.28.36-.42.12-.14.18-.25.25-.4.07-.16.03-.3-.03-.43-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.41-.14 0-.31-.01-.47-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64 2.36 1.04 2.36.69 2.8.64.44-.05 1.42-.58 1.62-1.14.2-.57.2-1.06.14-1.16-.06-.12-.22-.16-.46-.27z"/>
      </svg>
    </a>
  </div>
</template>

<script setup lang="ts">
</script>
