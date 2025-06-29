# Carrito de Compras

Este es un sistema completo de carrito de compras para React con TypeScript que incluye:

## Características

- ✅ Icono de carrito en la esquina superior derecha
- ✅ Contador de productos en el icono
- ✅ Drawer lateral que se abre al hacer clic
- ✅ Agregar productos al carrito
- ✅ Modificar cantidades (+ y -)
- ✅ Eliminar productos individuales
- ✅ Vaciar todo el carrito
- ✅ Cálculo automático del total
- ✅ Persistencia del carrito (no se borra al recargar)
- ✅ Diseño responsive y moderno

## Componentes

### 1. CartProvider
Contexto que maneja el estado global del carrito.

### 2. CartIcon
Icono del carrito que se muestra en el header con contador de productos.

### 3. CartDrawer
Panel lateral que se abre al hacer clic en el icono del carrito.

### 4. AddToCartButton
Botón para agregar productos al carrito.

### 5. ProductCard
Tarjeta de producto de ejemplo con botón de agregar al carrito.

## Cómo usar

### 1. Envolver la aplicación con CartProvider

```tsx
import { CartProvider } from '@/components/carrito_compras';

function App() {
  return (
    <CartProvider>
      {/* Tu aplicación aquí */}
    </CartProvider>
  );
}
```

### 2. Agregar el CartIcon al Header

```tsx
import { CartIcon } from '@/components/carrito_compras';

function Header() {
  return (
    <header>
      {/* Otros elementos del header */}
      <CartIcon />
    </header>
  );
}
```

### 3. Agregar el CartDrawer

```tsx
import { CartDrawer } from '@/components/carrito_compras';

function App() {
  return (
    <CartProvider>
      {/* Tu aplicación */}
      <CartDrawer />
    </CartProvider>
  );
}
```

### 4. Usar AddToCartButton en productos

```tsx
import { AddToCartButton } from '@/components/carrito_compras';

function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
```

### 5. Usar el hook useCart para funcionalidades avanzadas

```tsx
import { useCart } from '@/components/carrito_compras';

function MyComponent() {
  const { addItem, removeItem, getTotalItems, getTotalPrice } = useCart();
  
  // Usar las funciones según necesites
}
```

## Estructura de Producto

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}
```

## Ejemplo Completo

Ver `CartExample.tsx` para un ejemplo completo de implementación.

## Integración con el Header existente

El carrito ya está integrado en el Header. Solo necesitas:

1. Asegurarte de que tu aplicación esté envuelta en `CartProvider`
2. Agregar `<CartDrawer />` en tu componente principal
3. Usar `AddToCartButton` en tus productos

¡Listo! El carrito funcionará automáticamente. 