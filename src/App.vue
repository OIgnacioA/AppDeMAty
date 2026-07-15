<!-- src/App.vue -->
<template>
  <div class="min-h-screen bg-gray-50 pb-32 font-sans text-gray-800">
    
    <!-- Header Fijo -->
     <!-- Header Fijo -->
    <header class="bg-primary text-white pt-6 pb-4 px-4 shadow-md sticky top-0 z-40">
      <div class="relative max-w-md mx-auto mb-4">
        <h1 class="text-2xl font-bold text-center">Materiales Eléctricos</h1>

        <!-- Botón Refrescar -->
        <button
          @click="resetAll"
          title="Reiniciar todo"
          class="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 active:bg-white/30 active:scale-90 transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <!-- Buscador -->
      <div class="relative max-w-md mx-auto">
        <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Buscar térmica, cable, caja..."
          class="w-full bg-white text-gray-800 rounded-full py-3 pl-10 pr-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        >
        <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-4 flex items-center text-gray-400 font-bold">
          ✕
        </button>
      </div>
    </header>
    <main class="p-4 max-w-md mx-auto flex flex-col gap-4 mt-2">
      
      <!-- Si no hay resultados -->
      <div v-if="filteredCategories.length === 0" class="text-center text-gray-500 mt-10">
        No se encontraron materiales con "{{ searchQuery }}"
      </div>

      <!-- Iterar sobre las categorías -->
      <div 
        v-for="cat in filteredCategories" 
        :key="cat.id" 
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <!-- Título de la Categoría (Botón para abrir/cerrar) -->
        <button 
          @click="toggleCategory(cat.id)"
          class="w-full p-4 flex justify-between items-center bg-gray-50 active:bg-gray-100 transition-colors"
        >
          <div class="flex items-center gap-2">
            <h2 class="font-bold text-lg text-gray-800">{{ cat.name }}</h2>
            <span v-if="getCategoryCount(cat.id) > 0" class="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {{ getCategoryCount(cat.id) }}
            </span>
          </div>
          
          <svg 
            class="w-5 h-5 text-gray-500 transition-transform duration-300"
            :class="{ 'rotate-180': openCategories.includes(cat.id) }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>

        <!-- Lista de Items (Acordeón) -->
        <div v-show="openCategories.includes(cat.id)" class="p-4 flex flex-col gap-4 bg-gray-50/50">
          <MaterialItem 
            v-for="item in cat.items" 
            :key="item.id" 
            :item="item" 
          />
        </div>
      </div>

      <!-- Observaciones -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-2">
        <h2 class="font-bold text-lg text-gray-800">Observaciones</h2>
        <textarea
          v-model="observations"
          rows="3"
          placeholder="Ej: Llevar tornillos inox. (una línea por observación)"
          class="w-full bg-gray-50 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        ></textarea>
      </div>

    </main>

    <!-- Barra inferior fija: total + copiar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div class="max-w-md mx-auto p-4 flex items-center justify-between gap-4">
        <span class="font-bold text-gray-700">
          Total: {{ totalItems }} artículo{{ totalItems === 1 ? '' : 's' }}
        </span>
        <button
          @click="copySummary"
          :disabled="totalItems === 0"
          class="bg-primary text-white font-bold px-5 py-3 rounded-xl shadow-md active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          📋 Copiar lista
        </button>
      </div>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MaterialItem from './components/MaterialItem.vue';
import Toast from './components/Toast.vue';
import { materialCategories } from './data/materials';
import { cart, observations, copySummary, resetAll } from './store/store';

// Estado del buscador
const searchQuery = ref('');

// Estado de los acordeones
const openCategories = ref([materialCategories[0].id, materialCategories[1].id]);

const toggleCategory = (id) => {
  const index = openCategories.value.indexOf(id);
  if (index === -1) {
    openCategories.value.push(id);
  } else {
    openCategories.value.splice(index, 1);
  }
};

const filteredCategories = computed(() => {
  if (!searchQuery.value) return materialCategories;
  
  const query = searchQuery.value.toLowerCase();
  
  return materialCategories.map(cat => {
    const filteredItems = cat.items.filter(item => item.name.toLowerCase().includes(query));
    
    if (filteredItems.length > 0) {
      if (!openCategories.value.includes(cat.id)) openCategories.value.push(cat.id);
      return { ...cat, items: filteredItems };
    }
    return null;
  }).filter(cat => cat !== null);
});

const getCategoryCount = (categoryId) => {
  const category = materialCategories.find(c => c.id === categoryId);
  if (!category) return 0;
  
  const itemIds = category.items.map(i => i.id);
  
  return cart.value
    .filter(cartItem => itemIds.includes(cartItem.id))
    .reduce((total, cartItem) => total + cartItem.quantity, 0);
};

// Total de artículos para la barra inferior
const totalItems = computed(() => cart.value.reduce((t, i) => t + i.quantity, 0));
</script>

<style>
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>