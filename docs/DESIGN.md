# DESIGN.md — Sistema de Diseño Visual

## Filosofía de Diseño

Estética cálida-editorial sobre fondo crema suave. La experiencia transmite confianza clínica y cercanía humana sin frialdad hospitalaria: un espacio donde la persona se siente acogida, segura y en manos de profesionales. Cada decisión visual refuerza calidez, apertura y credibilidad.

**Principios rectores:**
- Luminosidad cálida sobre crema, nunca blanca estéril ni gris frío
- Tipografía serif con carácter editorial para headlines, sans-serif limpia para cuerpo
- Contraste orgánico: colores terrosos, formas redondeadas, espacio generoso
- El vacío respira: margen amplio como señal de calma y profesionalismo
- Cero decoración sin función: cada elemento visual comunica o guía

---

## Referencias Visuales

| Fuente | Qué se toma | Qué NO se toma |
|--------|-------------|-----------------|
| **Hero / Landing** (Imagen 1) | Fondo crema cálido (#FFFBEF), headline serif grande y expresivo, overline en uppercase como contexto, CTA pill con borde y flecha, layout asimétrico con imágenes y texto en columnas | La densidad de secciones visibles simultáneamente, el badge de "Support" flotante |
| **Grid de terapeutas** (Imagen 2) | Cards blancas redondeadas con foto circular, badges "Available" en pill oscuro, stat cards en terracota con texto blanco, grid orgánico con tamaños mixtos, fondo crema uniforme | El desalineamiento visual del grid masonry, la cantidad de cards simultáneas |
| **Testimonios** (Imagen 3) | Cards con fondos de color pastel diferenciados (lavanda, crema, lima), icono de comillas como apertura, badges pill oscuros para atribución, formas orgánicas decorativas en peach | Los colores pastel como fondos principales de sección, las comillas como icono protagonista |
| **FAQ** (Imagen 4) | Acordeón con bordes sutiles sobre fondo crema, headline serif grande a la izquierda, layout split (título + acordeón), chevrons como indicadores de expansión | El ancho excesivo de las preguntas, la falta de padding interno |
| **Footer** (Imagen 5) | Fondo oscuro cálido (#1E130F), columnas organizadas con headings en uppercase dorado/tan, links en tono claro cálido, separación clara de categorías | La densidad de links sin agrupación visual, la falta de jerarquía visual entre columnas |

---

## Paleta de Colores

### Colores Base

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg-primary` | `#FFFBEF` | Fondo principal de la aplicación (crema cálido luminoso) |
| `--color-bg-secondary` | `#F9F1DE` | Fondo de cards alternadas, secciones secundarias |
| `--color-bg-tertiary` | `#FFFFFF` | Fondo de cards principales, inputs, elementos sobre crema |
| `--color-bg-elevated` | `#F3EDD8` | Hover de cards, tooltips, dropdowns |
| `--color-surface-subtle` | `#E8E2D0` | Bordes sutiles de acordeones, separadores, outlines de cards |
| `--color-bg-dark` | `#1E130F` | Footer, secciones de impacto oscuro (marrón espresso) |

### Colores de Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text-primary` | `#1E1310` | Texto principal (marrón espresso profundo, máxima legibilidad) |
| `--color-text-secondary` | `#4B413C` | Texto secundario, labels, metadata, badges |
| `--color-text-tertiary` | `#8A7E75` | Placeholders, texto deshabilitado, captions |
| `--color-text-inverse` | `#FFFBEF` | Texto sobre fondos oscuros (footer, badges dark) |
| `--color-text-inverse-muted` | `#EBCDB9` | Headings de categoría sobre fondo oscuro (dorado/tan) |

### Color de Acento (Terracota)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-accent` | `#B45A32` | Acento principal: logo, stat cards de impacto, links, overlines |
| `--color-accent-hover` | `#9A4D2A` | Hover del acento (más oscuro) |
| `--color-accent-subtle` | `#B45A3215` | Fondo sutil de highlights, badges informativos (15% opacidad) |
| `--color-accent-muted` | `#D4895C` | Bordes activos, indicadores secundarios |

### Color de Acción (Lima/Amarillo-Verde)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-cta` | `#F5F564` | CTA primario: botón "Find A Therapist", acciones principales |
| `--color-cta-hover` | `#E8E84E` | Hover del CTA (ligeramente más saturado) |
| `--color-cta-text` | `#1E1310` | Texto sobre CTA (siempre oscuro para contraste) |

### Color Secundario (Marrón Cálido)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-secondary` | `#6E5032` | Stat cards secundarias, badges de contexto, elementos de profundidad |
| `--color-secondary-light` | `#8B6B4A` | Variante más clara para hover o elementos suaves |

### Colores de Superficie (Testimonios / Cards Decorativas)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-surface-lavender` | `#F3E8F6` | Fondo de card testimonial / variante decorativa 1 |
| `--color-surface-cream` | `#F9F1DE` | Fondo de card testimonial / variante decorativa 2 |
| `--color-surface-lime` | `#FBFAC1` | Fondo de card testimonial / variante decorativa 3 |
| `--color-surface-peach` | `#FFCA9E` | Formas orgánicas decorativas, acentos suaves |

### Colores Funcionales

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-success` | `#3D9A5F` | Confirmaciones, estado activo, disponibilidad |
| `--color-warning` | `#D4A017` | Alertas, valores que requieren atención |
| `--color-error` | `#C44040` | Errores, valores críticos |
| `--color-info` | `#4A8DB7` | Información contextual, tooltips |

### Reglas de Uso de Color

- **Nunca usar `#000000` ni `#FFFFFF` puros como fondos principales.** Siempre las variantes crema/cálida. `#FFFFFF` solo para cards y elementos puntuales elevados sobre fondo crema.
- **El terracota (`--color-accent`) es identidad de marca.** Se usa para el logo, stat cards de impacto, overlines y links. No para CTAs primarios — esos usan el lima.
- **El lima (`--color-cta`) se reserva exclusivamente para el CTA principal.** Un solo CTA lima por pantalla visible. Si todo es lima, nada destaca.
- **Contraste mínimo WCAG AA:** texto primario sobre fondo primario = ratio ≥ 7:1. Texto secundario ≥ 4.5:1.
- **Bordes:** usar `--color-surface-subtle` a 40-60% opacidad. Nunca bordes oscuros de alto contraste.
- **Semáforo funcional independiente del acento:** success (verde), warning (amarillo), error (rojo) nunca cambian.
- **Cards de color pastel:** los fondos lavanda, crema y lima se usan solo para testimonios y elementos decorativos puntuales. Nunca como fondo principal de sección.
- **Footer y secciones oscuras:** usar `--color-bg-dark` (#1E130F). Headings en `--color-text-inverse-muted`, links en `--color-text-inverse`.

---

## Tipografía

### Fuentes

| Rol | Fuente | Fallback | Peso |
|-----|--------|----------|------|
| **Headlines / Display** | Lora | Georgia, serif | 400 (Regular), 700 (Bold) |
| **Cuerpo de texto** | Inter | system-ui, sans-serif | 400 (Regular), 500 (Medium) |
| **Datos / Métricas** | Lora | Georgia, serif | 700 (Bold) |
| **Subtítulos / UI** | Inter | system-ui, sans-serif | 500 (Medium), 600 (SemiBold) |
| **Labels / Nav** | Inter | system-ui, sans-serif | 400 (Regular), 500 (Medium) |
| **Overlines** | Inter | system-ui, sans-serif | 500 (Medium) |

> **Decisión tipográfica:** Sistema dual serif + sans-serif. Los headlines usan una serif editorial (Lora) que transmite calidez, tradición y confianza clínica — el tipo de autoridad suave que un paciente busca en su terapeuta. El cuerpo y la interfaz usan una sans-serif contemporánea (Inter) para máxima legibilidad y limpieza funcional. El contraste entre familias crea jerarquía visual inmediata sin depender de peso extremo. Ambas fuentes disponibles en Google Fonts con soporte completo para caracteres latinos extendidos.

### Escala Tipográfica

Base: `16px` (1rem). Ratio: `1.250` (Major Third).

| Token | Tamaño | Line Height | Letter Spacing | Uso |
|-------|--------|-------------|----------------|-----|
| `--text-display` | 3.5rem (56px) | 1.1 | -0.02em | Hero headlines, números de impacto |
| `--text-h1` | 2.488rem (40px) | 1.15 | -0.015em | Títulos de página |
| `--text-h2` | 1.99rem (32px) | 1.2 | -0.01em | Títulos de sección |
| `--text-h3` | 1.59rem (25px) | 1.3 | -0.005em | Subtítulos, títulos de card |
| `--text-h4` | 1.25rem (20px) | 1.35 | 0 | Labels prominentes |
| `--text-body` | 1rem (16px) | 1.6 | 0 | Texto principal |
| `--text-body-sm` | 0.875rem (14px) | 1.5 | 0.005em | Texto secundario, captions |
| `--text-caption` | 0.75rem (12px) | 1.4 | 0.02em | Metadata, timestamps, badges |
| `--text-overline` | 0.75rem (12px) | 1.4 | 0.1em | Labels superiores en UPPERCASE |

### Reglas Tipográficas

- **Headlines:** siempre Lora Regular (400) o Bold (700). El propio carácter de la serif genera presencia sin necesitar pesos extremos.
- **Cuerpo y UI:** Inter Regular (400) para texto largo, Medium (500) para labels y navegación.
- **Contraste serif/sans crea jerarquía:** el cambio de familia entre headline y cuerpo es la señal principal de jerarquía. No depender de tamaño excesivo.
- **NUNCA subrayar** texto que no sea un link.
- **Overlines:** siempre Inter Medium uppercase + tracking amplio (`0.1em`). Color `--color-text-secondary` o `--color-accent`.
- **Números de impacto en stat cards:** usar Lora Bold `--text-display` sobre fondo terracota o marrón. Texto blanco.
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

- **Generosidad extrema:** el espacio vacío es la señal principal de calma. Más espacio del que parece necesario.
- **Secciones:** mínimo `--space-16` entre secciones principales. En móvil, mínimo `--space-12`.
- **Cards:** padding interno `--space-6`. Gap entre cards `--space-5`.
- **Hero:** padding vertical `--space-20` mínimo. El headline necesita aire para respirar.
- **Consistencia vertical:** headline → `--space-4` → párrafo → `--space-8` → siguiente bloque.

---

## Layout y Grid

### Contenedor Principal

```
Max-width: 1280px
Padding lateral: 24px (móvil), 40px (tablet), 64px (desktop)
Centrado horizontal: margin 0 auto
```

### Grid

```
Desktop: 12 columnas, gap 24px
Tablet: 6 columnas, gap 20px
Móvil: 4 columnas, gap 16px
```

### Patrones de Layout

- **Hero:** texto a la izquierda (60%) + espacio o imagen a la derecha (40%). Overline + headline + CTA pill.
- **Features (2 columnas):** grid simétrico, cada columna con headline serif + párrafo + imagen. Gap generoso.
- **Grid de cards:** masonry orgánico o grid uniforme 3 columnas en desktop. Cards blancas con bordes redondeados.
- **Stat cards intercaladas:** cards de color (terracota, marrón) mezcladas con cards blancas en el grid. Crean ritmo visual.
- **Testimonios:** carrusel horizontal o grid 3 columnas. Cada card con fondo pastel diferente.
- **FAQ:** layout split — headline serif a la izquierda (30%), acordeón a la derecha (70%).
- **Footer:** grid 5 columnas sobre fondo oscuro. Headings uppercase en dorado/tan.

---

## Componentes

### Botones

```
Primario (CTA Lima):
  Background: --color-cta (#F5F564)
  Color: --color-cta-text (#1E1310)
  Border: 1px solid --color-cta
  Border-radius: 9999px (pill)
  Padding: 12px 28px
  Font: Inter Medium 500, --text-body
  Hover: --color-cta-hover, scale(1.02)
  
Secundario (Outline oscuro):
  Background: --color-text-primary (#1E1310)
  Color: --color-text-inverse (#FFFBEF)
  Border-radius: 9999px (pill)
  Padding: 12px 28px
  Font: Inter Medium 500, --text-body
  Hover: opacity 0.9

Terciario (Outline ghost):
  Background: transparent
  Color: --color-text-primary
  Border: 1px solid --color-surface-subtle
  Border-radius: 9999px (pill)
  Padding: 12px 28px
  Font: Inter Medium 500, --text-body
  Hover: --color-bg-elevated
  Incluye flecha → al final del texto
```

- **Todos los botones son pill** (border-radius máximo). Nunca esquinas rectas.
- **Un solo CTA lima por viewport visible.** El resto son outline o dark.
- **Flecha →** en botones terciarios de navegación ("Our Approach →").

### Cards

```
Card base:
  Background: --color-bg-tertiary (#FFFFFF)
  Border: 1px solid rgba(30, 19, 16, 0.06)
  Border-radius: 20px
  Padding: --space-6
  Overflow: hidden (para imágenes internas)

Card de stat (terracota):
  Background: --color-accent (#B45A32)
  Color: --color-text-inverse
  Border-radius: 20px
  Padding: --space-6
  Texto de stat: Lora Bold, --text-display

Card de stat (marrón):
  Background: --color-secondary (#6E5032)
  Color: --color-text-inverse
  Border-radius: 20px
  Padding: --space-6
  Texto de stat: Lora Bold, --text-h1

Card de testimonio:
  Background: --color-surface-lavender | --color-surface-cream | --color-surface-lime
  Border-radius: 20px
  Padding: --space-8
  Icono comillas: círculo con "" en --color-text-primary
  Texto: Inter Regular, --text-body, --color-text-primary
  Badge inferior: pill oscuro "Octave Patient"
```

- **Border-radius generoso (20px)** en todas las cards. Nunca menos de 16px.
- **Sin sombra** por defecto. El fondo crema ya crea suficiente separación con las cards blancas.
- **Hover sutil:** translate-y -2px + sombra suave (0 4px 12px rgba(30,19,16,0.06)).

### Badges / Pills

```
Badge oscuro:
  Background: --color-text-secondary (#4B413C)
  Color: --color-text-inverse (#FFFBEF)
  Border-radius: 9999px
  Padding: 6px 16px
  Font: Inter Medium 500, --text-caption
  Uso: "Available", "Octave Patient", "Take charge..."

Badge outline:
  Background: transparent
  Border: 1px solid --color-surface-subtle
  Color: --color-text-secondary
  Border-radius: 9999px
  Padding: 6px 16px
  Font: Inter Medium 500, --text-caption
```

### Acordeón (FAQ)

```
Contenedor:
  Background: transparent
  Border: 1px solid rgba(30, 19, 16, 0.08)
  Border-radius: 16px
  Margin-bottom: --space-3

Header del acordeón:
  Padding: --space-5 --space-6
  Font: Inter Regular 400, --text-body o --text-h4
  Color: --color-text-primary
  Cursor: pointer
  Display: flex, justify-content: space-between, align-items: center

Chevron:
  Tamaño: 20px
  Color: --color-text-tertiary
  Rotación: 0° cerrado, 180° abierto
  Transición: transform 300ms ease

Contenido expandido:
  Padding: 0 --space-6 --space-5
  Font: Inter Regular, --text-body
  Color: --color-text-secondary
```

### Navegación

```
Nav bar:
  Background: --color-bg-primary (#FFFBEF)
  Border-bottom: 1px solid rgba(30, 19, 16, 0.06)
  Height: 72px
  Padding: 0 --space-8
  Position: sticky, top: 0, z-index: 100

Logo:
  Font: serif (Lora o custom), lowercase
  Color: --color-accent (#B45A32)
  Tamaño: ~24px

Links de nav:
  Font: Inter Regular 400, --text-body
  Color: --color-text-primary
  Hover: --color-text-secondary
  Dropdown chevron: inline, 12px

Acciones derecha:
  Login: botón secundario (dark pill)
  CTA: botón primario (lima pill)
  Gap: --space-3
```

### Footer

```
Background: --color-bg-dark (#1E130F)
Padding: --space-16 --space-8 --space-8

Logo:
  Color: --color-text-inverse
  Font: serif, lowercase
  Margin-bottom: --space-10

Columnas:
  Grid: 5 columnas en desktop, 2 en tablet, 1 en móvil
  Gap: --space-8

Heading de columna:
  Font: Inter Medium 500, --text-overline
  Color: --color-text-inverse-muted (#EBCDB9)
  Text-transform: uppercase
  Letter-spacing: 0.1em
  Margin-bottom: --space-4

Links:
  Font: Inter Regular 400, --text-body-sm
  Color: --color-text-inverse (#FFFBEF)
  Opacity: 0.85
  Hover: opacity 1
  Line-height: 2.2 (espacio generoso entre links)
```

---

## Formas Orgánicas Decorativas

El diseño incluye formas blobby/orgánicas como elementos decorativos de fondo:

- **Color:** `--color-surface-peach` (#FFCA9E) o variantes pastel
- **Tamaño:** grandes, parcialmente fuera del viewport (overflow hidden)
- **Border-radius:** valores irregulares altos (30% 70% 70% 30% / 30% 30% 70% 70%)
- **Opacidad:** 0.6-0.8 para que no compitan con el contenido
- **Posición:** absolute, detrás del contenido (z-index negativo)
- **Uso:** solo en secciones de testimonios y áreas emocionales. Nunca en UI funcional.

---

## Iconografía

- **Estilo:** outline/stroke, peso 1.5px. Nunca filled/solid.
- **Tamaños:** 16px (inline con texto), 20px (en botones/acordeones), 24px (standalone), 32px (feature icons)
- **Color:** heredan el color del texto padre por defecto. Iconos de acento usan `--color-accent`.
- **Librería recomendada:** Lucide Icons (consistente con el estilo outline limpio)
- **Flechas →:** usadas como indicador de navegación en botones terciarios. Siempre a la derecha del texto.
- **Chevrons ˅:** usadas en dropdowns de nav y acordeones FAQ. Rotación animada.
- **Comillas "":** icono circular con comillas para abrir testimonios. Estilo outline.
- **Nunca** usar iconos decorativos sin función.

---

## Imágenes y Media

- **Fotos de personas:** protagonistas del diseño. Retratos cálidos, iluminación natural, fondo neutro o desenfocado.
- **Border-radius:** 20px para imágenes en cards. 9999px (circular) para avatares de terapeutas.
- **Aspect ratios:** 16:9 para banners/hero, 4:3 para cards de contenido, 1:1 para avatares circulares.
- **Avatares:** border-radius 9999px (circular), tamaño consistente (120px en cards, 48px en listas), sin borde visible.
- **Overlay:** si llevan texto encima sobre fondo oscuro, overlay al 40% mínimo. Preferir texto debajo o al lado.
- **Gradientes:** solo sutiles, para fondos de sección. De `--color-bg-primary` a `--color-bg-secondary`. Nunca gradientes vivos.

---

## Animación y Transiciones

- **Duración base:** 200ms para hover/focus, 300ms para apariciones/acordeones, 400ms para transiciones de layout.
- **Easing:** `ease` para la mayoría. `cubic-bezier(0.16, 1, 0.3, 1)` para entradas (ease-out expresivo).
- **Scroll animations:** fade-in + translate-y sutil (de 20px abajo). Solo en secciones principales.
- **Acordeones:** height auto con transición suave. Chevron rota 180° con ease.
- **Cards hover:** translate-y -2px + aparición de sombra suave. 200ms ease.
- **Nunca:** animaciones que bloqueen interacción, bounces, ni efectos que distraigan del contenido.
- **Principio:** la calma visual es prioritaria. Las animaciones deben sentirse como respiración, no como excitación.

---

## Responsive

### Breakpoints

| Nombre | Valor | Comportamiento |
|--------|-------|----------------|
| `mobile` | < 640px | Stack vertical, nav hamburger, tipografía reducida 1 nivel |
| `tablet` | 640-1024px | Grid 2 columnas, nav visible, tipografía intermedia |
| `desktop` | > 1024px | Layout completo, grid hasta 5 columnas en footer |

### Reglas Responsive

- **Tipografía:** en móvil, `--text-display` baja a `2.5rem`, `--text-h1` a `2rem`. El resto mantiene escala.
- **Cards:** en móvil, siempre stack vertical (1 columna). En tablet, grid 2 columnas.
- **Hero:** en móvil, texto centrado, padding reducido a `--space-12`.
- **FAQ:** en móvil, layout stack (headline arriba, acordeón abajo). En desktop, split horizontal.
- **Footer:** en móvil, columnas stack 1. En tablet, grid 2.
- **Imágenes:** todas con `width: 100%` y `height: auto`. Nunca dimensiones fijas.
- **Touch targets:** mínimo 44px × 44px para todos los elementos interactivos en móvil.
- **Formas decorativas:** se ocultan o reducen significativamente en móvil para no interferir.

---

## Modo Oscuro (Futuro)

El sistema está diseñado light-first. Si se implementa modo oscuro:

| Token light | Equivalente dark |
|-------------|------------------|
| `--color-bg-primary` (#FFFBEF) | `#1E130F` |
| `--color-bg-secondary` (#F9F1DE) | `#2A1F18` |
| `--color-bg-tertiary` (#FFFFFF) | `#352A22` |
| `--color-text-primary` (#1E1310) | `#FFFBEF` |
| `--color-text-secondary` (#4B413C) | `#B5A99F` |
| `--color-accent` (#B45A32) | `#D47A52` (más luminoso para contraste) |
| `--color-cta` (#F5F564) | `#E8E84E` (ligeramente más apagado) |

---

## Checklist de Validación Visual

Antes de aprobar cualquier pantalla, verificar:

- [ ] ¿Los colores vienen exclusivamente de los tokens definidos aquí?
- [ ] ¿La jerarquía tipográfica es clara? (headline serif → subtítulo → cuerpo sans → caption)
- [ ] ¿El espaciado entre secciones es generoso y transmite calma?
- [ ] ¿Los elementos interactivos tienen estados hover/focus/active definidos?
- [ ] ¿El contraste cumple WCAG AA mínimo?
- [ ] ¿Funciona en móvil sin scroll horizontal?
- [ ] ¿Las cards tienen border-radius ≥ 16px y se sienten orgánicas?
- [ ] ¿No hay sombras agresivas, gradientes vivos, ni bordes de alto contraste?
- [ ] ¿El CTA lima se usa solo una vez por viewport visible?
- [ ] ¿El terracota se usa como identidad (logo, stats, overlines) y no como CTA?
- [ ] ¿Los botones son todos pill (border-radius máximo)?
- [ ] ¿Las formas decorativas orgánicas no interfieren con el contenido funcional?
- [ ] ¿El footer oscuro usa los tonos dorado/tan para headings y crema para links?
