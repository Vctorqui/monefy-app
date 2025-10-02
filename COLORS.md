# Paleta de Colores Personalizada

## 🎨 Tu Paleta de Colores

Tu aplicación ahora usa un diseño **completamente negro** con **Sherwood Green** para acentos brillantes. Aquí tienes todos los colores disponibles:

### Colores Principales - Sherwood Green

```css
'sherwood-green': {
  '50': '#b8ffe8',   /* Verde muy claro - badges, acentos suaves */
  '100': '#00f9cb',  /* Verde claro brillante - acentos */
  '200': '#00d7af',  /* Verde claro - botones primarios */
  '300': '#00b997',  /* Verde medio claro */
  '400': '#009e80',  /* Verde medio */
  '500': '#00856c',  /* Verde principal - botones, enlaces */
  '600': '#006e58',  /* Verde medio oscuro */
  '700': '#005846',  /* Verde oscuro */
  '800': '#004335',  /* Verde muy oscuro */
  '900': '#00271e',  /* Verde casi negro */
  '950': '#00150f',  /* Verde negro puro */
}
```

### Colores Neutros - Para Fondos y Texto

```css
'neutral': {
  '50': '#f8f9fa',   /* Fondo suave */
  '100': '#f1f3f4',  /* Fondos secundarios */
  '200': '#e8eaed',  /* Bordes sutiles */
  '300': '#dadce0',  /* Bordes medios */
  '400': '#bdc1c6',  /* Texto deshabilitado */
  '500': '#9aa0a6',  /* Texto secundario */
  '600': '#80868b',  /* Texto medio */
  '700': '#5f6368',  /* Texto principal */
  '800': '#3c4043',  /* Fondos oscuros */
  '900': '#202124',  /* Texto principal oscuro */
  '950': '#171717',  /* Fondo oscuro */
}
```

## 🖤 Diseño Negro Completo

Tu aplicación ahora tiene un diseño completamente negro:

### **Elementos Negros:**
- **Fondo principal**: Negro oscuro (`#171717`)
- **Cards**: Negro oscuro (`#171717`) / Negro puro (`#000000` en modo oscuro)
- **Sidebar**: Negro puro (`#000000`)
- **Header**: Negro (heredado del fondo)
- **Popovers**: Negro oscuro (`#171717`)

### **Elementos Claros:**
- **Texto principal**: Blanco/crema (`#f8f9fa`)
- **Texto secundario**: Gris claro (`#9aa0a6`)
- **Bordes**: Grises sutiles (`#3c4043`)

### **Acentos Verdes:**
- **Botones primarios**: Sherwood Green (`#00856c` / `#00d7af`)
- **Enlaces**: Sherwood Green brillante
- **Iconos**: Sherwood Green para destacar

## 🚀 Cómo Usar los Colores

### En Componentes React

```tsx
// Fondos negros (automático con bg-background)
<div className="bg-background"> // Negro automático
<div className="bg-card">       // Cards negras

// Texto claro sobre fondo negro
<h1 className="text-foreground">     // Blanco/crema
<p className="text-card-foreground"> // Blanco/crema para cards

// Texto secundario
<p className="text-neutral-400">     // Gris claro
<p className="text-neutral-500">     // Gris medio

// Bordes sutiles
<div className="border-neutral-800"> // Gris oscuro
<div className="border-neutral-700"> // Gris medio

// Botones primarios con Sherwood Green
<button className="bg-sherwood-green-500 text-white hover:bg-sherwood-green-600">
<button className="bg-sherwood-green-200 text-sherwood-green-950 hover:bg-sherwood-green-100">

// Badges y acentos brillantes
<span className="bg-sherwood-green-100 text-sherwood-green-950">
<span className="bg-sherwood-green-50 text-sherwood-green-800">
```

### En CSS Personalizado

```css
.mi-clase {
  background-color: theme('colors.black.100');
  color: theme('colors.black.900');
  border: 1px solid theme('colors.black.200');
}
```

## 🎯 Casos de Uso Recomendados

### **Sherwood Green - Para Acentos**

#### **sherwood-green-50** (`#b8ffe8`) - Verde muy claro
- Badges de estado
- Acentos suaves
- Fondos de notificaciones positivas

#### **sherwood-green-100** (`#00f9cb`) - Verde claro brillante
- Acentos brillantes
- Estados activos
- Elementos destacados

#### **sherwood-green-200** (`#00d7af`) - Verde claro
- Botones primarios (modo oscuro)
- Enlaces importantes
- Iconos de acción

#### **sherwood-green-500** (`#00856c`) - Verde principal
- Botones primarios (modo claro)
- Enlaces importantes
- Elementos de navegación

### **Neutral - Para Fondos y Texto**

#### **neutral-50** (`#f8f9fa`) - Fondo suave
- Fondos de tarjetas
- Fondos de secciones
- Estados hover suaves

#### **neutral-100** (`#f1f3f4`) - Fondo secundario
- Fondos de inputs
- Estados disabled
- Separadores sutiles

#### **neutral-200** (`#e8eaed`) - Bordes sutiles
- Bordes de tarjetas
- Bordes de inputs
- Líneas divisorias

#### **neutral-600** (`#80868b`) - Texto secundario
- Texto secundario
- Iconos secundarios
- Placeholders

#### **neutral-900** (`#202124`) - Texto principal
- Texto principal
- Títulos
- Contenido importante

## 🌙 Modo Oscuro

El modo oscuro está configurado automáticamente usando los mismos colores pero invertidos:

- **Fondo**: `black-900` → `black-50`
- **Texto**: `black-50` → `black-900`
- **Tarjetas**: `black-800` → `black-50`

## 📱 Ejemplos Prácticos

### Tarjeta de Dashboard (Cards Negras)
```tsx
<Card className="bg-card border-neutral-200">
  <CardHeader>
    <CardTitle className="text-card-foreground">Título</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-neutral-400">Descripción</p>
  </CardContent>
</Card>
```

### Botón Primario (Modo Claro)
```tsx
<Button className="bg-sherwood-green-500 text-white hover:bg-sherwood-green-600">
  Acción Principal
</Button>
```

### Botón Primario (Modo Oscuro)
```tsx
<Button className="bg-sherwood-green-200 text-sherwood-green-950 hover:bg-sherwood-green-100">
  Acción Principal
</Button>
```

### Badge de Estado
```tsx
<span className="bg-sherwood-green-100 text-sherwood-green-950 px-2 py-1 rounded-full text-sm">
  Activo
</span>
```

### Input
```tsx
<Input 
  className="bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-500 focus:ring-sherwood-green-500"
  placeholder="Escribe aquí..."
/>
```

### Card con Acentos (Negra)
```tsx
<Card className="bg-card border-neutral-200">
  <CardHeader className="border-b border-neutral-200">
    <CardTitle className="text-card-foreground flex items-center gap-2">
      <span className="w-2 h-2 bg-sherwood-green-500 rounded-full"></span>
      Título con Acento
    </CardTitle>
  </CardHeader>
  <CardContent className="pt-4">
    <p className="text-neutral-400 mb-2">Descripción</p>
    <div className="flex gap-2">
      <span className="bg-sherwood-green-100 text-sherwood-green-950 px-2 py-1 rounded text-xs">
        Badge Verde
      </span>
    </div>
  </CardContent>
</Card>
```

## 🔧 Personalización Adicional

Si quieres agregar más colores a tu paleta, puedes editarlos en `tailwind.config.js`:

```js
colors: {
  'black': {
    // ... tus colores existentes
  },
  'blue': {
    '500': '#3b82f6', // Agregar azul si necesitas
  }
}
```

¡Tu aplicación ahora tiene una identidad visual única y consistente! 🎨
