// src/store/store.js
import { ref, watch } from 'vue';
import { materialCategories, colors } from '../data/materials';

// 1. Estado reactivo cargado desde LocalStorage (¡Restauración automática!)
export const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
export const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || []);
export const observations = ref(localStorage.getItem('observations') || '');
export const toastMessage = ref('');
export const withPromptMode = ref(false); // Falso por defecto (modo cliente)

// 2. Watchers para guardar automáticamente cada vez que haya un cambio
watch(cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
}, { deep: true });

watch(favorites, (newFavs) => {
  localStorage.setItem('favorites', JSON.stringify(newFavs));
}, { deep: true });

watch(observations, (newObs) => {
  localStorage.setItem('observations', newObs);
});

// 3. Funciones del Carrito
export const updateQuantity = (item, quantity, color = null, meters = null) => {
  const cartItemId = color ? `${item.id}-${color}` : item.id;
  const existing = cart.value.find(i => i.cartId === cartItemId);

  if (quantity <= 0) {
    cart.value = cart.value.filter(i => i.cartId !== cartItemId);
  } else if (existing) {
    existing.quantity = quantity;
    if (meters !== null) existing.meters = meters;
  } else {
    cart.value.push({
      cartId: cartItemId,
      id: item.id,
      name: item.name,
      quantity,
      color,
      hasColors: item.hasColors,
      meters
    });
  }
};

export const getQuantity = (itemId, color = null) => {
  const cartItemId = color ? `${itemId}-${color}` : itemId;
  const item = cart.value.find(i => i.cartId === cartItemId);
  return item ? item.quantity : 0;
};

export const getMeters = (itemId, color = null) => {
  const cartItemId = color ? `${itemId}-${color}` : itemId;
  const item = cart.value.find(i => i.cartId === cartItemId);
  return item ? item.meters : null;
};

// 4. Funciones de Favoritos
export const toggleFavorite = (itemId) => {
  const index = favorites.value.indexOf(itemId);
  if (index === -1) {
    favorites.value.push(itemId);
    showToast('⭐ Agregado a favoritos');
  } else {
    favorites.value.splice(index, 1);
    showToast('❌ Eliminado de favoritos');
  }
};

export const isFavorite = (itemId) => {
  return favorites.value.includes(itemId);
};

// 5. Sistema de Notificaciones (Toasts)
let toastTimeout;
export const showToast = (message) => {
  toastMessage.value = message;
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastMessage.value = '';
  }, 2000);
};

export const clearCart = () => {
  if (confirm('¿Seguro que quieres vaciar toda la lista?')) {
    cart.value = [];
    showToast('✅ Lista vaciada');
  }
};

export const resetAll = () => {
  if (confirm('¿Seguro que querés reiniciar todo? Se borrará la lista y las observaciones.')) {
    cart.value = [];
    observations.value = '';
    showToast('🔄 Todo reiniciado');
  }
};

// 6. Generación y copiado del resumen
const getColorName = (colorId) => {
  const c = colors.find(c => c.id === colorId);
  return c ? c.name : '';
};

export const totalItemsCount = () => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
};

export const generateSummaryText = () => {
  const lines = [];

  // SI EL MODO PROMPT ESTÁ ACTIVO, INYECTAMOS EL TEXTO PARA LA IA ARRIBA DE TODO
  if (withPromptMode.value) {
    lines.push(`Actúa como un electricista experto y auditor de obras residenciales. A continuación, te proporcionaré una lista de materiales seleccionados para una reparación o instalación eléctrica doméstica. Esta lista podría estar incompleta.`);
    lines.push(`Tu único objetivo es analizar los materiales provistos, deducir qué trabajo se está haciendo y generar una lista de elementos complementarios que el electricista podría estar olvidando para refrescar su memoria.`);
    lines.push(`\nRESTRICCIONES ESTRICTAS: Devuelve ÚNICAMENTE la lista de elementos sugeridos. No agregues introducciones, saludos, conclusiones ni consejos de seguridad. Sé breve (elemento y una línea corta de por qué podría faltar).`);
    lines.push(`\nLista de materiales base:`);
    lines.push(`====================================\n`);
  }

  // Recorremos las categorías y agregamos los materiales correspondientes
  materialCategories.forEach(cat => {
    const itemsInCat = cart.value.filter(ci =>
      cat.items.some(i => i.id === ci.id)
    );
    if (itemsInCat.length === 0) return;

    lines.push(cat.name);
    itemsInCat.forEach(ci => {
      // Buscamos el ítem original para saber si tiene 'hasMms'
      const originalItem = cat.items.find(i => i.id === ci.id);
      
      const colorText = ci.color ? ` ${getColorName(ci.color)}` : '';
      
      // Determinamos el sufijo correcto (mm para tornillos, m para cables)
      let measurementText = '';
      if (ci.meters) {
        const suffix = originalItem?.hasMms ? 'mm' : 'm';
        measurementText = ` - ${ci.meters} ${suffix}`;
      }

      lines.push(`   • ${ci.name}${colorText} x${ci.quantity}${measurementText}`);
    });
    lines.push('');
  });

  if (observations.value.trim()) {
    lines.push('Observaciones');
    observations.value
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 0)
      .forEach(l => lines.push(`   • ${l}`));
    lines.push('');
  }

  lines.push('------------------------');
  lines.push('');
  lines.push(`Total de artículos: ${totalItemsCount()}`);

  return lines.join('\n');
};

export const copySummary = async () => {
  const text = generateSummaryText();
  try {
    await navigator.clipboard.writeText(text);
    showToast(withPromptMode.value ? '🤖 Lista con Prompt copiada' : '📋 Lista copiada');
  } catch (err) {
    showToast('❌ No se pudo copiar');
  }
};

