# DESIGN.md — Sistema de Diseño Visual

## Filosofía de Diseño

Estética premium-editorial sobre fondo oscuro. La experiencia transmite autoridad científica sin frialdad clínica: un espacio donde un ejecutivo de alto nivel se siente en un entorno a su medida. Cada decisión visual refuerza calma, profundidad y confianza.

**Principios rectores:**
- Oscuridad cálida, nunca fría ni técnica
- Tipografía editorial como voz principal
- Máximo contraste funcional sin agresividad
- Espacio generoso: el blanco (vacío) es un elemento de diseño, no desperdicio
- Cero decoración gratuita: cada elemento visual tiene función

---

## Referencias Visuales

| Fuente | Qué se toma | Qué NO se toma |
|--------|-------------|-----------------|
| **Function Health** (functionhealth.com) | Paleta oscura + verde como acento, jerarquía tipográfica con itálicas para énfasis, layout limpio y generoso, CTAs prominentes sobre fondo oscuro | El blanco puro de algunas secciones interiores, la densidad informativa de las tablas de tests |
| **Pitch Deck oscuro** (Imagen 2) | Fondos oliva/teal oscuro, tipografía serif grande para datos/headlines, cards con bordes redondeados, jerarquía de información con números prominentes | Los colores arena/crema como color de texto primario (se usa blanco), el layout de presentación tipo slide |
| **Noha Furniture** (Imagen 1) | Fondos marrón oscuro cálido, grid modular, mezcla serif/sans-serif, sensación editorial premium, secciones claramente delimitadas | La paleta marrón exacta (se prefiere verde-oscuro), las fotos de producto como protagonistas |

---

## Paleta de Colores

### Colores Base

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-primary` | `#0B0F0E` | Fondo principal de la aplicación |
| `--color-bg-secondary` | `#141A18` | Fondo de cards, secciones alternadas |
| `--color-bg-tertiary` | `#1C2422` | Fondo de inputs, elementos interactivos en reposo |
| `--color-bg-elevated` | `#212B28` | Hover de cards, tooltips, dropdowns |
| `--color-surface-subtle` | `#2A3633` | Bordes sutiles, separadores |

### Colores de Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text-primary` | `#F5F5F0` | Texto principal (off-white cálido, nunca #FFFFFF puro) |
| `--color-text-secondary` | `#A8B0AC` | Texto secundario, labels, metadata |
| `--color-text-tertiary` | `#6B7572` | Placeholders, texto deshabilitado |
| `--color-text-inverse` | `#0B0F0E` | Texto sobre fondos claros (botones primarios) |

### Color de Acento (Verde)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-accent` | `#4ADE80` | Acento principal: CTAs, links, estados activos |
| `--color-accent-hover` | `#6AE89A` | Hover del acento |
| `--color-accent-subtle` | `#4ADE8015` | Fondo sutil de badges, highlights (15% opacidad) |
| `--color-accent-muted` | `#2D6B4A` | Bordes activos, indicadores secundarios |

### Colores Funcionales

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-success` | `#4ADE80` | Confirmaciones, progreso completado |
| `--color-warning` | `#FACC15` | Alertas, valores que requieren atención |
| `--color-error` | `#F87171` | Errores, valores críticos |
| `--color-info` | `#60A5FA` | Información contextual, tooltips |

### Reglas de Uso de Color

- **Nunca usar `#000000` ni `#FFFFFF` puros.** Siempre las variantes cálidas definidas arriba.
- **El verde acento se usa con moderación.** Solo para CTAs primarios, links, e indicadores de estado positivo. Si todo es verde, nada destaca.
- **Contraste mínimo WCAG AA:** texto primario sobre fondo primario = ratio ≥ 7:1. Texto secundario ≥ 4.5:1.
- **Bordes:** usar `--color-surface-subtle` a 40-60% opacidad. Nunca bordes blancos ni de alto contraste.

---

## Tipografía

### Fuentes

| Rol | Fuente | Fallback | Peso |
|-----|--------|----------|------|
| **Headlines / Display** | Inter Tight | system-ui, sans-serif | 500 (Medium), 600 (Semibold) |
| **Cuerpo de texto** | Inter | system-ui, sans-serif | 400 (Regular), 500 (Medium) |
| **Datos / Métricas** | Inter Tight | system-ui, sans-serif | 600 (Semibold) |
| **Código / Monospace** | JetBrains Mono | monospace | 400 |

> **Nota sobre serif:** Si el proyecto evoluciona hacia un tono más editorial (tipo revista de salud), considerar migrar headlines a una serif como **Playfair Display** o **Cormorant Garamond**. Esto se alinea con la referencia de Noha y el pitch deck oscuro. La decisión se toma en VISION.md según audiencia.

### Escala Tipográfica

Base: `16px` (1rem). Ratio: `1.250` (Major Third).

| Token | Tamaño | Line Height | Letter Spacing | Uso |
|-------|--------|-------------|----------------|-----|
| `--text-display` | 3.5rem (56px) | 1.1 | -0.03em | Hero, números grandes de impacto |
| `--text-h1` | 2.488rem (40px) | 1.15 | -0.025em | Títulos de página |
| `--text-h2` | 1.99rem (32px) | 1.2 | -0.02em | Títulos de sección |
| `--text-h3` | 1.59rem (25px) | 1.3 | -0.015em | Subtítulos, títulos de card |
| `--text-h4` | 1.25rem (20px) | 1.35 | -0.01em | Labels prominentes |
| `--text-body` | 1rem (16px) | 1.6 | 0 | Texto principal |
| `--text-body-sm` | 0.875rem (14px) | 1.5 | 0.005em | Texto secundario, captions |
| `--text-caption` | 0.75rem (12px) | 1.4 | 0.02em | Metadata, timestamps, badges |
| `--text-overline` | 0.75rem (12px) | 1.4 | 0.1em | Labels superiores en UPPERCASE |

### Reglas Tipográficas

- **Headlines:** siempre `Inter Tight`, peso Medium o Semibold. Letter-spacing negativo.
- **Énfasis editorial:** usar `font-style: italic` en palabras clave dentro de headlines (patrón de Function Health: "Check your *health*", "Real *results*"). Nunca itálicas en cuerpo de texto.
- **NUNCA subrayar** texto que no sea un link.
- **Overlines:** siempre uppercase + tracking amplio (`0.1em`). Color `--color-text-secondary` o `--color-accent`.
- **Números de impacto:** usar `--text-display` + peso Semibold. Son el protagonista visual de la sección (patrón del pitch deck: "$56B", "99%", "124%").
- **Longitud de línea máxima:** 65-75 caracteres para cuerpo de texto. Usar `max-width: 42rem` en contenedores de texto.

---

## Espaciado

Base: `4px`. Sistema de múltiplos de 4.

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | 4px | Mínimo: separación entre icono y label |
| `--space-2` | 8px | Padding interno compacto |
| `--space-3` | 12px | Gap entre elementos inline |
| `--space-4` | 16px | Padding de inputs, gap de grid compacto |
| `--space-5` | 20px | Gap estándar |
| `--space-6` | 24px | Padding de cards |
| `--space-8` | 32px | Separación entre bloques dentro de sección |
| `--space-10` | 40px | Margen entre componentes |
| `--space-12` | 48px | Separación entre secciones menores |
| `--space-16` | 64px | Separación entre secciones principales |
| `--space-20` | 80px | Padding vertical de secciones hero |
| `--space-24` | 96px | Espacio superior/inferior de página |

### Reglas de Espaciado

- **Generosidad:** preferir más espacio que menos. El espacio vacío transmite premium.
- **Secciones:** mínimo `--space-16` entre secciones principales. En móvil, mínimo `--space-12`.
- **Cards:** padding interno `--space-6`. Gap entre cards `--space-5`.
- **Consistencia vertical:** los márgenes entre elementos dentro de una sección siguen la jerarquía: headline → `--space-4` → párrafo → `--space-8` → siguiente bloque.

---

## Layout y Grid

### Contenedor Principal

```
Max-width: 1200px
Padding lateral: 24px (móvil), 40px (tablet), 64px (desktop)
Centrado horizontal: margin 0 auto
```

### Grid System

| Breakpoint | Nombre | Columnas | Gap | Padding lateral |
|------------|--------|----------|-----|-----------------|
| < 640px | `mobile` | 1 | 16px | 24px |
| 640-1024px | `tablet` | 2 | 20px | 40px |
| > 1024px | `desktop` | 12 | 24px | 64px |

### Patrones de Layout Recurrentes

1. **Hero full-width:** texto centrado, ancho máximo 800px, padding vertical generoso (`--space-20`)
2. **Grid de cards 2-up / 3-up:** cards de igual altura, gap `--space-5`
3. **Split 50/50:** texto a un lado, visual al otro. Alineación vertical centrada
4. **Lista de pasos numerados:** número grande a la izquierda (`--text-display`), contenido a la derecha
5. **Testimonial strip:** fondo ligeramente diferente (`--color-bg-secondary`), texto centrado con comillas
6. **Stats row:** 3-4 métricas en línea con número grande + label pequeño debajo

---

## Componentes

### Botones

| Variante | Fondo | Texto | Borde | Border-radius |
|----------|-------|-------|-------|---------------|
| **Primario** | `--color-accent` | `--color-text-inverse` | ninguno | 9999px (pill) |
| **Secundario** | transparent | `--color-text-primary` | 1px `--color-surface-subtle` | 9999px |
| **Ghost** | transparent | `--color-accent` | ninguno | 8px |

- **Padding:** `12px 28px` (default), `10px 20px` (small), `16px 36px` (large)
- **Hover primario:** fondo `--color-accent-hover`, transición 200ms ease
- **Hover secundario:** fondo `--color-bg-elevated`, transición 200ms ease
- **Nunca** usar sombras en botones. El contraste viene del color, no de la elevación.
- **Texto del botón:** `--text-body-sm`, peso Medium (500), sin uppercase

### Cards

```
Background: --color-bg-secondary
Border: 1px solid rgba(255, 255, 255, 0.06)
Border-radius: 16px
Padding: --space-6 (24px)
Hover: background --color-bg-elevated, border rgba(255, 255, 255, 0.10)
Transition: all 200ms ease
```

- **Cards con datos:** el número o métrica principal va en `--text-display` o `--text-h1`, prominente, arriba o a la izquierda. El contexto/label va debajo en `--text-body-sm` + `--color-text-secondary`.
- **Cards interactivas:** añadir `cursor: pointer` y transición de hover.
- **Nunca** usar box-shadow para elevación. La jerarquía se crea con diferencias sutiles de fondo.

### Inputs

```
Background: --color-bg-tertiary
Border: 1px solid rgba(255, 255, 255, 0.08)
Border-radius: 12px
Padding: 14px 16px
Color texto: --color-text-primary
Color placeholder: --color-text-tertiary
Focus: border --color-accent, box-shadow 0 0 0 3px rgba(74, 222, 128, 0.15)
```

### Tags / Badges

```
Background: --color-accent-subtle (verde al 15% opacidad)
Color texto: --color-accent
Border-radius: 9999px
Padding: 4px 12px
Font: --text-caption, peso Medium, uppercase, letter-spacing 0.05em
```

### Separadores

```
Color: rgba(255, 255, 255, 0.06)
Grosor: 1px
Margin vertical: --space-8
```

- Nunca usar `<hr>` visible. Los separadores son sutiles y opcionales.
- Preferir espacio vacío sobre líneas divisorias.

---

## Iconografía

- **Estilo:** outline/stroke, peso 1.5px. Nunca filled/solid.
- **Tamaños:** 16px (inline con texto), 20px (en botones), 24px (standalone), 32px (feature icons)
- **Color:** heredan el color del texto padre por defecto. Iconos de acento usan `--color-accent`.
- **Librería recomendada:** Lucide Icons (consistente con el estilo outline limpio)
- **Nunca** usar iconos decorativos sin función. Cada icono comunica algo.

---

## Imágenes y Media

- **Fotos:** siempre con overlay oscuro si llevan texto encima. Mínimo 40% opacidad de overlay.
- **Border-radius:** 16px para imágenes en cards. 24px para imágenes hero standalone.
- **Aspect ratios consistentes:** 16:9 para banners/hero, 4:3 para cards, 1:1 para avatares.
- **Avatares:** border-radius 9999px (circular), borde sutil `2px solid rgba(255, 255, 255, 0.1)`.
- **Gradientes:** solo oscuros, para fondos de sección. De `--color-bg-primary` a `--color-bg-secondary`. Nunca gradientes de color vivo.

---

## Animación y Transiciones

- **Duración base:** 200ms para hover/focus, 300ms para apariciones, 400ms para transiciones de layout.
- **Easing:** `ease` para la mayoría. `cubic-bezier(0.16, 1, 0.3, 1)` para entradas (ease-out expresivo).
- **Scroll animations:** fade-in + translate-y sutil (de 20px abajo hacia posición final). Solo en secciones principales, no en cada elemento.
- **Nunca:** animaciones que bloqueen interacción, bounces, ni efectos que distraigan del contenido.
- **Principio:** si la animación no ayuda a entender la jerarquía o la transición de estado, no se incluye.

---

## Responsive

### Breakpoints

| Nombre | Valor | Comportamiento |
|--------|-------|----------------|
| `mobile` | < 640px | Stack vertical, nav colapsada, tipografía reducida 1 nivel |
| `tablet` | 640-1024px | Grid 2 columnas, nav visible, tipografía intermedia |
| `desktop` | > 1024px | Layout completo, grid 12 columnas |

### Reglas Responsive

- **Tipografía:** en móvil, `--text-display` baja a `2.5rem`, `--text-h1` a `2rem`. El resto mantiene su escala.
- **Cards:** en móvil, siempre stack vertical (1 columna). En tablet, grid 2 columnas.
- **Hero:** en móvil, padding vertical se reduce a `--space-12`. Texto siempre centrado.
- **Imágenes:** todas con `width: 100%` y `height: auto`. Nunca dimensiones fijas.
- **Touch targets:** mínimo 44px × 44px para todos los elementos interactivos en móvil.

---

## Modo Claro (Futuro)

El sistema está diseñado dark-first. Si se implementa modo claro:

| Token dark | Equivalente light |
|------------|-------------------|
| `--color-bg-primary` (#0B0F0E) | `#FAFAF8` |
| `--color-bg-secondary` (#141A18) | `#F0F0EC` |
| `--color-text-primary` (#F5F5F0) | `#1A1A1A` |
| `--color-text-secondary` (#A8B0AC) | `#6B6B6B` |
| `--color-accent` (#4ADE80) | `#16A34A` (más saturado para contraste sobre claro) |

---

## Checklist de Validación Visual

Antes de aprobar cualquier pantalla, verificar:

- [ ] ¿Los colores vienen exclusivamente de los tokens definidos aquí?
- [ ] ¿La jerarquía tipográfica es clara? (se distingue headline → subtítulo → cuerpo → caption)
- [ ] ¿El espaciado entre secciones es generoso y consistente?
- [ ] ¿Los elementos interactivos tienen estados hover/focus/active definidos?
- [ ] ¿El contraste cumple WCAG AA mínimo?
- [ ] ¿Funciona en móvil sin scroll horizontal?
- [ ] ¿Las cards mantienen altura consistente en su fila?
- [ ] ¿No hay sombras, gradientes de color, ni bordes de alto contraste?
- [ ] ¿El verde acento se usa solo donde debe (CTAs, links, estados positivos)?
- [ ] ¿Los números/métricas están visualmente prominentes cuando son el dato principal?
