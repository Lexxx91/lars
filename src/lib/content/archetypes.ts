/**
 * archetypes.ts — Los 7 arquetipos del Sistema Nervioso
 *
 * Contenido real de:
 * - /arquetipos/cards.pdf (6 patrones de burnout por arquetipo)
 * - /arquetipos/tres_capas_necesidad.pdf (3 capas de necesidad)
 * - /arquetipos/arquetipos-conexiones.jpeg (matriz de intensidades)
 *
 * © Neurotropy · Instituto Epigenético
 */

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export interface BurnoutPattern {
  name: string
  description: string
}

export interface NeedLayer {
  title: string
  items: string[]
  explanation: string
}

export interface ArchetypeData {
  id: number
  key: string
  name: string
  descriptors: string
  wound: string
  armor: string
  snState: string
  /** Frase corta para el teaser en el mapa */
  teaser: string
  /** 6 patrones de burnout */
  patterns: BurnoutPattern[]
  /** 3 capas de necesidad (bioquímica → SN → emocional) */
  needs: {
    biochemical: NeedLayer
    nervousSystem: NeedLayer
    emotional: NeedLayer
  }
}

// ─── LOS 7 ARQUETIPOS ────────────────────────────────────────────────────────

const ARCHETYPES: ArchetypeData[] = [
  {
    id: 1,
    key: 'esceptico',
    name: 'El Escéptico',
    descriptors: 'Desconfiado · Impenetrable · Hermético',
    wound: 'Traición',
    armor: 'Desconfianza + hipervigilancia',
    snState: 'Simpático crónico — eje HPA hiperactivo, cortisol elevado',
    teaser: 'Tu sistema nervioso escanea amenazas 24/7. No te quemas por trabajar demasiado sino por vigilar demasiado.',
    patterns: [
      {
        name: 'Hiperactivación',
        description: 'Su sistema nervioso escanea amenazas 24/7. No se quema por trabajar demasiado sino por vigilar demasiado. El simpático no se apaga nunca.',
      },
      {
        name: 'Perfeccionismo',
        description: 'Si todo es impecable, nadie puede usarlo en tu contra. El perfeccionismo aquí es control preventivo: anticipar la traición cerrando todas las grietas.',
      },
      {
        name: 'Negación del cuerpo',
        description: 'El cuerpo es territorio de vulnerabilidad. Sentir implica bajar la guardia, y bajar la guardia significa quedar expuesto a la traición.',
      },
      {
        name: 'Hiperresponsabilidad',
        description: 'Moderada: asume carga no por heroísmo sino porque delegar = confiar, y confiar es lo que más teme.',
      },
      {
        name: 'Identidad = producción',
        description: 'Presente pero secundaria. Su identidad está más ligada al control que al rendimiento.',
      },
      {
        name: 'Sin límites',
        description: 'Invertido: el Escéptico sí pone límites, pero son muros defensivos, no asertividad sana.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Sueño profundo (GABA, melatonina)',
          'Movimiento que descargue adrenalina',
          'Contacto físico seguro (oxitocina)',
          'Alimentación antiinflamatoria',
        ],
        explanation: 'Su bioquímica necesita restaurar los ciclos de sueño profundo para que el GABA y la melatonina regulen la hipervigilancia, movimiento que descargue la adrenalina acumulada, contacto físico seguro que active la oxitocina inhibida por la desconfianza, y alimentación que estabilice los picos de cortisol.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Seguridad (safety)',
          'Estabilidad (stability)',
          'Consistencia (consistency)',
          'Orden y previsibilidad (order)',
        ],
        explanation: 'Para volver a la ventana de tolerancia necesita experiencias repetidas de seguridad que su neurocepción pueda registrar, estabilidad y consistencia en las señales del entorno para que el nervio vago ventral se active gradualmente.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Confianza (trust)',
          'Calidez (warmth)',
          'Empatía (empathy)',
          'Ser comprendido (understanding)',
        ],
        explanation: 'La herida de la traición dejó al Escéptico con un déficit profundo de confianza, que es la necesidad emocional más urgente y la más difícil de restaurar. Necesita calidez como experiencia que su neurocepción pueda ir registrando como segura.',
      },
    },
  },
  {
    id: 2,
    key: 'obsesivo',
    name: 'El Obsesivo',
    descriptors: 'Controlador · Obsesivo · Inflexible · Tenso',
    wound: 'Humillación',
    armor: 'Control absoluto',
    snState: 'Hiperactivación prefrontal — déficit de serotonina y GABA',
    teaser: 'La rumiación ES hiperactivación cognitiva. Tu mente no para de ejecutar algoritmos de seguridad: anticipar todos los escenarios posibles.',
    patterns: [
      {
        name: 'Hiperactivación',
        description: 'La rumiación ES hiperactivación cognitiva. Su mente no para de ejecutar «algoritmos de seguridad»: anticipar todos los escenarios posibles.',
      },
      {
        name: 'Perfeccionismo',
        description: 'El control disfrazado de excelencia. Si cada variable está controlada, lo imprevisto no puede entrar.',
      },
      {
        name: 'Negación del cuerpo',
        description: 'Rigidez somática crónica: mandíbula apretada, pelvis bloqueada, hombros tensos. El cuerpo entero está en modo contención permanente.',
      },
      {
        name: 'Identidad = producción',
        description: 'Si no controlo y produzco, no existo. La productividad es la prueba de que tiene el control.',
      },
      {
        name: 'Hiperresponsabilidad',
        description: 'No delega porque nadie va a hacerlo con el nivel de control que él necesita.',
      },
      {
        name: 'Sin límites',
        description: 'Pone límites, pero desde la rigidez. No es asertividad flexible: es un muro de normas inflexibles.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Movimiento que libere hipertonía',
          'Sueño reparador sin rumiación',
          'Contacto que desbloquee rigidez',
          'Expresión sexual liberadora',
        ],
        explanation: 'Mantiene un tono simpático permanente con hiperactividad prefrontal. Necesita movimiento físico que libere la hipertonía muscular crónica, sueño que permita consolidación sin rumiación, y contacto que desbloquee la rigidez somática del control.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Facilidad y fluidez (ease)',
          'Espontaneidad (spontaneity)',
          'Armonía interna (harmony)',
          'Espacio para soltar (space)',
        ],
        explanation: 'Necesita salir de la hiperactivación cortical hacia la regulación ventral vagal. Requiere facilidad como experiencia somática de soltar, espontaneidad que reprograme la ecuación \'lo imprevisto = peligro\'.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Libertad (freedom)',
          'Alegría (joy)',
          'Humor y ligereza (humor)',
          'Aceptación de lo imperfecto (acceptance)',
        ],
        explanation: 'La herida de la humillación robó la capacidad de soltar. Su necesidad más profunda es libertad como experiencia interna de que puede existir sin controlarlo todo. Necesita alegría como acción espontánea que no requiera permiso.',
      },
    },
  },
  {
    id: 3,
    key: 'perfeccionista',
    name: 'El Perfeccionista',
    descriptors: 'Exigente · Insatisfecho · Exhausto · Implacable',
    wound: 'Desprotección',
    armor: 'Perfección (amor condicionado al rendimiento)',
    snState: 'Simpático sostenido — dopamina orientada al logro, cortisol crónico',
    teaser: 'El patrón definitorio: «Mi valor depende de mi rendimiento.» El error no toca la conducta: toca la identidad.',
    patterns: [
      {
        name: 'Perfeccionismo',
        description: 'El patrón definitorio. «Mi valor depende de mi rendimiento» es la creencia fundacional. El error no toca la conducta: toca la identidad.',
      },
      {
        name: 'Identidad = producción',
        description: 'Fusión total: soy lo que logro. Sin función profesional, vacío existencial. Es el arquetipo donde este patrón es más puro.',
      },
      {
        name: 'Hiperactivación',
        description: 'Parar = enfrentarse al vacío que hay debajo del hacer. La agenda llena es anestesia contra la pregunta «¿quién soy sin mis logros?»',
      },
      {
        name: 'Hiperresponsabilidad',
        description: '«Si no lo hago yo perfecto, no se hace bien.» Cada oportunidad delegada es una oportunidad de que algo no salga impecable.',
      },
      {
        name: 'Sin límites',
        description: 'Dice sí a todo porque cada proyecto es una oportunidad de demostrar valor. Decir no = renunciar a demostrar que es suficiente.',
      },
      {
        name: 'Negación del cuerpo',
        description: 'El cuerpo es un obstáculo para la productividad. Se alimenta, duerme y se mueve lo mínimo para seguir rindiendo.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Descanso real sin culpa',
          'Nutrición sin restricción punitiva',
          'Movimiento gozoso no competitivo',
          'Contacto incondicional',
        ],
        explanation: 'Opera en modo simpático sostenido con dopamina orientada exclusivamente al logro y cortisol crónico por autoexigencia. Necesita descanso real sin que el sistema lo interprete como fracaso.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Permiso para parar (ease)',
          'Belleza sin utilidad (beauty)',
          'Armonía interna (harmony)',
          'Inspiración genuina (inspiration)',
        ],
        explanation: 'Confunde la activación simpática con productividad. Necesita facilidad y permiso para parar como señal de que detenerse no equivale a morir, y belleza sin utilidad que reconecte con el placer estético desvinculado del rendimiento.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Autoaceptación (acceptance)',
          'Autenticidad (authenticity)',
          'Compasión hacia sí mismo (compassion)',
          'Importar por ser, no por hacer (to matter)',
        ],
        explanation: 'La herida de la desprotección dejó un déficit de aceptación incondicional. Necesita autenticidad como permiso para existir sin fachada, compasión que repare la crueldad del crítico interno.',
      },
    },
  },
  {
    id: 4,
    key: 'dependiente',
    name: 'El Dependiente',
    descriptors: 'Necesitado · Fusionado · Entregado · Codependiente',
    wound: 'Abandono',
    armor: 'Dependencia',
    snState: 'Desregulación HPA — oxitocina dependiente del otro',
    teaser: 'Decir no = arriesgarse al abandono. Si pongo un límite, el otro puede irse. Y si se va, me desintegro.',
    patterns: [
      {
        name: 'Sin límites',
        description: 'Decir no = arriesgarse al abandono. Si pongo un límite, el otro puede irse. Y si se va, me desintegro.',
      },
      {
        name: 'Hiperresponsabilidad',
        description: 'Hacerse imprescindible para que no te dejen. Si cargo con todo, nadie puede prescindir de mí.',
      },
      {
        name: 'Identidad = producción',
        description: 'Orientada al otro: valgo lo que hago POR los demás. Mi producción no es para mí sino para retener al otro.',
      },
      {
        name: 'Hiperactivación',
        description: 'Ansiedad de separación: cualquier señal de distancia emocional del otro dispara la alarma simpática.',
      },
      {
        name: 'Perfeccionismo',
        description: 'Moderado. La perfección no es el motor; la conexión sí. Pero puede aparecer como «si lo hago perfecto, no me abandonarán».',
      },
      {
        name: 'Negación del cuerpo',
        description: 'El Dependiente siente su cuerpo intensamente. Lo que siente es ansiedad de separación, no anestesia.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Nutrición autónoma estabilizadora',
          'Descanso sin depender del otro',
          'Contacto físico sin fusión',
          'Movimiento individual fortalecedor',
        ],
        explanation: 'Presenta desregulación del eje HPA con hiperactividad del sistema de apego. Necesita aprender a nutrirse de forma autónoma, descansar sin depender de la presencia del otro para activar el parasimpático.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Seguridad interna propia (safety)',
          'Estabilidad propia (stability)',
          'Independencia regulatoria (independence)',
          'Espacio propio (space)',
        ],
        explanation: 'Tiene su regulación secuestrada por el otro (corregulación unidireccional). Necesita construir seguridad interna como recurso propio y no prestado, y estabilidad que no dependa de la presencia del otro.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Autonutrición (nurturing)',
          'Autorrespeto (self-respect)',
          'Pertenencia sin fusión (belonging)',
          'Ser conocido sin perderse (to know and be known)',
        ],
        explanation: 'La herida del abandono dejó un vacío de autonutrición que busca llenar a través del otro. Necesita autorrespeto como descubrimiento de que sus propios límites son válidos.',
      },
    },
  },
  {
    id: 5,
    key: 'sumiso',
    name: 'El Sumiso',
    descriptors: 'Sacrificado · Obediente · Resignado · Callado · Invisible',
    wound: 'Vergüenza + opresión',
    armor: 'Sumisión (fawning)',
    snState: 'Congelado entre activación (rabia reprimida) y colapso dorsal (fawning)',
    teaser: 'El «no» fue amputado en la infancia. Expresar una necesidad, una opinión o un límite traía castigo. La voz fue suprimida.',
    patterns: [
      {
        name: 'Sin límites',
        description: 'El «no» fue amputado en la infancia. Expresar una necesidad, una opinión o un límite traía castigo. La voz fue suprimida.',
      },
      {
        name: 'Negación del cuerpo',
        description: 'El cuerpo es el depósito de toda la rabia tragada. La tensión muscular crónica es ira reprimida convertida en inflamación silenciosa.',
      },
      {
        name: 'Hiperresponsabilidad',
        description: 'Invertida: no desde el heroísmo sino desde la obligación. «Si no lo hago, habrá consecuencias.»',
      },
      {
        name: 'Identidad = producción',
        description: 'Versión sumisa: «valgo lo que aguanto», no «valgo lo que produzco». Su valor es la resistencia, no el logro.',
      },
      {
        name: 'Perfeccionismo',
        description: 'Bajo: no busca perfección sino supervivencia. Solo aparece como «si no doy motivos de queja, estaré seguro».',
      },
      {
        name: 'Hiperactivación',
        description: 'Paradójica: calma exterior (fawning) pero por dentro hay activación simpática reprimida que se somatiza.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Expresión corporal libre',
          'Contacto donde él decida',
          'Descanso sin culpa ni servicio',
          'Alimentación por placer propio',
        ],
        explanation: 'Acumula tensión muscular crónica por represión de la ira (cortisol e inflamación silenciosa). Necesita expresión corporal libre que descargue la rabia acumulada en la musculatura.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Elección propia (choice)',
          'Libertad (freedom)',
          'Espacio personal (space)',
          'Espontaneidad (spontaneity)',
        ],
        explanation: 'Está congelado entre la activación (rabia reprimida) y el colapso dorsal (sumisión/fawning). Necesita elección propia como experiencia corporal de agencia, y libertad para que el sistema registre que decir \'no\' no trae aniquilación.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Autoexpresión (self-expression)',
          'Dignidad y valor propio (self-respect)',
          'Ser visto (to see and be seen)',
          'Participación activa (participation)',
        ],
        explanation: 'La herida de la vergüenza y la opresión dejaron sin autoexpresión, la necesidad más borrada de su mapa emocional. Necesita dignidad como experiencia corporal de que sus necesidades importan.',
      },
    },
  },
  {
    id: 6,
    key: 'autosuficiente',
    name: 'El Autosuficiente',
    descriptors: 'Desconectado · Solitario · Inaccesible · Intocable',
    wound: 'Rechazo',
    armor: 'Autosuficiencia (apagón emocional)',
    snState: 'Dorsal vagal — apagón parasimpático, disociación, aplanamiento afectivo',
    teaser: 'El cuerpo fue anestesiado porque sentir era demasiado peligroso. Necesitar dolía más que no tener. El apagón somático es total.',
    patterns: [
      {
        name: 'Negación del cuerpo',
        description: 'El cuerpo fue anestesiado porque sentir era demasiado peligroso. Necesitar dolía más que no tener. El apagón somático es total.',
      },
      {
        name: 'Identidad = producción',
        description: 'La productividad como sustituto de la conexión: si no puedo conectar con personas, al menos puedo producir resultados.',
      },
      {
        name: 'Perfeccionismo',
        description: 'Orientado a la autonomía: «si lo hago perfecto, no necesito a nadie». La perfección garantiza que no haya dependencia.',
      },
      {
        name: 'Hiperresponsabilidad',
        description: 'No asume la carga de otros porque la relación no le interesa. Solo asume lo suyo, pero lo asume solo.',
      },
      {
        name: 'Hiperactivación',
        description: 'Su estado dominante es dorsal vagal (apagón), no simpático. Se quema por vacío, no por exceso.',
      },
      {
        name: 'Sin límites',
        description: 'Invertido: el Autosuficiente pone límites de sobra. Pero son muros que impiden la conexión, no límites sanos.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Contacto físico gradual y seguro',
          'Alimentación como autocuidado',
          'Descanso sin hipervigilancia',
          'Movimiento que reconecte con el cuerpo',
        ],
        explanation: 'Opera en dorsal vagal. Necesita contacto físico gradual que reactive la oxitocina sin disparar la alarma, alimentación como acto consciente de autocuidado, y movimiento que reconecte con sensaciones corporales anestesiadas.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Seguridad para sentir (safety)',
          'Calidez regulada (warmth)',
          'Conexión gradual (closeness)',
          'Presencia sin invasión (presence)',
        ],
        explanation: 'Está colapsado en dorsal vagal (desconexión, aplanamiento, disociación). Necesita seguridad para sentir porque su neurocepción interpreta el sentir como amenaza, y calidez regulada en dosis que no disparen el reflejo de huida.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Pertenencia (belonging)',
          'Aceptación (acceptance)',
          'Intimidad sin aniquilación (intimacy)',
          'Ser visto sin ser destruido (to see and be seen)',
        ],
        explanation: 'La herida del rechazo dejó sin pertenencia, la necesidad que su sistema consideró demasiado peligrosa. Necesita aceptación como experiencia de que su existencia es bienvenida.',
      },
    },
  },
  {
    id: 7,
    key: 'arrogante',
    name: 'El Arrogante',
    descriptors: 'Soberbio · Crítico · Intelectual · Infranqueable',
    wound: 'Impotencia',
    armor: 'Superioridad',
    snState: 'Simpático de dominancia — testosterona y dopamina competitiva',
    teaser: 'Competitivo: no busca perfección por miedo al error sino por necesidad de superioridad. «Si soy el mejor, nadie puede hacerme pequeño.»',
    patterns: [
      {
        name: 'Perfeccionismo',
        description: 'Competitivo: no busca perfección por miedo al error sino por necesidad de superioridad. «Si soy el mejor, nadie puede hacerme pequeño.»',
      },
      {
        name: 'Identidad = producción',
        description: 'Doble: «valgo lo que logro Y lo que los demás no logran». La identidad depende de producir más que todos.',
      },
      {
        name: 'Hiperactivación',
        description: 'Orientada a dominancia: testosterona + dopamina competitiva. No es ansiedad sino impulso de estar siempre arriba.',
      },
      {
        name: 'Hiperresponsabilidad',
        description: 'Selectiva: asume el mérito, no la carga. Lidera desde arriba, no desde el servicio.',
      },
      {
        name: 'Negación del cuerpo',
        description: 'Parcial: el cuerpo es exhibición (torso expandido, presencia imponente) pero no sensación. Pelvis retraída, cuello rígido.',
      },
      {
        name: 'Sin límites',
        description: 'Pone límites sin problema, pero desde la superioridad y el desdén, no desde la igualdad.',
      },
    ],
    needs: {
      biochemical: {
        title: 'Necesidad bioquímica',
        items: [
          'Contacto que permita vulnerabilidad',
          'Movimiento no competitivo',
          'Descanso sin justificación',
          'Expresión corporal auténtica',
        ],
        explanation: 'Mantiene activación simpática orientada a la dominancia con bloqueo de tristeza y vergüenza. Necesita contacto físico que permita bajar la guardia y experimentar vulnerabilidad sin colapso.',
      },
      nervousSystem: {
        title: 'Necesidad del sistema nervioso',
        items: [
          'Comunión con otros (communion)',
          'Igualdad relacional (equality)',
          'Armonía sin jerarquía (harmony)',
          'Facilidad para sentir (ease)',
        ],
        explanation: 'Está en modo simpático de dominancia (la mejor defensa es el ataque). Necesita comunión como experiencia de igualdad que desactive la jerarquía defensiva, y armonía donde el nervio vago ventral se active en horizontalidad.',
      },
      emotional: {
        title: 'Necesidad emocional',
        items: [
          'Vulnerabilidad segura (intimacy)',
          'Compasión (compassion)',
          'Mutualidad (mutuality)',
          'Ser conocido de verdad (to know and be known)',
        ],
        explanation: 'La herida de la impotencia dejó sin acceso a la vulnerabilidad segura, la necesidad que más teme y más necesita. Requiere compasión que derrita la coraza de superioridad.',
      },
    },
  },
]

// ─── MAPEO P6+P4+P2 → ARQUETIPO ─────────────────────────────────────────────

/**
 * Mapea las respuestas P6 (frase identitaria), P4 (patrón emocional)
 * y P2 (sueño) a uno de los 7 arquetipos del sistema nervioso.
 *
 * Lógica basada en la matriz de conexiones (arquetipos-conexiones.jpeg):
 * - P6 selecciona el grupo primario (4 perfiles ego → subset de arquetipos)
 * - P4 + P2 refinan al arquetipo específico
 *
 * P6 opciones: A (Productivo Colapsado), B (Fuerte Invisible),
 *              C (Cuidador Exhausto), D (Controlador Paralizado)
 * P4 opciones: A-D (patrones emocionales)
 * P2 opciones: A-D (patrones de sueño)
 */
export function getArchetype(p6: string, p4: string, p2: string): ArchetypeData {
  // P6 = perfil ego primario
  // A = Productivo Colapsado → Perfeccionista o Arrogante
  // B = Fuerte Invisible → Escéptico o Autosuficiente
  // C = Cuidador Exhausto → Dependiente o Sumiso
  // D = Controlador Paralizado → Obsesivo

  switch (p6) {
    case 'A': {
      // Productivo Colapsado: Perfeccionista vs Arrogante
      // P4='A' (ansiedad/agotamiento) → Perfeccionista (se quema solo)
      // P4='B' (irritabilidad) → Arrogante (se quema contra otros)
      // P4='C' (tristeza/vacío) → Perfeccionista (vacío bajo el logro)
      // P4='D' (desconexión) → Arrogante (coraza de superioridad)
      if (p4 === 'B' || p4 === 'D') {
        return ARCHETYPES[6] // Arrogante
      }
      return ARCHETYPES[2] // Perfeccionista
    }

    case 'B': {
      // Fuerte Invisible: Escéptico vs Autosuficiente
      // P2='A'/'B' (duerme mal / tarda en dormirse) → Escéptico (hipervigilancia nocturna)
      // P2='C'/'D' (se despierta / duerme bien) → Autosuficiente (apagón, no vigilancia)
      // P4 refina: desconexión emocional → más Autosuficiente
      if (p4 === 'D' || (p2 === 'C' && p4 !== 'A')) {
        return ARCHETYPES[5] // Autosuficiente
      }
      return ARCHETYPES[0] // Escéptico
    }

    case 'C': {
      // Cuidador Exhausto: Dependiente vs Sumiso
      // P4='A' (ansiedad) → Dependiente (ansiedad de separación)
      // P4='C' (tristeza) → Dependiente (pérdida)
      // P4='B' (irritabilidad) → Sumiso (rabia reprimida)
      // P4='D' (desconexión) → Sumiso (fawning/shutdown)
      if (p4 === 'B' || p4 === 'D') {
        return ARCHETYPES[4] // Sumiso
      }
      return ARCHETYPES[3] // Dependiente
    }

    case 'D': {
      // Controlador Paralizado → Obsesivo (mapeo directo)
      return ARCHETYPES[1] // Obsesivo
    }

    default:
      // Fallback: Perfeccionista (el más común en ejecutivos con burnout)
      return ARCHETYPES[2]
  }
}

/** Obtiene un arquetipo por su key */
export function getArchetypeByKey(key: string): ArchetypeData | undefined {
  return ARCHETYPES.find((a) => a.key === key)
}

/** Todos los arquetipos (para admin/debug) */
export function getAllArchetypes(): ArchetypeData[] {
  return ARCHETYPES
}
