<!-- src/components/MaterialItem.vue -->
<template>
  <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 transition-all hover:shadow-md">
    
    <!-- Fila principal: Nombre y Favorito -->
    <div class="flex justify-between items-start gap-2">
      <div class="flex items-start gap-3 flex-1">
        <button @click="toggleFavorite(item.id)" class="mt-0.5 text-2xl transition-transform active:scale-75">
          <span v-if="isFavorite(item.id)">⭐</span>
          <span v-else class="grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">⭐</span>
        </button>
        <h3 class="font-medium text-gray-800 leading-tight">{{ item.name }}</h3>
      </div>
    </div>

    <!-- Fila de Colores (Solo si es un cable) -->
    <div v-if="item.hasColors" class="flex flex-wrap gap-2 pl-9">
      <button 
        v-for="color in colors" 
        :key="color.id"
        @click="selectedColor = color.id"
        class="w-8 h-8 rounded-full border-2 transition-transform active:scale-90 flex items-center justify-center shadow-sm"
        :class="selectedColor === color.id ? 'border-primary scale-110' : 'border-gray-200'"
        :style="{ background: color.hex }"
        :title="color.name"
      >
        <svg v-if="selectedColor === color.id" class="w-4 h-4 text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
    </div>

    <!-- Metros (solo cables, solo si ya hay cantidad cargada) -->
    <div v-if="item.hasColors && currentQty > 0" class="pl-9 -mt-1">
      <button
        @click="editMeters"
        class="text-sm text-blue-600 font-medium underline decoration-dotted active:opacity-60"
      >
        📏 {{ currentMeters ? `${currentMeters} m` : 'Agregar metros' }}
      </button>
    </div>

    <!-- Fila de Cantidad (+ / - / editable a mano) -->
    <div class="flex justify-end items-center gap-4 mt-1">
      <button 
        @click="decrement"
        class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 font-bold text-2xl active:bg-gray-200 active:scale-95 transition-all"
        :disabled="currentQty === 0"
        :class="{ 'opacity-50 cursor-not-allowed': currentQty === 0 }"
      >
        −
      </button>
      
      <input
        type="number"
        inputmode="numeric"
        min="0"
        :value="currentQty"
        @focus="$event.target.select()"
        @change="handleManualInput"
        class="w-16 text-center font-bold text-xl text-gray-800 bg-gray-50 rounded-lg py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      >

      <button 
        @click="increment"
        class="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-xl font-bold text-2xl shadow-md active:scale-95 transition-all"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { updateQuantity, getQuantity, getMeters, toggleFavorite, isFavorite } from '../store/store';
import { colors } from '../data/materials';

const props = defineProps({
  item: Object
});

const selectedColor = ref(props.item.hasColors ? colors[0].id : null);

const currentQty = computed(() => getQuantity(props.item.id, selectedColor.value));
const currentMeters = computed(() => props.item.hasColors ? getMeters(props.item.id, selectedColor.value) : null);

// Pide los metros por popup nativo
const askMeters = (defaultVal) => {
  const input = window.prompt('¿Cuántos metros?', defaultVal ?? '');
  if (input === null) return currentMeters.value; // canceló, mantiene lo que había
  const val = parseFloat(input.replace(',', '.'));
  return isNaN(val) ? null : val;
};

const increment = () => {
  const newQty = currentQty.value + 1;
  if (props.item.hasColors) {
    const meters = askMeters(currentMeters.value);
    updateQuantity(props.item, newQty, selectedColor.value, meters);
  } else {
    updateQuantity(props.item, newQty, selectedColor.value);
  }
};

const decrement = () => {
  updateQuantity(props.item, currentQty.value - 1, selectedColor.value);
};

const editMeters = () => {
  const meters = askMeters(currentMeters.value);
  updateQuantity(props.item, currentQty.value, selectedColor.value, meters);
};

const handleManualInput = (event) => {
  let value = parseInt(event.target.value, 10);
  if (isNaN(value) || value < 0) value = 0;

  if (props.item.hasColors && value > 0) {
    const meters = askMeters(currentMeters.value);
    updateQuantity(props.item, value, selectedColor.value, meters);
  } else {
    updateQuantity(props.item, value, selectedColor.value);
  }
  event.target.value = value;
};
</script>