Título 1: Definición del reto
# GeoWave — Presentación para NASA Space Apps Challenge Málaga 2026

El cambio es constante en el sistema ambiental interconectado de la Tierra, y cuando este se produce en una dirección consistente (aumento o disminución, incremento o disminución, engrosamiento o adelgazamiento), las variables medidas lo reflejan. Sin embargo, una variable medida en datos de ciencias de la Tierra puede presentar una tendencia en una región y la opuesta en otra, incluso cuando el mismo proceso impulsa ambas. La multitud de variables de datos de ciencias de la Tierra dificulta la selección de aquellas que podrían indicar un cambio y, posteriormente, el análisis de las variables seleccionadas. Su desafío consiste en crear una herramienta que permita seleccionar variables medidas por misiones de ciencias de la Tierra o generadas por modelos de ciencias de la Tierra, visualizar cómo cambian con el tiempo y determinar qué está cambiando, dónde está cambiando, cuánto está cambiando y si estos cambios son lo que los científicos denominan "significativos".
> **ALCANCE DE ESTE REPOSITORIO:** Contiene únicamente el código de la **presentación web** (7 diapositivas). La aplicación interactiva CesiumJS 3D es un proyecto separado del equipo y se enlaza externamente desde `js/config.js`.

---

FONDO
## 1. ¿Qué es GeoWave?

Los instrumentos a bordo de los satélites observan diversos aspectos del sistema terrestre: en la tierra, en la atmósfera y en los océanos. Los modelos globales también utilizan datos de instrumentos satelitales y otros tipos de datos para examinar y analizar el sistema terrestre. Una razón importante para ello es observar y caracterizar los cambios en el sistema terrestre. Estos cambios, especialmente aquellos que se desarrollan en una dirección determinada a lo largo del tiempo (una tendencia), indican tanto los procesos que los causan como los procesos que responderán a ellos.
GeoWave es una plataforma que **convierte datos satelitales complejos en información visual comprensible** para cualquier persona. Tomamos matrices de radar, modelos de elevación y telemetría orbital — datos que normalmente solo entienden científicos especializados — y los transformamos en mapas 3D interactivos, comparaciones antes/después, y una red de conocimiento compartido.

Un factor que complica este trabajo es la gran variedad de variables que se pueden estudiar. Otro factor es que los cambios en una variable particular pueden variar en una dirección en una región y en la dirección opuesta en otra, ¡incluso cuando ambas tendencias son causadas por el mismo proceso! Por lo tanto, este problema tiene dos partes importantes: encontrar variables que presenten tendencias, desde las más simples como la temperatura y la precipitación hasta las más complejas como la evaporación o el caudal de los ríos; y analizar las tendencias en regiones específicas de la tierra, el océano o incluso los niveles de la atmósfera.
**El problema que resuelve:**
Cada año ocurren más catástrofes ambientales. Cada año los satélites capturan más datos. Pero esos datos no llegan a la sociedad de forma comprensible. GeoWave cierra esa brecha.

Instrumentos como el espectrorradiómetro de imágenes de resolución moderada (MODIS), el instrumento de monitoreo de ozono (OMI), el radiómetro infrarrojo atmosférico (AIRS) y el sistema de medición de precipitación global (GPM) proporcionan variables analizables. Los modelos globales, en particular el Análisis retrospectivo de la era moderna para la investigación y las aplicaciones, versión 2 (MERRA-2) y el Sistema global de asimilación de datos terrestres (GLDAS), proporcionan muchas más. Encontrar, analizar y relacionar tendencias significativas con los procesos que las originan es uno de los usos más importantes de los datos de ciencias de la Tierra de la NASA.
**La propuesta:**
> *Datos complejos → Información visual → Decisiones inteligentes*

OBJETIVOS
---

Una respuesta exitosa a este desafío requerirá la combinación de varios elementos importantes.
## 2. Identidad Visual

El primer paso consiste en identificar variables de interés en las ciencias de la Tierra que puedan investigarse para detectar posibles tendencias. Como se indica en la sección de Antecedentes, la NASA y otras agencias espaciales ofrecen numerosas variables, algunas conocidas y otras más especializadas para su uso en ramas específicas de la ciencia.
**Principio rector:** Esta presentación evita deliberadamente los colores genéricos de "tecnología": negro puro y azul neón. En su lugar adopta una **paleta editorial inspirada en las Ciencias de la Tierra**:

La segunda consiste en adquirir las variables de datos para una región en particular, ya que la mayoría de las tendencias en los datos no serán globales, ¡aunque algunas tendencias sí pueden serlo!
| Rol | Color | Hex | Significado |
|-----|-------|-----|-------------|
| Fondo principal | Pizarra profunda | `#0D131F` | Cosmos sin frialdad agresiva |
| Superficie / Tarjetas | Grafito mineral | `#161E2E` | Profundidad y textura editorial |
| Acento primario | Turquesa mineral | `#2DD4BF` | Agua, detección SAR, elementos activos |
| Acento alerta | Terracota cálido | `#E06D53` | Lava, deformación, impacto humano |
| Acento advertencia | Ámbar geológico | `#F59E0B` | Sedimentos, fallas, metadatos críticos |
| Texto principal | Blanco nieve | `#F8FAFC` | Legibilidad máxima |
| Texto secundario | Gris arenisca | `#94A3B8` | Descripciones y parámetros |

El tercer paso consiste en generar y visualizar una serie temporal para la variable y la región de interés durante un período de tiempo lo suficientemente largo como para permitir el análisis estadístico.
**Tipografías:** `Space Grotesk` (titulares técnicos) + `Inter` (cuerpo de texto) + `JetBrains Mono` (datos y código)

El último elemento del desafío consiste en realizar un análisis estadístico básico de esa serie temporal, indicando la tasa de cambio a lo largo del tiempo, y comprobar la significancia de la tendencia utilizando métodos como la prueba t, la prueba de Mann-Kendall o los intervalos de confianza.
---

Los sitios web de datos ofrecen herramientas para generar series temporales, y los paquetes de análisis estadístico proporcionan pruebas de significancia básicas. Una solución que combine la visualización y el análisis cumple con todos los requisitos de este desafío.
## 3. Las 7 Diapositivas — Estructura Narrativa

CONSIDERACIONES POTENCIALES
La presentación cuenta una historia en 7 actos, diseñada para captar atención en los primeros 10 segundos y cerrar con un llamado claro a la acción:

Usted puede (pero no está obligado a) considerar lo siguiente:

Audiencia

Este reto implica el uso de datos científicos y análisis estadísticos, por lo que el público objetivo probable son estudiantes de secundaria y universitarios, así como miembros del público con ciertos conocimientos científicos.
Proporcionar definiciones sencillas de las variables ayudaría considerablemente a estos usuarios.
La idea es ayudar a los usuarios a convertirse en detectives de datos: encontrar variables de interés y luego determinar si esas variables muestran una tendencia y si esa tendencia es significativa.
Enfoque

Los usuarios podrían responder a una breve serie de preguntas sobre qué o dónde les gustaría investigar, y las respuestas permitirían buscar variables de datos relacionadas. Sería muy útil proporcionar un par de ejemplos demostrativos que el usuario pudiera ver para comprender cómo funciona la herramienta.
Aunque no es obligatorio, el SI podría ser útil en este caso para identificar datos con el potencial de mostrar tendencias en áreas particulares, basándose en artículos de noticias y trabajos de investigación o en las características de una región como un desierto, una selva tropical, un estuario de mareas o la atmósfera sobre una gran ciudad.
Trabajar con los datos

Los datos de ciencias de la Tierra están disponibles con diferentes resoluciones temporales: horaria, trimestral, diaria y mensual. Para este desafío, los datos diarios y mensuales son probablemente los más fáciles de procesar.
Encontrar una tendencia es interesante, incluso si no alcanza un nivel de significancia estadística. A veces, para que una tendencia se vuelva significativa, basta con un período más prolongado para la recopilación de datos.
Considere la posibilidad de buscar herramientas disponibles públicamente para representar gráficamente datos hidrológicos, ofrecidas por organizaciones externas como el Consorcio de Universidades para el Avance de la Ciencia Hidrológica, Inc. (CUAHSI).
El análisis de tendencias con datos de ciencias de la Tierra puede ser complejo. Las tendencias pueden ser no lineales, y algunas no son evidentes a menos que se eliminen los ciclos regulares, como el ciclo estacional. Los análisis de tendencias más complejos quedan fuera del alcance previsto para este desafío; detectar y analizar tendencias lineales sería un excelente punto de partida.

Para obtener datos y recursos relacionados con este desafío, consulte la pestaña Recursos en la parte superior de la página. Es posible que se añadan más recursos antes de que comience el hackathon.



Título 2: Requisitos del reto

Para que un proyecto presentado en la NASA Space Apps Challenge Málaga 2026 resulte competitivo, cumpla con los estándares de la organización y tenga opciones reales tanto en los premios locales como en la fase global (Global Nominees), debe reunir una serie de características clave.  
A continuación se detallan las características necesarias y beneficiosas extraídas de las guías oficiales:
1. Definición del Problema y Enfoque Estratégico
Viñeta Prioridad al problema sobre la tecnología: La solución debe partir de la lectura profunda del enunciado del reto, respondiendo claramente a qué necesidad concreta aborda, a quién afecta y por qué es relevante.  
Viñeta Alcance realista de 48 horas: Debe acotarse a una misión viable para un fin de semana: un destinatario o contexto específico, una necesidad concreta, una salida demostrable y una prueba mínima, dejando el resto de funcionalidades complejas como trabajo futuro.  
2. Integración Sustancial de Recursos de la NASA
Viñeta Uso obligatorio de datos o herramientas oficiales: Para optar a los Global Awards, es imprescindible utilizar al menos un recurso NASA del reto (portales de datos científicos, APIs, catálogos abiertos o Earthdata).  
Viñeta Función real y demostrable: Se desestiman los usos puramente decorativos (como logotipos o enlaces estáticos). El proyecto debe justificar explícitamente dónde interviene el recurso y qué aporta o cambia de forma sustancial en los resultados.  
3. Validez Científica, Técnica y Funcional
Viñeta Rigor y trazabilidad de los datos: Las fuentes deben documentar su procedencia, versiones, licencias, unidades, cobertura y limitaciones, distinguiendo claramente entre datos de observación, transformaciones, inferencias o datos sintéticos.  
Viñeta Transparencia en el desarrollo: Se debe diferenciar con total honestidad lo que está construido y funciona realmente, lo que es una simulación y lo que forma parte de hipótesis o fases futuras.  
4. Alineación con los Criterios de Evaluación del Jurado
Viñeta Impacto: Calidad y magnitud del beneficio posible respaldado por evidencias.  
Viñeta Creatividad: Originalidad del enfoque o aportación de una mejora significativa frente a otras alternativas.  
Viñeta Validez: Solidez del fundamento científico, viabilidad técnica y lógica de la solución.  
Viñeta Relevancia: Grado de respuesta al reto y profundidad en la integración de los recursos NASA.  
Viñeta Presentación: Claridad, estructura y eficacia comunicativa para transmitir el valor del proyecto.  
5. Estructura y Calidad de la Entrega en la Plataforma (Project Page y Demo)
Viñeta Resumen claro (Summary): Un texto de entre 50 y 200 palabras que funcione como mapa del proyecto (qué se ha desarrollado, cómo responde al reto y por qué importa).  
Viñeta Project Demo optimizada: Un único enlace público que consista en un máximo de 7 diapositivas (incluyendo la portada) o un vídeo de hasta 30 segundos, diseñados para ser claros, honestos y comprensibles por sí mismos.  
Viñeta Final Project accesible: Enlace público al repositorio, sitio web o material principal con instrucciones claras de navegación para que el jurado pueda revisar la solución.  
6. Cumplimiento Operativo, Ético y Normativo
Viñeta Idioma en inglés: La página del proyecto, las diapositivas y los textos escritos deben presentarse estrictamente en inglés. En caso de incluir un vídeo narrado en otro idioma, este debe incorporar subtítulos obligatorios en inglés.  
Viñeta Acceso público sin restricciones: Todos los enlaces aportados deben ser completamente públicos y accesibles sin necesidad de contraseñas, registros, permisos o inicio de sesión (comprobable en una ventana de incógnito).  
Viñeta Privacidad y protección de menores: Quedan excluidos nombres, voces o imágenes reconocibles de menores de 18 años en los materiales enviados.  
Viñeta Uso responsable y declaración de IA: Las herramientas de Inteligencia Artificial están permitidas siempre que se declare su uso, se marquen los contenidos generados y el equipo mantenga la total autoría y verificación de los resultados.  
Viñeta Envío formal obligatorio (Submit for Judging): Es requisito indispensable completar el proceso de envío y obtener la confirmación en la plataforma oficial antes de la hora límite, ya que guardar borradores (Save Progress) o entregar archivos en carpetas locales no sustituye el envío oficial.



Título 3: Nuestro proyecto.


# **Proyecto NASA Space Apps Challenge Málaga**

## **Plataforma colaborativa de visualización 3D de catástrofes naturales mediante datos NISAR**

La idea tiene bastante potencial porque aborda uno de los principales problemas de la observación terrestre por satélite: **disponemos de enormes cantidades de datos científicos sobre lo que sucede en nuestro planeta, pero no siempre somos capaces de interpretar visualmente qué significan esos datos y cómo afectan al territorio.**

Mi recomendación es que no presentéis el proyecto simplemente como una herramienta para consultar mapas satelitales. Presentadlo como una plataforma que transforma datos científicos complejos en experiencias visuales comprensibles, comparables y compartibles.

Hay tres conceptos que deberían vertebrar todo el proyecto:

1. **Comprender:** visualizar qué ha sucedido realmente en una zona afectada por una catástrofe.
2. **Comparar:** observar cómo ha cambiado el territorio antes, durante y después del acontecimiento.
3. **Anticipar:** utilizar el conocimiento de acontecimientos anteriores para mejorar la evaluación de riesgos y la preparación ante futuras catástrofes.

# **1. Resumen ejecutivo del proyecto**

# **Una nueva forma de observar las catástrofes naturales**

[India's Nisar satellite images Brahmaputra river during Assam monsoon floods](https://images.openai.com/static-rsc-4/n7ck_o3RKj7oeK3px0KKxRRaZ_QSssegzeKe1YsfV67nkujfYVzAzoWcQ1v111HuKp7TWVvaSyRMvqP0KEhS_TVvI8izZAbDtVSyb3zMQHIMIbkGzJ5aLkVOX7fHKHGW6z7loSpeF_61vx0MSjB267nAK-lp_H9CFPUQZTWARvY?purpose=inline)

[Le saviez-vous ? LiDAR et Bouches du Rhône](https://images.openai.com/static-rsc-4/ETqay6z0Or1gGJiUfgTE58n1qjWB8KtTzvD03TprVNELv_gHynFfqcl3Ryg_F9FwPdCb7CFzkWVw58vw77dbPneZ2tWsD7H3IJYDxC5NHT9RWRdCbHHuCAKWodN0JjA6yL7UrqZ_R8ysbsiIur9dEZCJcJn4Kuiqj2oHhG4C16g?purpose=inline)

[TRAIL: Traceable AI for Billion-Dollar Builds | By KorrAI](https://images.openai.com/static-rsc-4/parBK4Lwe0WLUueus25z4f_nHVo6yQJcjPRd2-Z9Dp0cGecpHS_fk9WcGpsMao6B2Gga2_N-iPc3oDUHRFHc32jQuKStuGxGSpJ-zmNXr69sA3L4fq7k0_xr17MIOLTtM3Y9nRCUtGLTSaOpeJQGVDKRnNOZMuX-Q31ll3UD7ig?purpose=inline)

11

Concepto de proyecto

**Una plataforma web interactiva y colaborativa que permite explorar la evolución de un territorio afectado por una catástrofe natural mediante datos de observación terrestre de NISAR.**

### **¿Qué problema queremos resolver?**

Cuando se produce una catástrofe natural, como una inundación, un terremoto, un deslizamiento de tierra o una erupción volcánica, se generan grandes cantidades de información geoespacial.

Los datos satelitales permiten estudiar:

- Qué zonas han resultado afectadas.
- Cómo ha cambiado la superficie terrestre.
- Qué desplazamientos o deformaciones ha experimentado el terreno.
- Cómo ha evolucionado el fenómeno con el paso del tiempo.
- Qué áreas presentan características similares a las de otros acontecimientos.

Sin embargo, esta información suele estar distribuida en diferentes productos científicos y requiere conocimientos técnicos para interpretarla.

**Nuestra propuesta consiste en convertir esos datos en una representación tridimensional, temporal e interactiva del territorio.**

### **¿Cómo funcionaría?**

El usuario accedería a un globo terráqueo interactivo desde el que podría seleccionar una región geográfica mediante un recuadro.

[New! NOAA Launches New, Interactive Satellite Maps | NESDIS | National Environmental Satellite, Data, and Information Service](https://images.openai.com/static-rsc-4/9fDGC3dVGO2HnISQPvK8TUH6LAe8yEPOsMOEPBeDNtL4WdHhqj_f8LT-Y_cB_efTqlOIDtJl_6ZW5YssysY0_9K206r8iu7KeB19DhWn0xk03oZqJIH0_eooi1VEW24SJpsRbiJ_dJ-z_FYC4ZHtCMgH8yFyyhwGd1U8FR9Axkc?purpose=inline)

[nesdis.noaa.gov](https://www.nesdis.noaa.gov/news/new-noaa-launches-new-interactive-satellite-maps?utm_source=chatgpt.com)

Posteriormente podría:

1. Seleccionar una región mediante coordenadas geográficas.
2. Establecer un periodo temporal.
3. Elegir el tipo de acontecimiento que desea estudiar.
4. Consultar los datos satelitales disponibles.
5. Generar una visualización tridimensional del territorio.
6. Comparar distintos momentos para identificar los cambios producidos.
7. Guardar y publicar su estudio para que otras personas puedan consultarlo.

### **¿Qué componente social tendría?**

La plataforma incorporaría una biblioteca pública de estudios geográficos.

Cada estudio podría:

- Tener un título, descripción y localización.
- Incluir una visualización 3D interactiva.
- Incorporar diferentes fechas y capas de información.
- Recibir comentarios, aportaciones y valoraciones.
- Obtener popularidad mediante un sistema de me gusta.
- Permitir que otros usuarios amplíen el análisis con nuevas perspectivas.

De esta forma, no sería únicamente una herramienta de visualización, sino también una comunidad de conocimiento geográfico y científico.

# **2. Una precisión científica importante: qué podemos hacer realmente con NISAR**

Este apartado es especialmente importante para que el proyecto sea técnicamente sólido y no os puedan cuestionar durante la presentación.

[NISAR in Orbit (Artist's Concept) - NASA Science](https://images.openai.com/static-rsc-4/PGXqjDsKyjwmh7-nilHu87OcaYfOPNEl-qtmBO4Z3nV-XKlGWUgkGf4NEEZKPZ-1_yoUeHBTP93OUJL0rUdKPh-8SfNXbP8G4qhERnHt_sV2gcK9RipJ_on9AfxlufYSaMwl1miS83fL0DvIjDdHk6mStiiYBgBbONqpBlbUDn4?purpose=inline)

**NISAR**

Satélite desarrollado conjuntamente por NASA e ISRO, lanzado el 30 de julio de 2025. Utiliza dos bandas de radar, L y S, para estudiar los cambios en la superficie terrestre.

Fuente: NASA.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://science.nasa.gov\&sz=32)

NASA Science+1



NISAR resulta especialmente interesante porque utiliza radar de apertura sintética (SAR). Esto permite observar la superficie terrestre incluso con nubosidad y durante la noche.

Entre sus aplicaciones se encuentran:

- Seguimiento de terremotos y desplazamientos del terreno.
- Estudio de deslizamientos y movimientos de ladera.
- Monitorización de inundaciones.
- Cambios en vegetación, ecosistemas y humedad del suelo.
- Seguimiento de glaciares y otros procesos ambientales.

Su ciclo de repetición orbital es de 12 días y su resolución SAR depende del modo de adquisición, aproximadamente entre 3 y 10 metros. Sus datos son de acceso público.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://science.nasa.gov\&sz=32)

NASA Science+2



## **Una distinción que debéis incorporar al proyecto**

Hay una diferencia entre construir un modelo tridimensional del terreno y detectar los cambios que se producen en él.

| Elemento                                | De dónde obtenerlo                                                |
| --------------------------------------- | ----------------------------------------------------------------- |
| Geometría y elevación del terreno (DEM) | Copernicus DEM, SRTM, PNOA u otras fuentes                        |
| Cambios en la superficie                | NISAR SAR y otros satélites                                       |
| Desplazamientos del terreno             | Interferometría SAR (InSAR), cuando las adquisiciones lo permiten |
| Extensión de inundaciones               | Procesamiento de imágenes SAR y otros datos                       |
| Evolución temporal                      | Comparación de adquisiciones de diferentes fechas                 |

**Mi recomendación:** que el modelo 3D sea una representación del relieve real sobre la que se superponen capas de cambios detectados por satélite.

Por ejemplo, el relieve puede representarse en tres dimensiones y las zonas inundadas aparecer en azul, las zonas con cambios importantes en rojo y las zonas sin cambios significativos en tonos neutros.

También podéis mostrar desplazamientos verticales o deformaciones cuando los datos interferométricos permitan estimarlos. Hay que tener en cuenta que InSAR mide desplazamientos en la dirección de observación del satélite, no necesariamente la altura vertical exacta.

### **¡Atención con el ejemplo de Valencia!**

La DANA de Valencia ocurrió el 29 de octubre de 2024. NISAR no fue lanzado hasta el 30 de julio de 2025.

Por tanto, **no podéis afirmar que vais a reconstruir la DANA de Valencia utilizando imágenes NISAR de octubre de 2024**, porque esas imágenes no existen.

Esto no perjudica el proyecto. De hecho, os propongo una solución mejor:

- Utilizar Sentinel-1, Sentinel-2, Landsat y modelos digitales de elevación para reconstruir la DANA de Valencia.
- Diseñar el procesamiento de manera compatible con los productos SAR de NISAR.
- Incorporar NISAR para estudios de acontecimientos posteriores a su lanzamiento y para el seguimiento de cambios actuales.

La ESA publicó mapas de inundación de Valencia utilizando Sentinel-1, comparando imágenes del 19 y el 31 de octubre de 2024. Es una referencia excelente para vuestro primer caso de demostración.&#x20;

[image](https://www.google.com/s2/favicons?domain=https://www.esa.int\&sz=32)

Valencia, Spain+1



# **3. Los tres ejemplos de la DEMO**

Os recomiendo que los tres ejemplos no sean tres inundaciones distintas. Es preferible demostrar que vuestra plataforma tiene utilidad para diferentes tipos de catástrofes.

[Disastrous floods south of Valencia, Spain | Copernicus](https://images.openai.com/static-rsc-4/mA01F4JDutNGD11nwbd1An8Og33O8w3EZ16iLCMxbHBJqelzoiDePoI7tQNKdsnO-QJk2bsQ7LC7nhv9_UhLqOBTH3_50FsBpu_UNAfDJB0Lfvt4jixyZaewzZc-6gZBr_iafsKtnniGYuOScSbvlM-jqA89lBEZy9ZQhxJG4TU?purpose=inline)

**01. DANA de Valencia (España, 2024)**

Ejemplo principal

**Fenómeno:** inundación y avenida torrencial.

**Qué mostrar:** comparación del territorio antes y después, extensión de las zonas inundadas, terrenos agrícolas afectados y proximidad a núcleos urbanos e infraestructuras.

**Fuentes:** Sentinel-1, Sentinel-2, Landsat y DEM.



[image](https://www.google.com/s2/favicons?domain=https://www.esa.int\&sz=32)

Valencia, Spain+2



[ESA - New lava river captured by Copernicus Sentinel-2](https://images.openai.com/static-rsc-4/Dk0EkN7ti26wPuEIN8N6evJ0RW97s7GMFouwk1M4nf79NNcfKnDcxctSlU17m0fa9HhAmXKpAuUDOieHLMe9TVE9q3xRNCHGpt6BhVs5GVwHfnZ8R-41JhImBotlP3PAiS7HLvbz7urhSPyxWZCe7c2Idk2N_VBqVoNLqNaEy8E?purpose=inline)

**02. Erupción del volcán de La Palma (España, 2021)**

**Fenómeno:** erupción volcánica y transformación del paisaje.

**Qué mostrar:** relieve anterior, extensión de las coladas, transformación de la superficie y terreno cubierto por lava.

**Fuentes:** Sentinel-1, Sentinel-2, Landsat y DEM.

[Displacements obtained from Sentinel 1 satellite images were determined by the joint work of Zonguldak Bülent Ecevit University Disaster Implementation and Research Center and Geomatics Engineering… | Caglar Bayik](https://images.openai.com/static-rsc-4/-MYfeOO7iOlqlXUf44PIEU8v1f8cemL6Rpc2TI7_IjgPkHfUqCF8An_rxGrehej3KOWC9yTJZJTjpQycR_lNHsncdLeighJHmKZEAdgc_uw1Y8REO2yaLpuQ0rlYNdIPLmT4AoHzZm4az7sP-tvdSKBQzP1BYmTqKKPOR7Knc4w?purpose=inline)

**03. Terremotos de Turquía (febrero de 2023)**

**Fenómeno:** terremotos y deformación de la corteza terrestre.

**Qué mostrar:** desplazamiento del terreno, zonas de deformación y comparación de imágenes anteriores y posteriores.

**Fuentes:** Sentinel-1 InSAR y modelos digitales de elevación.

Los tres casos demuestran tres capacidades diferentes:

| Caso     | Capacidad que demuestra    |
| -------- | -------------------------- |
| Valencia | Detección de inundaciones  |
| La Palma | Transformación del relieve |
| Turquía  | Deformación del terreno    |

La ventaja de este planteamiento es que podéis demostrar que vuestra herramienta no está limitada a un único tipo de catástrofe.

**Importante:** estos son casos de estudio históricos para demostrar el funcionamiento de la plataforma, no ejemplos de observaciones NISAR directas. Podéis añadir un cuarto apartado experimental con adquisiciones NISAR posteriores a julio de 2025.

# **4. Propuesta de presentación: 7 diapositivas**

Mi recomendación es utilizar las siete diapositivas y no el vídeo de 30 segundos. Una presentación os permite explicar el problema, enseñar la demo y defender la innovación técnica.

La presentación debe contar una historia: primero despertamos curiosidad, después demostramos el problema, presentamos la solución y terminamos mostrando su utilidad para el futuro.

DIAPOSITIVA 01 · GANCHO

# **¿Qué pasó realmente en Valencia durante la DANA?**

[Las impactantes imágenes del antes y después de Valencia tras la DANA](https://images.openai.com/static-rsc-4/KMDxenVKcu-YKDzPcfZWS6_va0ZPz_BEzkqYstMZgA8jsxt1ZGJRaqXWtdLAynFYRydLre00V6XOdpA-1YO-yPGkZoOk_R0QjgQg8eMd05aVpl8kSvXK5d55Jwtog0ufYsmr_uznVmNXMKBINv8E2N2kGppdQlLbED3TpI1-xLQ?purpose=inline)

[antena3.com](https://www.antena3.com/noticias/el-tiempo/actualidad/impactantes-imagenes-antes-despues-valencia-dana_202411026726829c2914190001e928f5.html?utm_source=chatgpt.com)

Imagen impactante de la catástrofe, preferiblemente satelital o aérea.

**Texto en pantalla:**

«Sabemos que hubo una inundación. Pero ¿sabemos realmente cómo cambió el territorio?»

**Objetivo:** despertar curiosidad y conectar emocionalmente con un acontecimiento cercano y reconocible.

DIAPOSITIVA 02 · EL PROBLEMA

# **Tenemos los datos. Nos falta hacerlos comprensibles.**

[Ground Deformation from Chilean Volcanic Eruption Shown by Satellite Radar Image - NASA Science](https://images.openai.com/static-rsc-4/S5zlLq7USS2d2KsvoHH1hmuhG3DVgCoVWHVo0tshs1R3uLlco7YI9FGobK-A1CCkvJnRxobAoJ7WnHaMnLX8rCAM9QXfBRq9oR6tiVj8ZhGZrpDFUJdDhSPGhOIlV82FXnxdbp880zGUQ4R4pAFIUIMNDId6VeqyMSSFNk3vSj0?purpose=inline)

[science.nasa.gov](https://science.nasa.gov/photojournal/ground-deformation-from-chilean-volcanic-eruption-shown-by-satellite-radar-image/?utm_source=chatgpt.com)

**Texto en pantalla:**

«Los satélites recopilan información extraordinaria sobre nuestro planeta. Sin embargo, interpretar estos datos requiere conocimientos técnicos y herramientas especializadas».

Tres conceptos visuales:

- Datos complejos.
- Información dispersa.
- Difícil interpretación para el público.

DIAPOSITIVA 03 · LA SOLUCIÓN

# **Convertimos datos satelitales en territorios que podemos explorar.**

[Building Hawk Eye: How We Integrated Google’s Groundsource Dataset Into a Live Disaster Response Agent for the Gemini Live Agent Challenge | by Tayyab | Mar, 2026 | Medium](https://images.openai.com/static-rsc-4/5BVIhaiRdRhV-m6MXWrsZd8xT_s1M2KFIws6tLFZyK714q3SNPKjRWPwEQR37o9jEO1_wjZ5NuZQVKsFNIsRKPAYtxzaQfma2TBP6Bl1LrdRcdbG1DMn_EXYs_NL8n4BZMBH6AvxYygC6EyHZhdWP6istPXi2m3o_F5g0CQR8So?purpose=inline)

[medium.com](https://medium.com/%40half-space/building-hawk-eye-how-we-integrated-googles-groundsource-dataset-into-a-live-disaster-response-f4af490759d7?utm_source=chatgpt.com)

**Texto en pantalla:**

«Una plataforma web que transforma datos de observación terrestre en mapas tridimensionales interactivos y evolutivos».

Aquí introducís el nombre de vuestro proyecto y explicáis que utiliza NISAR y otras fuentes geoespaciales.

DIAPOSITIVA 04 · FUNCIONAMIENTO

# **Del planeta al detalle de una catástrofe.**

[How to Use Spatial Search in a Query - Query Building - Specify Community Forum](https://images.openai.com/static-rsc-4/nBuiLsaLmCiHAerUDX4pN11vVCUDUdhqEb9vnuY-BJy1L5GoUoDfscq5Ey0BXsVO-FDF8JeQS-FPt9KidgOea0_snkGFBGJQhacbiMklKPvrNcFd7miMH_777jF3uYapor6fYMs3ko2mTrpKC8Qq8B8L2JgrIc4PVaN1i1zgyHQ?purpose=inline)

[discourse.specifysoftware.org](https://discourse.specifysoftware.org/t/how-to-use-spatial-search-in-a-query/776?utm_source=chatgpt.com)

**Texto en pantalla:**

1. Selecciona una región del planeta.
2. Delimita el periodo temporal.
3. Procesa los datos disponibles.
4. Explora la evolución tridimensional.

Esta diapositiva debe mostrar vuestra propia interfaz, no una imagen genérica, si ya tenéis el prototipo.

DIAPOSITIVA 05 · IMPACTO VISUAL

# **Valencia: antes, durante y después.**

[Valencia prima e dopo l’alluvione, la catastrofe vista dal satellite](https://images.openai.com/static-rsc-4/tOZAVC-F1rr_KdLm1Grzr-2zuoYezDa1n-Qh-9Pca2mzgHNdEBCkSqJGgwaFOFd1L98putNUtFHgdDKD6tSrZvxYS07N-y2_UJW2bUkyk7WITAJskJjhj_2MmjcLrV3ezCjh0ctdPIv2U6k5mJoee0-BVIhtS_Ca-tc9abAOBOc?purpose=inline)

[rainews.it](https://www.rainews.it/video/2024/10/valencia-prima-e-dopo-lalluvione-la-catastrofe-vista-dal-satellite-e28e2629-5e23-404d-9595-90ab0019478b.html?utm_source=chatgpt.com)

**Texto en pantalla:**

«Una misma región. Diferentes momentos. Una nueva forma de comprender lo ocurrido».

Aquí debéis enseñar el mapa 3D de la DANA, con un control temporal para comparar las fechas.

DIAPOSITIVA 06 · INNOVACIÓN

# **El conocimiento también evoluciona de forma colectiva.**

[Plenum Atlas & Globe — Interactive Map Dashboards & 3D Globe Visualization | Pixelplenum](https://images.openai.com/static-rsc-4/Er2yN7A9nn5Rd0LO0t004X6-zEecXWiRQTeaBD84Q6C1FZLHikfBe5JHkebsR5zSc6_3YqpeyS0bqkF4NvEz1OrQzKC-AApFlCBPMOvoVQ_ANIdF9a_2a0XkYhSdRREavQ0YZz3q2X1FdVXI6z_emZYxwq3QTlfAzse_F_6qccs?purpose=inline)

[pixelplenum.com](https://pixelplenum.com/?utm_source=chatgpt.com)

**Texto en pantalla:**

«Cada usuario puede crear, compartir, consultar y enriquecer estudios geográficos».

Mostrad:

- Biblioteca de acontecimientos.
- Estudios de otros usuarios.
- Me gusta y popularidad.
- Comentarios y aportaciones científicas.

DIAPOSITIVA 07 · VISIÓN DE FUTURO

# **No se trata solamente de comprender lo que pasó. Se trata de estar mejor preparados para lo que pueda pasar.**

[Space Systems Graduate Certificate](https://images.openai.com/static-rsc-4/uW1uBwEAERWCs_8x_JZSq-Cx0am7t4c910JMnnoR5G1YgJb9c7OnWxKm7x8p_wsaAX9AR8VHo7Ohst5TmAxHVHMPANGnh1FpgQ4-BRXBHriAOTWwN51_KrQPYP5gpw_A1kWIc_PdC6g0XGXQEx7XLtO9KoPK1HAU08rb5jjJEM4?purpose=inline)

[eng.auburn.edu](https://eng.auburn.edu/aero/academics/space-systems-graduate-certificate.html?utm_source=chatgpt.com)

**Texto final:**

«Transformar datos en conocimiento. Transformar conocimiento en prevención».

**Cierre:** nuestra plataforma pretende acercar la observación terrestre a las personas y convertir la información científica en una herramienta para comprender, investigar y anticipar riesgos.

# **5. Guion o speech de presentación**

Este es el discurso que utilizaría. Está pensado para una exposición de aproximadamente 3-4 minutos, con un lenguaje natural, persuasivo y comprensible para un jurado que puede tener perfiles científicos, tecnológicos o empresariales.

Guion recomendado

# GUION DE PRESENTACIÓN — NASA SPACE APPS CHALLENGE

### 1. Introducción: el problema

¿Qué pasó realmente en Valencia durante la DANA de octubre de 2024?

Todos hemos visto imágenes de calles inundadas, vehículos arrastrados por el agua y municipios devastados.

Pero hay una pregunta que va más allá de lo que pudimos ver: ¿cómo cambió realmente el territorio?

¿Qué zonas quedaron inundadas? ¿Cómo se transformó la superficie? ¿Qué extensión alcanzó el fenómeno? ¿Y qué podemos aprender de todo ello?

Hoy tenemos satélites capaces de recopilar enormes cantidades de información sobre nuestro planeta. El problema es que gran parte de esos datos son complejos y difíciles de interpretar para quienes no somos especialistas.

### 2. Presentación de la solución

Por eso hemos desarrollado una propuesta: una plataforma web que transforma datos de observación terrestre, especialmente los procedentes de NISAR, en representaciones tridimensionales, interactivas y comprensibles.

Nuestra idea es acercar la observación científica del planeta a cualquier persona.

### 3. Demostración del funcionamiento

Imaginad que queremos estudiar una catástrofe.

Entramos en nuestro globo terráqueo, seleccionamos la región que nos interesa y delimitamos el periodo temporal que queremos investigar.

La plataforma recopila los datos satelitales disponibles para esa zona y genera una representación tridimensional del territorio.

Podemos observar diferentes momentos, comparar el antes y el después, identificar las transformaciones y explorar los resultados de una manera mucho más intuitiva.

Ya no estamos simplemente consultando una tabla de datos o una imagen satelital: estamos explorando cómo ha cambiado nuestro planeta.

### 4. La dimensión colaborativa

Pero queremos ir un paso más allá.

Cada usuario puede crear sus propios estudios, publicarlos y compartirlos con el resto de la comunidad.

Otros investigadores, estudiantes o ciudadanos pueden consultar esos análisis, aportar información, añadir nuevas perspectivas y valorar los trabajos.

Así, cada acontecimiento se convierte en una oportunidad para construir conocimiento colectivo.

### 5. El impacto y el futuro

Y aquí está lo más importante.

Nuestra herramienta no pretende limitarse a explicar qué ocurrió después de una catástrofe.

Queremos que permita estudiar patrones, identificar territorios vulnerables y comprender mejor los factores que pueden agravar las consecuencias de futuros acontecimientos.

Porque cuanto mejor comprendamos cómo responde nuestro planeta, mejor preparados podremos estar para afrontar sus cambios.

### 6. Cierre

Los satélites ya están observando nuestro planeta.

La información ya existe.

Nosotros queremos hacerla visible, comprensible y útil para todos.

**Transformar datos en conocimiento. Transformar conocimiento en prevención.**

## **6. Cómo presentar físicamente la DEMO**

Esta parte es fundamental. Mi recomendación es que la presentación no sea una sucesión de diapositivas explicativas: debe parecer que estáis enseñando un producto que ya existe y funciona.

La demo debería ocupar aproximadamente el 40-50 % del tiempo de vuestra exposición.

### **Secuencia de demostración**

[NASA’s Global Imagery Browse Services (GIBS) Provides Access to Public Catalog of 100+ Satellite Imagery Layers – Cesium](https://images.openai.com/static-rsc-4/mbxgSLWT-kQMUAH5NsNG9lICGbzjiXbGVBm0RygvrUq00VHOER9uo9BZvRu6DfDDkrN87U_3GvgZUAZT-KOnbyTMe7Z8VTc3VkWjiztGTneMIsz5qyDbdVTSiTXLQrsXaYv775KiXHnnEjnyywYnedcXgD1GYUmkLCEXYIbrVvE?purpose=inline)

**Paso 1. Entrada al planeta**

Aparece un globo terráqueo tridimensional que el usuario puede girar, ampliar y explorar.

La interfaz debe ser limpia, con una barra de búsqueda y un botón para crear un nuevo estudio.

*Frase:* «Podemos comenzar nuestra investigación en cualquier lugar del planeta».

[Build Voxel World Tutorial - ngageoint/voxel-globe GitHub Wiki](https://images.openai.com/static-rsc-4/Z84JbhiMV1fVWNHzUSULcBQdKS8ZOhk-rXYkewJ2mdM2vit0eUtuhdi5XO_Ea9wiptbXoSRjNJUT1kqBwWxZHTtd9c1WkoTcsiZ2CJ-F4jru5PES9hvsCFa9-tO-Thjim5r7dQOxxDmHft8u0hDlSbcRe1L32kOU51b8fb6mgw0?purpose=inline)

**Paso 2. Selección geográfica**

El usuario dibuja un rectángulo sobre el mapa. Se muestran las coordenadas de sus cuatro límites.

También puede ajustar el tamaño de la región.

*Frase:* «Seleccionamos exactamente el territorio que queremos estudiar».

[Five Places in Cuba Seen from Space over 37 Years - Havana Times](https://images.openai.com/static-rsc-4/ZYxifx0P9RA1wNv1PB2r7MWhjjgxD6mjM2iyKFAoe7MYpwwlCdP64KBoeJPnfsAIKZfLl8jnt_QB2xj8MdtfpHzPZGJHEx3jIt9oFMx5shurPVndP1VFb50e9wZA8ndGAhm010kDbZdG_T0KOeyCzZgljPxeJqXqPacbiE2bGeU?purpose=inline)

**Paso 3. Selección temporal**

Aparece una línea temporal con fechas de inicio y finalización.

Se indican las adquisiciones disponibles y los días en los que no existen datos.

*Frase:* «Ahora decidimos qué periodo queremos analizar».

[Flood Impact Visualization - SymGEO](https://images.openai.com/static-rsc-4/ZuBMvxkg-JQ7UGgNN87LnvW1E0vi1V9nrY7P-aPfacPTkHfdXf7feJ4XwTuUVQf7DQD5TqF7Uyt5M4kT0RrEZus17Ziqd-truUEfMm4I5mxLBhpJOxj7Skzkl94nAk4gvn0ft0GpCDiaiouT1HkDxtWaAsXiyy27E7QYQXXI_LY?purpose=inline)

**Paso 4. Generación del mapa 3D**

Se muestra el modelo del relieve y se superponen las capas de información correspondientes al acontecimiento.

Debe existir una leyenda que explique qué representa cada color.

*Frase:* «La información satelital se convierte en una representación que podemos interpretar visualmente».

[Hurricane Maps & Response Support | Hurricane Disaster Response Program](https://images.openai.com/static-rsc-4/FVCV1XdjMEqctIAywGLQf-1qbGaXEDN_LKH_TEPZK71SEzr-jClgo7qH109VKXwI0rY-esFC2X_KE6RV3XTKZYkC_LIEQU3ar3oEvaQUdwL_RXHtwvyRTfO__L9rZOZjViOECi6fRCw-x1XQxZe4VvGukr6n0P9L6KmJVV7z59U?purpose=inline)

**Paso 5. Exploración temporal**

El usuario mueve un deslizador para cambiar entre diferentes fechas.

El terreno permanece en la misma posición y las capas de información cambian.

*Frase:* «Podemos observar cómo evoluciona el territorio a lo largo del tiempo».

[Bessere Organisation innerhalb der Bezirke durch kartenbasierte Beteiligung     —     meinBerlin](https://images.openai.com/static-rsc-4/wHRCRPb_9Jgx2WOwba_JRrdO_1E8c422N3OLI9IriM_NUcbJ-2gmYR7ZPUVnnolcZi71-CECWJsSMaXKf5IxHssPbhPKVjPVeWA2jjB8xNtmqjApP1sfrCGLLuH2nk4u-LXENF2l9K2ejqTiKROqEuIqyJ6l7846A-iy0XTs2bI?purpose=inline)

**Paso 6. Publicación y comunidad**

Se guarda el estudio con un título, descripción y etiquetas.

Aparece en una biblioteca pública donde otros usuarios pueden explorarlo y aportar información.

*Frase:* «Y nuestro estudio no termina aquí: pasa a formar parte de una biblioteca de conocimiento compartido».

### **Cómo presentar los tres estudios**

No es necesario repetir todo el proceso de selección para cada uno. Preparad tres estudios precargados que se puedan abrir con un solo clic.

[SSPH+ | Devastating “DANA” Floods in Valencia: Insights on Resilience, Challenges, and Strategies Addressing Future Disasters](https://images.openai.com/static-rsc-4/1vBnfqL31qhgpHLHLetbat5IkpX4D6l0iygyCUv1XN9ifCo-hyllnZ4gfGzvrwN1NFMPCFxVZkDhlWUIwZlBiSlkvnFP6fwCvJ8z3pdZWz2dpV34v4_JLtzbUurWHY8BYvsc1ZMl95nB6Qx1Q9YjPluNiMwnqraK-tw7yy94gSw?purpose=inline)

**VALENCIA**

Inundaciones

[ESA - La Palma lava flows into the sea](https://images.openai.com/static-rsc-4/crHq-B8GU8giUeRociDyw7W4RgAmFvA_GNHJa_yNaHqAR2KVdRwWGplI3FImPp8mAcWrVW5dfRgeg3MNtPheOP5WRR4bVD1RkhJhXxzBJwK6Ky9wZgMp9hQgOHYHnuczCr2y4c7R8eAIVY9ozxC5LpIc3neXtEDR8yuvrw3Cbuk?purpose=inline)

**LA PALMA**

Erupción

[The 2023 Turkey Earthquake: Crustal deformation detected by ALOS-2 data | GSI HOME PAGE](https://images.openai.com/static-rsc-4/3oZD9ox6jp2FwP3mWGPxFD-bPmjbXXjDK8V1IRYceDcNFri4bL8gZPegjNL4Vef24Ty3y8Eqedp2fbREdAq0noEJ1YSZ4RjGqGs4xyBDSg8dyVT3t5hSaiZZ7eJf4ueK5J54k5qnlOiRFBYwigB-SaWmhNzRc2-8GxTWbMkJ3Lg?purpose=inline)

**TURQUÍA**

Terremotos

En cada estudio mostrad cuatro elementos:

1. Fecha del acontecimiento.
2. Mapa tridimensional.
3. Comparación temporal.
4. Datos y fuentes utilizados.

El ejemplo de Valencia debería ser el más trabajado, ya que tiene una conexión emocional mucho más inmediata para el público español.

# **7. Diseño visual y experiencia de usuario**

Os propongo una estética que transmita tecnología espacial, rigor científico y accesibilidad.

[Panel Web NASA - UI Concept by Sogaso: UX/UI Design for Orizon: UI/UX Design Agency on Dribbble](https://images.openai.com/static-rsc-4/l-FsGmaIk5tLdEA4mTcwCvxWqZiE8aj0vsbf9VfgMOWPAwtkwUw6e4p-eiwkX7kk3aR747hSj3IiG0aMdeliUkfRyKsp9tbc0nPqxvx1tJ2b-Fr4oPKfy0qYRJitrHZkpDe-2oR2ZQ8XCgZ98Ra5pjcZlAwDNK0EYRSxgWUVeFA?purpose=inline)

[Space-Based Radars | Array Labs, Inc. | Silicon Valley](https://images.openai.com/static-rsc-4/87rYaPcgQoYEKtliAN5xuQWRt-xNjFYGgLxKM7FdybgpedM-2rIeghJIroteVZxSlWzoKHX7PqawsFjIDgFHv0eFBGLKmhh-wseU8-QnDCn8_zL2J4vxDD82PC3-0Dx9Km2ILcnx9vL65FY-ttOYD1TCZI_HXWC5T6l4fPjZ8M8?purpose=inline)

[Map • Time • Timeline • Palantir](https://images.openai.com/static-rsc-4/UiwbXqbRzPh6F-ppe0UMrxumZaw7coC-SK76nqSDI4LxAbSvSQf3j_urI-Obtlt4vyhD0mWXKmgNmdNeY6JjW8I1BsDS4Bn8k6lQaZBJ2470B-VdsWvlwHt2OipVFpAiQZgvDKbKhsWJaUFqR6ryY5PuDMfg7XQDoKvglgZDYqs?purpose=inline)

12

### **Identidad visual**

- Fondo azul muy oscuro o negro espacial.
- Globo terráqueo en tonos azules.
- Terrenos con colores naturales.
- Inundaciones en azul y cian.
- Deformaciones en una escala divergente de colores.
- Tipografía moderna y legible.
- Animaciones suaves, sin sobrecargar la interfaz.

### **Estructura de la aplicación**

Propongo cinco apartados principales:

| Apartado      | Función                                            |
| ------------- | -------------------------------------------------- |
| Explorar      | Globo terráqueo y búsqueda geográfica              |
| Crear estudio | Selección de zona y periodo temporal               |
| Mis estudios  | Investigaciones creadas por el usuario             |
| Comunidad     | Estudios públicos de otros usuarios                |
| Acerca de     | Datos, metodología, fuentes y explicación de NISAR |

### **Una función especialmente interesante: el modo comparación**

Incorporaría un control para alternar entre dos representaciones:

- **Modo superficie:** muestra el relieve real del territorio.
- **Modo cambios:** muestra las transformaciones detectadas por los satélites.

También sería interesante añadir un modo de pantalla dividida para comparar dos fechas simultáneamente.

Esto puede convertirse en una de las características visuales más atractivas de toda la plataforma.

# **8. Sugerencias y posibles mejoras**

Aquí es donde creo que podéis conseguir que vuestra propuesta destaque respecto a una aplicación convencional de mapas.

## **A. Mejoras científicas y técnicas**

**1. Separar relieve y transformación**

No confundáis la elevación del terreno con los cambios detectados por radar. El modelo de elevación es la base tridimensional y las observaciones SAR proporcionan información complementaria.

**2. Incorporar un índice de impacto territorial**

Podríais generar un indicador visual que resuma diferentes variables:

- Superficie afectada.
- Porcentaje del territorio modificado.
- Infraestructuras potencialmente afectadas.
- Proximidad a zonas habitadas.
- Magnitud del desplazamiento detectado, cuando corresponda.

Este indicador debería mostrar qué variables utiliza y no presentarse como una medida científica universal.

**3. Incorporar una línea temporal animada**

En lugar de cambiar únicamente entre dos fechas, el usuario podría reproducir una animación de la evolución del acontecimiento.

Por ejemplo, observar cómo avanza una inundación o cómo se transforma una superficie volcánica.

**4. Mostrar la calidad de los datos**

Una cuestión fundamental: no todos los satélites pasan por una región con la misma frecuencia ni ofrecen la misma resolución.

La plataforma debería mostrar:

- Fecha de adquisición.
- Satélite de procedencia.
- Resolución espacial.
- Cobertura disponible.
- Incertidumbre o limitaciones del procesamiento.

## **B. Mejoras de prevención y análisis**

**5. Incorporar mapas de vulnerabilidad**

Combinar los datos satelitales con información de población, infraestructuras, carreteras, usos del suelo y modelos hidrológicos.

Esto permitiría pasar de preguntar «¿qué terreno se ha inundado?» a preguntar «¿qué población e infraestructuras podrían verse afectadas?».

**6. Comparar acontecimientos similares**

Por ejemplo, comparar la DANA de Valencia con otras inundaciones históricas.

¿Se produjeron cambios similares? ¿Qué características geográficas comparten? ¿Qué zonas presentan condiciones de vulnerabilidad parecidas?

**7. Incorporar escenarios hipotéticos**

A medio plazo, podríais añadir modelos de simulación para estudiar qué ocurriría ante determinados escenarios de inundación, terremoto o deslizamiento.

Es importante distinguir las simulaciones de las observaciones reales: una simulación no es una predicción garantizada.

## **C. Mejoras sociales y colaborativas**

**8. Sistema de reputación científica**

No limitaría la comunidad a los me gusta.

Añadiría:

- Estudios verificados.
- Fuentes documentales.
- Comentarios técnicos.
- Aportaciones de otros usuarios.
- Historial de modificaciones.

**9. Estudios colaborativos**

Un usuario crea un estudio y otros pueden añadir capas, análisis o anotaciones, conservando la autoría de cada aportación.

**10. Accesibilidad para el público general**

Incorporaría dos niveles de visualización:

- Modo sencillo: explicaciones, colores intuitivos y conclusiones comprensibles.
- Modo avanzado: datos SAR, parámetros, coordenadas, metadatos y productos científicos.

Esto ampliaría enormemente el público potencial de la herramienta.

# **9. Qué desarrollaría realmente para la DEMO del Hackathon**

Hay una cuestión estratégica: no intentéis desarrollar toda la plataforma durante el hackathon. La idea es ambiciosa y podéis perder demasiado tiempo intentando conectar todas las funcionalidades.

Mi recomendación es construir un MVP (producto mínimo viable) que permita demostrar la experiencia completa, aunque algunos procesos estén precalculados.



Prioridad máxima

**Que el jurado pueda ver, tocar y comprender el mapa tridimensional.**



### **Funcionalidades imprescindibles**

| Funcionalidad                  | Prioridad         | Implementación                  |
| ------------------------------ | ----------------- | ------------------------------- |
| Globo terráqueo 3D             | Muy alta          | CesiumJS                        |
| Selección rectangular          | Muy alta          | Interacción sobre el globo      |
| Coordenadas geográficas        | Alta              | Captura automática              |
| Selector temporal              | Alta              | Dos fechas y línea temporal     |
| Mapa de elevación 3D           | Muy alta          | DEM precargado                  |
| Capas de catástrofes           | Muy alta          | Rásteres procesados previamente |
| Tres estudios de ejemplo       | Muy alta          | Datos precargados               |
| Comunidad y me gusta           | Media             | Interfaz funcional simplificada |
| Procesamiento NISAR en directo | Baja para la demo | Integración prevista            |

### **Tecnologías que utilizaría**

[FOSS4G North America](https://images.openai.com/static-rsc-4/MG7k0wHd4fBcnZ_kPzVKySZdmfg_7-bNWkWluDuCpPYm3dEQ-cwYFf3eKQA7Kt4Q3KucMtubH2l7ArsQnHcGv--l77TRcNlyzYgSPMJU_iwfPJiqHWuqGe4jvmzaPzi7VgNky8_9fBDxRqAuwS4OeTUesqVoZTyVaMh3XX2Omug?purpose=inline)

**CesiumJS**

Globo terráqueo y visualización geoespacial 3D.

[Documentación](https://cesium.com/platform/cesiumjs/?utm_source=chatgpt.com)

[Simplifying SAR | NASA Earthdata](https://images.openai.com/static-rsc-4/TVKFUwh4HZxtT6tMssIPsmY7zeIWprJH5zyjV0xVYmpSdSLhTeXtepH1gi_-ZSIHqKk96VIh1VcrRMKC5gUWbJjV5SKTDBYmjwP7ROAjLG7ohfHiEYz-WlY4TDfjQp6CMM3UFoK11eq8FZ9fTlJlgkgUTrhhy5raiNznge6GARQ?purpose=inline)

**Alaska Satellite Facility**

Acceso a productos y adquisiciones NISAR.

[Portal de datos](https://asf.alaska.edu/?utm_source=chatgpt.com)

[See Google Earth Engine Workshop - Brisbane. at Google Developer Groups GDG AI for Science - Australia](https://images.openai.com/static-rsc-4/pQGeFOmg4cS2vo4PGDU-OLM_RmACJ_yPX92evwPYK14kYVFHafAQnUk40jSTk_Ig84oP5FLGdHNNBrpLGTbPy8HalmUzD8Ifmb83tqrd9LwJb9a-TXRvvlTKSDDNAPvfZCHyvp9LxImGLMVPNE9XEfA48q0KbIMOGOD05HG_ZkM?purpose=inline)

**Google Earth Engine**

Procesamiento y análisis de imágenes satelitales.

[Plataforma](https://earthengine.google.com/?utm_source=chatgpt.com)

[Brand Assets | MapLibre](https://images.openai.com/static-rsc-4/X_8S2UENKVdsNDUOMNZL7AYk2MU0K_7lUU3sVzpZgjEEX3eWj-iveucv4mV3jJ_q0ZNJkMK8gzWAFgMKgXv8BgOdNmKIaB8j7nTZbNM5Cuh89LsVq4BK0mqk7MHOsswDETAxtfnaeGbQU8WeRwzdlxAaYnHifXoWF6V7koFdAfY?purpose=inline)

**MapLibre**

Alternativa para cartografía 2D y capas geográficas.

[Documentación](https://maplibre.org/?utm_source=chatgpt.com)

[EarthData logo, Vector Logo of EarthData brand free download (eps, ai, png, cdr) formats](https://images.openai.com/static-rsc-4/TtiMfsj0d8ITZ6JUMLxSPFgPXRrGKvDtPG3EJ4GPSiCM2MUdur783aQwNGoRgGUSsfKB3ZNOyqqOxyDd15KTzJe3-AakzyLdJZhD11poymxa-xUUdkky14hnh5CgiDlDtQwu4Cu_GSHjSfhYaVV6_1MBHGfzRNXOpzBmF8xTPWU?purpose=inline)

**NASA Earthdata**

Acceso y descubrimiento de datos científicos de la NASA.

[Portal](https://www.earthdata.nasa.gov/?utm_source=chatgpt.com)

Una arquitectura posible sería:

\#chatgpt-mermaid-\_r_3dj\_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-\_r_3dj\_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3dj\_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-\_r_3dj\_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-\_r_3dj\_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-\_r_3dj\_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-\_r_3dj\_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-\_r_3dj\_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-\_r_3dj\_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-\_r_3dj\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3dj\_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3dj\_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-\_r_3dj\_ p{margin:0;}#chatgpt-mermaid-\_r_3dj\_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-\_r_3dj\_ .label text,#chatgpt-mermaid-\_r_3dj\_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ .node rect,#chatgpt-mermaid-\_r_3dj\_ .node circle,#chatgpt-mermaid-\_r_3dj\_ .node ellipse,#chatgpt-mermaid-\_r_3dj\_ .node polygon,#chatgpt-mermaid-\_r_3dj\_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .rough-node .label text,#chatgpt-mermaid-\_r_3dj\_ .node .label text,#chatgpt-mermaid-\_r_3dj\_ .image-shape .label,#chatgpt-mermaid-\_r_3dj\_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-\_r_3dj\_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .rough-node .label,#chatgpt-mermaid-\_r_3dj\_ .node .label,#chatgpt-mermaid-\_r_3dj\_ .image-shape .label,#chatgpt-mermaid-\_r_3dj\_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-\_r_3dj\_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-\_r_3dj\_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3dj\_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3dj\_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-\_r_3dj\_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3dj\_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3dj\_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3dj\_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-\_r_3dj\_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-\_r_3dj\_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-\_r_3dj\_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-\_r_3dj\_ .icon-shape,#chatgpt-mermaid-\_r_3dj\_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-\_r_3dj\_ .icon-shape p,#chatgpt-mermaid-\_r_3dj\_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-\_r_3dj\_ .icon-shape .label rect,#chatgpt-mermaid-\_r_3dj\_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-\_r_3dj\_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-\_r_3dj\_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-\_r_3dj\_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node rect,#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].cluster rect,#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-\_r_3dj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-\_r_3dj\_-gradient);stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-\_r_3dj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-\_r_3dj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3dj\_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-\_r_3dj\_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-\_r_3dj\_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3dj\_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-\_r_3dj\_ .node tspan[font-weight="normal"],#chatgpt-mermaid-\_r_3dj\_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-\_r_3dj\_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .node rect,#chatgpt-mermaid-\_r_3dj\_ .node circle,#chatgpt-mermaid-\_r_3dj\_ .node ellipse,#chatgpt-mermaid-\_r_3dj\_ .node polygon,#chatgpt-mermaid-\_r_3dj\_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-\_r_3dj\_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-\_r_3dj\_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-\_r_3dj\_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-\_r_3dj\_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-\_r_3dj\_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}UsuarioAplicación webGlobo 3D CesiumJSSelección geográfica ytemporalMotor de procesamientogeoespacialNISAR / Sentinel / LandsatModelos digitales de elevaciónCapas de cambios detectadosSuperficie 3DVisualización temporalEstudio interactivoBiblioteca colaborativa

Para la demo, el motor de procesamiento puede utilizar resultados preparados previamente. Lo importante es que la selección geográfica y la exploración de los estudios funcionen de verdad.

# **10. El elemento diferenciador que añadiría: un indicador de conocimiento territorial**

Hay una mejora que considero especialmente interesante para el proyecto.

Actualmente, la propuesta explica cómo visualizar los cambios de un territorio. Pero podéis ir un paso más allá incorporando una ficha de impacto que traduzca el análisis geográfico a información cotidiana.

Por ejemplo, al seleccionar una zona inundada en Valencia:

**Estudio: DANA de Valencia**

Ejemplo conceptual

[Una semana bajo el agua y el lodo: mapas y gráficos de la DANA](https://images.openai.com/static-rsc-4/09S9amW8mHSnCtodjX7AgtBPoZk_q_bN_nv4SoyBOWvppPnndRnHUJ5PuenoWV4Nu2TqT3hjWYiPQGlz9tXTXdPaPzfDep9x4wMfdYqazdg8_-Zi1KXsWgxAvUx7lb5orY0cWs5JUjgKOBJ-GcKqi8_GAfaav2m4hqTIsaHErfo?purpose=inline)

[rtve.es](https://www.rtve.es/noticias/20241105/semana-bajo-agua-lodo-mapas-graficos-destruccion-dana-valencia/16316686.shtml?utm_source=chatgpt.com)

# **km²**

Superficie inundada detectada

# **%**

Territorio afectado

**Infraestructuras**

Elementos próximos o potencialmente afectados

**Evolución**

Comparación entre adquisiciones

Interfaz ilustrativa: los valores deberán calcularse a partir de datos reales y verificables.

Esto permite que alguien sin conocimientos de teledetección comprenda inmediatamente la importancia de lo que está observando.

Incluso podríais establecer tres niveles de lectura:

- **Territorio:** qué ha cambiado.
- **Impacto:** qué elementos pueden verse afectados.
- **Prevención:** qué podemos aprender de ese acontecimiento.

# **11. Cómo vendería la idea al jurado**

Creo que hay un aspecto de vuestra propuesta que merece mayor protagonismo.

No vendáis únicamente la representación tridimensional. Hay muchas herramientas que muestran mapas, modelos digitales de elevación e imágenes satelitales.

Vuestra innovación está en combinar cuatro elementos:

**1. Exploración geográfica**

Cualquier usuario puede seleccionar el territorio que quiere estudiar.

**2. Visualización temporal 3D**

Comprender las transformaciones del planeta de una forma intuitiva.

**3. Conocimiento colaborativo**

Compartir estudios y enriquecerlos colectivamente.

**4. Aplicación preventiva**

Identificar patrones, vulnerabilidades y posibles escenarios de riesgo.

## **Mi recomendación para el nombre**

Buscaría un nombre corto, internacional y relacionado con la observación de la Tierra.

Algunas propuestas:

| Nombre             | Concepto                               |
| ------------------ | -------------------------------------- |
| **TerraScope**     | Observar y explorar la Tierra          |
| **EarthLens**      | Una nueva perspectiva del planeta      |
| **TerraTrace**     | Seguir las transformaciones terrestres |
| **GeoPulse**       | El pulso cambiante del planeta         |
| **EarthEvolution** | Evolución de la superficie terrestre   |

Mi favorito es **TerraScope**: es sencillo, reconocible internacionalmente y comunica muy bien la idea de explorar el planeta.

# **12. Mi valoración final: qué potenciaría y qué evitaría**

| Potenciaría                         | Evitaría                                                 |
| ----------------------------------- | -------------------------------------------------------- |
| El mapa 3D como protagonista        | Una presentación excesivamente técnica                   |
| El ejemplo de Valencia              | Tres casos de estudio superficiales                      |
| La comparación temporal             | Prometer procesamiento instantáneo de cualquier región   |
| La accesibilidad al público general | Saturar la interfaz con datos científicos                |
| La integración real con NISAR       | Afirmar que NISAR dispone de imágenes de la DANA de 2024 |
| La prevención basada en evidencias  | Prometer predicciones exactas de catástrofes             |

Hay una última cuestión: la prevención no debe presentarse como una capacidad automática de predecir catástrofes a partir de imágenes satelitales. Es más riguroso decir que vuestra plataforma puede ayudar a identificar patrones históricos, estudiar vulnerabilidades y proporcionar información para modelos de evaluación de riesgos.

## **La frase que utilizaría para terminar la presentación**

# ***«El planeta está cambiando constantemente. Los satélites lo están observando. Nosotros queremos que todos podamos comprenderlo».***

## **Transformar datos en conocimiento. Transformar conocimiento en prevención.**

TerraScope · NASA Space Apps Challenge Málaga

## **13. Próximo paso que os recomiendo**

Antes de programar más funcionalidades, definiría un documento de especificaciones de la DEMO con las pantallas, los datos necesarios, las interacciones y los tres estudios precargados. Así todos los integrantes del equipo podrán trabajar sobre una misma visión y evitaréis desarrollar funcionalidades incompatibles.

Podemos preparar ese documento y convertirlo en un plan de desarrollo dividido por tareas para los integrantes del grupo.

¿Quieres que mañana hagamos una revisión de la viabilidad técnica y las fuentes de datos de los tres casos de estudio?

🛰️Revisar datos y viabilidad de TerraScopeToca para configurar




Mi recomendación es desarrollar una presentación web independiente, con estética de producto tecnológico y científico, que funcione como una presentación interactiva de siete diapositivas y pueda publicarse gratuitamente mediante GitHub Pages.

No debería parecer un PowerPoint convertido a HTML. Debería transmitir la sensación de estar presentando un producto tecnológico real ante un jurado internacional de la NASA.

Vamos a plantearla para **TerraScope**, nombre provisional recomendado para el proyecto, siguiendo la idea, la arquitectura y los casos de estudio que habéis definido en vuestro documento.&#x20;

Texto pegado(20261115-005844).txt



# **1. Concepto general de la presentación**

[Qinsight Labs](https://images.openai.com/static-rsc-4/iNuysaa8yoNpvUv9jb2IzVoDw6yKH8CLrvlcmB1_CIcut30ZYGWLsIBlB0RO8MW6hLbeLw2bMYeZKVXXSDdgauRWlC1nglf2cVtqdrKv8UQ3b0iVBJW1J_-q0SVA8lKiVBNDVoW4v6LnXg6x9GY4dsngVGE1ct8lU45FJwEc8xs?purpose=inline)

[qilabs.in](https://qilabs.in/?utm_source=chatgpt.com)

# **TerraScope**

## Making Earth Changes Visible.

NASA Space Apps Challenge · Málaga 2026

7 slides maximum

English only

Interactive HTML

**Concepto:** una experiencia visual que cuenta una historia:

1. El planeta experimenta transformaciones.
2. Los satélites observan esos cambios.
3. Los datos científicos son difíciles de interpretar.
4. TerraScope los transforma en representaciones tridimensionales.
5. Podemos estudiar acontecimientos reales.
6. El conocimiento puede compartirse.
7. Comprender los cambios permite mejorar la preparación ante futuros riesgos.

La presentación debe ser comprensible por sí misma, incluso si el jurado la abre sin que ningún integrante del equipo esté presente.

## **2. Diseño visual y experiencia de usuario**

[NASA’s Global Imagery Browse Services (GIBS) Provides Access to Public Catalog of 100+ Satellite Imagery Layers – Cesium](https://images.openai.com/static-rsc-4/mbxgSLWT-kQMUAH5NsNG9lICGbzjiXbGVBm0RygvrUq00VHOER9uo9BZvRu6DfDDkrN87U_3GvgZUAZT-KOnbyTMe7Z8VTc3VkWjiztGTneMIsz5qyDbdVTSiTXLQrsXaYv775KiXHnnEjnyywYnedcXgD1GYUmkLCEXYIbrVvE?purpose=inline)

[Blue Tech Data Portal](https://images.openai.com/static-rsc-4/05xirqb15cHoaZxMm-RjgOReVFTVuaXjBWZswVOo6NDCuYAEN-ba-RoOdwo5tEUSiZzfL7ppRqcL3WhBtwEUuhdqlyKY9VmcYNT3aDiJyfeGwjwMdf0_8mGCaLFky4W_jJNkTeQL_u478kvAhm4fRWBRbWg-UynCNIuiJrZ0Js0?purpose=inline)

[New Orleans Flood Impact Analysis](https://images.openai.com/static-rsc-4/IVNJU9tCgEA47fFJTNBSafUuW4wWA-I0u2XGg3VPxYQJGpqIrrOdyeHYXyHIbM0S8mCwGJ4llLzBPrne8Vc_0Gm4cFBAEoL6KNtUT4V0hD0D_nFwm0AlOvZBYX0-CgJaACz7cI79cAKBRYwjwv3qS2G__8Ek_D8cCz9CWL09OmI?purpose=inline)

11

### **Identidad visual**

| Elemento         | Propuesta                |
| ---------------- | ------------------------ |
| Fondo principal  | Negro espacial `#050914` |
| Fondo secundario | Azul oscuro `#0A1425`    |
| Color principal  | Azul eléctrico `#318BFF` |
| Color secundario | Cian `#32D5E6`           |
| Alertas          | Rojo coral `#FF5D65`     |
| Texto principal  | Blanco `#F4F7FC`         |
| Texto secundario | Gris azulado `#98A8BD`   |
| Tipografía       | Inter / Space Grotesk    |

### **Características visuales**

- Fondos oscuros con profundidad y gradientes.
- Fotografías satelitales y representaciones geográficas.
- Modelos de relieve tridimensional.
- Líneas orbitales, coordenadas y elementos cartográficos.
- Animaciones suaves y transiciones cinematográficas.
- Tarjetas de información científica.
- Gráficos y comparaciones temporales.
- Capturas auténticas de vuestra aplicación.

La regla principal es que las imágenes y visualizaciones deben explicar algo. Evitaría utilizar elementos espaciales simplemente decorativos.

# **3. Estructura de las siete diapositivas**

Esta sería la distribución definitiva que recomiendo.

**01 — The changing planet**

Opening

[The Early Adopters: Tracking Quantum’s First Customers | by Michal Sabol | Medium](https://images.openai.com/static-rsc-4/i21Qxh7nGQxVCGrlyCnpmqiAVBbc1mNYon3hkOxON1pLuOorl3sCfUt0PsKmxiDavMgUJLCg2bS1I_RViBJWyPUQjZUtQqRmUVj1PnI3S1I1uCOsERxFNMoRyVWzHSPrsoptMQ4-38AkXP4n8NajHzIzTfIjXEs2RSQhif8sxjM?purpose=inline)

[medium.com](https://medium.com/%40MichalSabol/the-early-adopters-tracking-quantums-first-customers-9687d922bb54?utm_source=chatgpt.com)

**Título:** The Earth is constantly changing. Are we really seeing it?

**Contenido:**

- Imagen de la Tierra como protagonista.
- Nombre TerraScope.
- NASA Space Apps Challenge Málaga 2026.
- Frase: *Every disaster leaves a trace. Every trace tells a story.*

**Objetivo:** despertar curiosidad e introducir el problema.

**02 — The problem**

[Sentinel Vision - Story SED-1228](https://images.openai.com/static-rsc-4/i0L5SGOik2p7FW424-NU8bfwddF9dO_wLoUHLxHm-W9AfFYCh6B6HpgCMXy2LOnHohhYzNPGxe0EKupTze5B9RuXG1qlBywJX8Eilz8hVtIGKyuYEGA4L40G31uKs_AkxSpvQrgVQThMTJaUmU4-_FmOCHUALz9uMSD0uE96BME?purpose=inline)

[sentinelvision.eu](https://www.sentinelvision.eu/gallery/html/927ce315d5ab49059284289b2edbceba?utm_source=chatgpt.com)

**Título:** We have the data. But can everyone understand it?

**Contenido:**

- Los satélites generan enormes cantidades de información.
- Interpretar productos geoespaciales exige conocimientos especializados.
- Las imágenes bidimensionales no siempre facilitan la comprensión de los cambios.

**Idea visual:** tres bloques: Complex Data → Technical Interpretation → Limited Accessibility.

**03 — Our solution**

[Cómo utilizar datos geográficos para potenciar negocios](https://images.openai.com/static-rsc-4/dbFRpOPkVe5vLDau_ZZ0TeQ2zxOKnMpCeB8nTWyirHdCeciw5TqqsxbGZlY-rRTafZ9nB2VRYyf-F8L8nAwRqSp-j6ZVtWEtoULOz6Oo26Yo-fDj_-HGVgMnIizoR7vPAumK6_2d4BmP_OEesafFTuGlye1u_5agI3CGRX2MefU?purpose=inline)

[ambito.com](https://www.ambito.com/tecnologia/como-utilizar-datosgeograficosparapotenciarnegocios-n6116474?utm_source=chatgpt.com)

**Título:** Meet TerraScope.

**Subtítulo:** Turning satellite observations into interactive 3D experiences.

**Contenido:**

- Exploración geográfica.
- Reconstrucción tridimensional del relieve.
- Superposición de datos satelitales.
- Comparación temporal.
- Estudios geográficos compartibles.

**Objetivo:** presentar claramente qué habéis construido y qué aporta.

**04 — How it works**

[OptivisMind](https://images.openai.com/static-rsc-4/NnShJujqbzpfIVxp1WBDT9BLaOQzoV3khVu6aZB8lvitSeydjG8A01zChC_8r-Tk0FdyyyV-taAGAT_lv1_BFK9fWFyN2Y0xybwXJq2EbARhRq_AY-7LV3qljNeE54zm3fnw7cd5purLpFh0cqzl34MvR0qfMA572rvSEf4hqG8?purpose=inline)

[optivismind.com](https://optivismind.com/gis?utm_source=chatgpt.com)

**Título:** From satellite observations to meaningful insights.

**Contenido:**

# **01**

**Select a region**

Choose an area of interest.

# **02**

**Explore available data**

Identify satellite acquisitions and time periods.

# **03**

**Process observations**

Combine elevation models and satellite-derived information.

# **04**

**Visualize changes**

Explore the 3D terrain and compare different dates.

**Objetivo:** demostrar que existe una metodología lógica y técnicamente viable.

**05 — Real-world case studies**

[Cities Under Water: Valencia, Spain, and Urban Flooding](https://images.openai.com/static-rsc-4/0KuEHpoU7NgqvjX2dMwuwwi5bwv8ulZoKYv0LNCLPjfkQKKNx5WlRVxWnX_uKrOiW137jEKiOp1aUe6i4D7yowaY6kJwFGQccWmatG-zA_Qk3oO3U4PGBbAdM7z_flhm4wG0DE29UnY8DaEvXFegNHLtqtkEwXW_y9UqyWE-jgI?purpose=inline)

[ESA - New lava river captured by Copernicus Sentinel-2](https://images.openai.com/static-rsc-4/Dk0EkN7ti26wPuEIN8N6evJ0RW97s7GMFouwk1M4nf79NNcfKnDcxctSlU17m0fa9HhAmXKpAuUDOieHLMe9TVE9q3xRNCHGpt6BhVs5GVwHfnZ8R-41JhImBotlP3PAiS7HLvbz7urhSPyxWZCe7c2Idk2N_VBqVoNLqNaEy8E?purpose=inline)

[S1 Applications](https://images.openai.com/static-rsc-4/Cqh9fZ7PZ-sd7Ulrd-nrZ_yR6esxzi6LKhExoB3PeoEH6ToNqqonqihMGO3SCush2hIiuQmBFlkyliWeld9wozgaGWMWfwwG-Hs1Z8_G6zXFkAzrDDtkM7ERxABuObOlYVH7Dy7tvfXZ26_llAtK0tO22wep8GnP-fia0gVAq2o?purpose=inline)

7

**Título:** Three disasters. Three ways to understand our planet.

Tres casos de estudio:

| Caso          | Fenómeno     | Capacidad              |
| ------------- | ------------ | ---------------------- |
| Valencia 2024 | Inundaciones | Flood mapping          |
| La Palma 2021 | Erupción     | Surface transformation |
| Türkiye 2023  | Terremoto    | Ground deformation     |

Importante: estos casos históricos se apoyan en fuentes como Sentinel-1, Sentinel-2 y modelos de elevación. No deben presentarse como observaciones NISAR de esos acontecimientos.

**06 — Beyond visualization**

[OSINT Globe v3 — Geospatial Intelligence Platform](https://images.openai.com/static-rsc-4/cOa6jBtrLBQw9irZDo4cQO2YaMa04xfoDN9HmGUKd8-rSyUv1S4_6cB4fPp6hG1VRZUuIdK9bUHCtxSkZKSDT7h63pwChsLQyXRR34eKOtwuB1z7rQnBqd0pF6bom1tPKpMq5hGVbs-yybv6u4JbM7FprLFRo1BmGPZBEVl6wkw?purpose=inline)

[osint.graphatlas.tech](https://osint.graphatlas.tech/?utm_source=chatgpt.com)

**Título:** Knowledge becomes more powerful when we share it.

**Contenido:**

- Public geological studies.
- Collaborative geographical analysis.
- Shared observations and documentation.
- Community-driven knowledge.

Añadir una pequeña demostración visual de la biblioteca de estudios.

**07 — The vision**

[Space without borders](https://images.openai.com/static-rsc-4/Bx0bQRjPnSfKQEkgO1xECOyIWhEW2KSYOHl9bLKfNgy2c7WK2eyR0J7GLm0eUqJlMfD6pQxVmnvA1PleNGsNl46o-NyhEHfOTEsHoe0SBjH1hHYm98I4xWKL0aR8Fsa-S4QXCQ3nd3RHZ4sDBrPG_F_jkAgKi2HJUlEGpOSEkxA?purpose=inline)

[spacewithoutborders.co](https://www.spacewithoutborders.co/?utm_source=chatgpt.com)

**Título:** Understand what happened. Prepare for what comes next.

**Contenido:**

- Mejor comprensión de los riesgos territoriales.
- Identificación de patrones históricos.
- Información para mejorar la evaluación de vulnerabilidades.
- Integración progresiva de nuevas fuentes científicas.

**Cierre:**

*Transforming data into knowledge. Transforming knowledge into preparedness.*

Incluir aquí el enlace destacado a vuestra demo y el repositorio público.

# **4. Arquitectura completa de archivos**

Mi propuesta es utilizar HTML, CSS y JavaScript nativo, sin React, Vue ni dependencias de compilación.

La presentación es suficientemente pequeña para no necesitar un framework. Sin embargo, conviene separar correctamente las diapositivas, los estilos, las animaciones, la navegación y los contenidos.

**TerraScope/**

&#x20;**presentacion/**

Proyecto independiente

&#x20;index.html

Estructura principal

&#x20;README.md

Documentación

&#x20;css/

style.css — Estilos generales

slides.css — Diseño de diapositivas

animations.css — Efectos y transiciones

&#x20;js/

main.js — Inicialización

navigation.js — Navegación

animations.js — Animaciones

interactions.js — Interacciones

config.js — Configuración y enlaces

content.js — Textos de las diapositivas

&#x20;assets/

images/ — Fotografías y capturas

icons/ — Iconografía y logotipos

fonts/ — Tipografías locales (opcional)

Son 12 archivos principales, sin contar los recursos gráficos. Es una estructura suficientemente modular para trabajar cómodamente sin dispersar el código.

## **5. Responsabilidad de cada archivo**

### **A. HTML**

`index.html`

Será el documento principal de la presentación.

Debe contener:

- Metadatos SEO y descripción del proyecto.
- Carga de tipografías.
- Inclusión de los archivos CSS.
- Contenedor general de la presentación.
- Las siete diapositivas.
- Barra de progreso.
- Navegación anterior/siguiente.
- Indicador de diapositiva actual.
- Botón de pantalla completa.
- Botón de acceso a la demo.
- Inclusión de los módulos JavaScript.

Cada diapositiva tendrá un identificador propio:

```
<section class="slide" id="slide-01">
    <!-- Slide content -->
</section>

<section class="slide" id="slide-02">
    <!-- Slide content -->
</section>
01. IMPACTO → 02. PROBLEMA → 03. SOLUCIÓN → 04. CÓMO FUNCIONA → 05. CASOS REALES → 06. RED SOCIAL → 07. PREDICCIÓN & CTA
```

Las siete diapositivas estarán presentes en el HTML, pero solamente la activa será visible.
### Diapositiva 01 · El Impacto
**Mensaje:** *"Cada año ocurren más catástrofes. Cada año obtenemos más datos del planeta. PERO NO LOS VEMOS."*
- Visual: Mosaico de 4 catástrofes reales (inundación, volcán, terremoto, huracán) con estética documental
- Propósito: Crear conciencia inmediata. El mundo está cambiando. Los satélites lo ven. Nosotros no.
- Transición: La pregunta que conecta con la solución — ¿qué haría falta para que esos datos fueran comprensibles?

### **B. CSS**
### Diapositiva 02 · El Problema
**Mensaje:** *"Tenemos los datos. Nos falta hacerlos comprensibles."*
- 3 barreras: datos científicos incomprensibles, silos dispersos, mapas 2D que ocultan la realidad
- Frase de cierre: *«Un dato incomprensible en una emergencia es igual a no tener datos.»*

| Archivo          | Responsabilidad                                                        |
| ---------------- | ---------------------------------------------------------------------- |
| `style.css`      | Variables, tipografía, colores, estructura general y diseño adaptable. |
| `slides.css`     | Composición específica de las siete diapositivas.                      |
| `animations.css` | Entradas, salidas, transiciones y efectos visuales.                    |
### Diapositiva 03 · La Solución (GeoWave)
**Mensaje:** *"Convertimos datos satelitales en territorios que podemos explorar."*
- Concepto clave: desacoplar la geometría real del terreno (DEM) de la detección de cambios por radar (SAR)
- Visual: Maqueta 3D de capas apiladas (DEM base → calibración → anomalías radar)

Es importante utilizar variables CSS para mantener una identidad coherente:
### Diapositiva 04 · Cómo Funciona
**Mensaje:** *"Del planeta al detalle de una catástrofe en 4 pasos."*
1. Selección geográfica en globo 3D
2. Selección temporal con pasadas orbitales automáticas
3. Fusión científica DEM + SAR
4. Visualización 3D con rampas de color intuitivas

```
:root {
    --background: #050914;
    --surface: #0A1425;
    --primary: #318BFF;
    --secondary: #32D5E6;
    --danger: #FF5D65;
### Diapositiva 05 · Impacto Real — 3 Casos de Estudio
**Mensaje:** *"Valencia, La Palma, Turquía: lo vemos en datos, lo entendemos en 3D."*
- Control deslizante interactivo antes/después
- Valencia DANA 2024: 156.4 km² inundados, +840% caudal
- La Palma 2021: fajana marina +48 ha, cono Tajogaite
- Turquía 2023: desplazamiento sísmico 5.5 m (InSAR)

    --text-primary: #F4F7FC;
    --text-secondary: #98A8BD;
### Diapositiva 06 · Red Social Científica
**Mensaje:** *"El conocimiento también evoluciona de forma colectiva."*
- Biblioteca pública de estudios con visualizador 3D integrado
- Sistema de valoración, comentarios y fork de estudios
- Modo Ciudadano / Modo Científico SAR

    --font-heading: "Space Grotesk", sans-serif;
    --font-body: "Inter", sans-serif;
### Diapositiva 07 · Predicción y Visión de Futuro
**Mensaje:** *"No solo comprendemos lo que pasó. Predecimos lo que puede pasar."*
- Análisis de patrones históricos para anticipar cuencas en riesgo
- Mapas de vulnerabilidad cruzando huella satelital con demografía e infraestructuras
- Simulación de escenarios hipotéticos ("what-if") para planes de emergencia
- CTA: `ABRIR GEOWAVE →` + enlace al repositorio + declaración de uso de IA

    --transition: 450ms ease;
}
```
---

### **C. JavaScript**
## 4. Guion del Presentador (3–4 minutos)

Esta separación es especialmente importante.
| Tiempo | Diapositiva | Discurso |
|--------|-------------|---------|
| **0:00–0:35** | 01 · Impacto | *«Cada año el planeta sufre más catástrofes: inundaciones, volcanes, terremotos, huracanes. Y cada año los satélites capturan más datos que nunca sobre esos eventos. Pero hay una paradoja: toda esa información existe, es pública y es científicamente precisa... y sin embargo, no la vemos. No llega a la gente que más la necesita.»* |
| **0:35–1:10** | 02 · Problema | *«El motivo es que los datos brutos de satélite son incomprensibles sin formación técnica especializada: matrices de radar, coeficientes de retrodispersión, modelos de elevación en formato binario. Además, están dispersos en portales separados e incompatibles entre sí. Y los mapas 2D planos que a veces se publican ocultan las pendientes, la velocidad del agua, la profundidad del daño. En una emergencia, un dato incomprensible es igual a no tener datos.»* |
| **1:10–1:50** | 03 · Solución | *«Por eso creamos GeoWave. Tomamos esos datos complejos y los convertimos en algo que cualquiera puede explorar: un territorio tridimensional, interactivo y temporal. Superponemos el modelo de elevación real del terreno con las capas de detección de cambios por radar. El resultado no es un mapa. Es la transformación física del planeta, visible para todos.»* |
| **1:50–2:30** | 04–05 · Demo | *«Funciona en cuatro pasos: seleccionas la región en el globo 3D, delimitas las fechas, la plataforma fusiona los datos satelitales y te genera la visualización al instante. Mirad Valencia: arrastrando el control temporal vemos cómo 156 kilómetros cuadrados quedan bajo el agua en pocas horas, cortando la A-3 y la V-31. Lo mismo aplicamos al volcán de La Palma y a los terremotos de Turquía.»* |
| **2:30–3:10** | 06 · Red Social | *«Pero GeoWave no es solo una herramienta de visualización. Es una red social científica. Los investigadores publican sus estudios con el visor 3D integrado. La comunidad los valora, comenta y puede bifurcarlos para añadir sus propios datos locales. Con un clic se puede alternar entre el modo ciudadano — lenguaje claro y visual — y el modo científico SAR con todos los parámetros técnicos.»* |
| **3:10–3:45** | 07 · Cierre | *«Y aquí está la verdadera ambición de GeoWave: no solo entender lo que ya ocurrió, sino predecir lo que puede ocurrir. Cruzando patrones históricos, datos demográficos y modelos de riesgo, podemos señalar qué cuencas son vulnerables antes de que llegue la próxima tormenta. Los satélites ya observan la Tierra. Nosotros queremos que todos podamos comprenderla. Transformar datos en conocimiento. Transformar conocimiento en prevención.»* |

| Archivo           | Funciones                                                     |
| ----------------- | ------------------------------------------------------------- |
| `main.js`         | Arranque y coordinación de módulos.                           |
| `navigation.js`   | Siguiente, anterior, teclado, indicadores y progreso.         |
| `animations.js`   | Animaciones de entrada y salida de elementos.                 |
| `interactions.js` | Botones, enlaces, pantalla completa y elementos interactivos. |
| `config.js`       | URL de la demo, repositorio, identidad y configuración.       |
| `content.js`      | Contenidos, etiquetas, títulos y textos.                      |
---

`navigation.js`
## 5. Arquitectura del Proyecto

Deberá permitir:

- Navegar mediante botones.
- Utilizar las flechas del teclado.
- Utilizar las teclas Inicio y Fin.
- Mostrar la posición actual.
- Actualizar la barra de progreso.
- Evitar pasar de la primera o última diapositiva.
- Admitir navegación táctil mediante gestos horizontales, si se implementa.

`animations.js`

Deberá controlar las animaciones de cada diapositiva, evitando que todos los elementos aparezcan simultáneamente.

`interactions.js`

Se ocupará de los botones de pantalla completa, enlaces externos, interacciones y controles auxiliares.

`config.js`

Aquí se centralizarán los enlaces definitivos:

```
export const CONFIG = {
    projectName: "TerraScope",

    event: "NASA Space Apps Challenge Málaga 2026",

    demoUrl: "https://YOUR-DEMO-URL",

    repositoryUrl: "https://YOUR-GITHUB-REPOSITORY",

    maxSlides: 7
};
```

Los enlaces son marcadores que sustituiremos por las direcciones públicas reales.

# **6. Funcionalidades que debe incorporar la presentación**

No basta con poder pasar de una diapositiva a otra. Quiero que tenga una experiencia de presentación profesional.

**Interfaz de navegación**

**TERRASCOPE**

NASA SPACE APPS 2026

# **Our solution**

Turning satellite observations into 3D experiences.

03 / 07

Representación conceptual de los controles, no una captura de la aplicación terminada.

### **Funcionalidades obligatorias**

| Funcionalidad     | Comportamiento                             |
| ----------------- | ------------------------------------------ |
| Navegación        | Siguiente y anterior                       |
| Teclado           | Flechas, Home y End                        |
| Progreso          | Barra y contador 01/07                     |
| Pantalla completa | Activar y salir                            |
| Adaptabilidad     | Escritorio, tablet y móvil                 |
| Animaciones       | Transiciones cinematográficas              |
| Enlaces           | Demo y repositorio                         |
| Accesibilidad     | Contraste, controles y movimiento reducido |
| Impresión         | Preparación para exportar a PDF            |

### **Funcionalidades adicionales recomendadas**

- Transiciones con efecto de profundidad.
- Indicadores de sección.
- Aparición progresiva de gráficos.
- Efecto de paralaje muy moderado.
- Comparaciones visuales antes/después.
- Botón de reproducción automática opcional.
- Navegación mediante puntos.

No incluiría música automática ni efectos sonoros: una presentación para un jurado debe poder abrirse en cualquier entorno sin causar molestias.

# **7. Tratamiento científico: un apartado especialmente importante**

Hay algo que debemos cuidar mucho más que el diseño.

**No podemos presentar una integración de NISAR como funcional si realmente no está implementada.**

La presentación debe distinguir claramente tres niveles:

IMPLEMENTED

Funcionalidades desarrolladas y comprobables.

PROTOTYPE / SIMULATION

Elementos demostrativos o resultados precalculados.

FUTURE WORK

Capacidades previstas que todavía no están implementadas.

Además, debemos introducir una pequeña referencia científica en las diapositivas 4 y 5:

- **NISAR:** observaciones SAR y seguimiento de cambios posteriores a su lanzamiento.
- **Sentinel-1:** fuente para los estudios históricos de inundaciones y deformaciones.
- **DEM:** geometría y elevación del terreno.
- **InSAR:** estimación de desplazamientos en la dirección de observación del satélite, cuando los datos lo permiten.

Un detalle fundamental: el modelo de elevación no es una reconstrucción de la deformación producida por una catástrofe. Son capas diferentes que se complementan.

También incluiría una diapositiva o sección de créditos dentro de la documentación complementaria, identificando las fuentes, fechas, resoluciones, licencias y transformaciones utilizadas.

# **8. Enlace a la demo y declaración de IA**

La última diapositiva debe tener dos acciones claramente diferenciadas:

# **Explore TerraScope**

Discover how satellite observations can help us understand our changing planet.

**LIVE PROJECT DEMO**

Interactive application

**OPEN TERRASCOPE →**

**Source code**

AI USE DISCLOSURE

The team used AI-assisted tools during development and content preparation. All scientific claims, data sources and project outputs are subject to human review and verification.

La declaración anterior es un texto provisional: deberá ajustarse a las herramientas de IA que realmente hayáis utilizado y a las condiciones aplicables del evento.

# **9. Requisitos técnicos y publicación**

La presentación deberá cumplir estas condiciones:

| Requisito                 | Solución                               |
| ------------------------- | -------------------------------------- |
| Máximo siete diapositivas | Siete secciones HTML                   |
| Idioma inglés             | Todo el contenido visible en inglés    |
| Acceso público            | GitHub Pages                           |
| Sin registro              | Acceso directo                         |
| Enlace demo               | Botón en última diapositiva            |
| Enlace repositorio        | Enlace público                         |
| Responsive                | CSS adaptable                          |
| PDF                       | Impresión optimizada                   |
| Privacidad                | Sin imágenes identificables de menores |
| IA                        | Declaración transparente               |

**Publicación recomendada:** GitHub Pages, en un repositorio público.

La estructura permite publicar directamente la carpeta `presentacion/` sin necesitar un servidor propio ni procesos de compilación.

# **10. Orden de desarrollo**

Para evitar errores de integración, desarrollaría el proyecto en este orden:

1. **Configuración inicial**

   Crear carpetas, `index.html`, `config.js` y `main.js`. Comprobar que la web se abre correctamente.
2. **Sistema visual**

   Desarrollar `style.css`, `slides.css` y `animations.css`. Establecer la identidad visual.
3. **Estructura de las siete diapositivas**

   Maquetar todos los apartados con contenido en inglés y espacios preparados para las imágenes definitivas.
4. **Sistema de navegación**

   Desarrollar `navigation.js` y comprobar las siete diapositivas, teclado, progreso y pantalla completa.
5. **Animaciones e interacciones**

   Implementar `animations.js` e `interactions.js`.
6. **Recursos visuales**

   Incorporar imágenes satelitales, modelos 3D, capturas auténticas de vuestra demo, logotipo y gráficos.
7. **Revisión científica y publicación**

   Revisar enlaces, fuentes, atribuciones, declaraciones de IA, funcionamiento móvil y accesibilidad pública.

## **11. Mi recomendación final**

Hay tres aspectos en los que invertiría especialmente el tiempo:

1. **La portada:** tiene que generar interés en los primeros segundos.
2. **La quinta diapositiva:** debe demostrar visualmente que TerraScope sirve para comprender catástrofes reales.
3. **El acceso a la demo:** debe ser inmediato, estar visible y llevar al jurado directamente al producto.

La presentación no debe intentar sustituir a vuestra aplicación. Debe conseguir que el jurado quiera abrirla.

**El objetivo es que en menos de dos minutos cualquier persona pueda entender qué problema resolvéis, cómo funciona vuestra solución, qué relación tiene con los recursos de la NASA y por qué merece la pena desarrollarla.**

Mi siguiente paso sería desarrollar los 12 archivos completos, siguiendo exactamente esta arquitectura, empezando por `index.html` y dejando toda la presentación preparada para incorporar las capturas y el enlace definitivo de vuestra demo.

🛰️Desarrollar la presentación TerraScopeToca para configurar





Perfecto. Entonces tu responsabilidad se limita exclusivamente a `presentacion/`. La DEMO es un proyecto independiente desarrollado por tu compañero; tu presentación únicamente debe enlazarla.

Teniendo en cuenta las instrucciones del README, esta es la estructura definitiva que recomiendo:

## **Estructura de&#x20;**`presentacion/`

```
presentacion/
PRESENTACION/
├── index.html              # Las 7 diapositivas + HUD de navegación
├── README.md               # Este archivo — guía maestra del proyecto
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   ├── slides.css
│   └── animations.css
│   ├── style.css           # Sistema de diseño global y variables :root
│   ├── slides.css          # Layouts específicos de cada diapositiva
│   └── animations.css      # Animaciones de entrada y scroll
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   ├── interactions.js
│   ├── config.js
│   └── content.js
│   ├── config.js           # URLs externas (demo, repo), nombre del proyecto
│   ├── content.js          # Diccionario I18N (ES/EN) para todo el contenido
│   ├── navigation.js       # IntersectionObserver, scroll, atajos de teclado
│   ├── interactions.js     # Toggle de idioma, PDF, split slider, upvotes
│   ├── animations.js       # Inicialización del canvas de fondo (starfield)
│   └── main.js             # Punto de entrada — arranca todo el sistema
│
└── assets/
    ├── images/
    │   ├── logo/
    │   ├── backgrounds/
    │   ├── satellite/
    │   ├── disasters/
    │   └── screenshots/
    │
    ├── icons/
    │
    └── fonts/
    │   └── logo.svg
    └── images/
        ├── logo/
        │   └── geowave-badge.svg
        ├── screenshots/
        │   └── geowave-demo-preview.svg
        └── satellite/
            └── nisar-satellite.svg
```

## **Función de cada archivo**
**Sin frameworks. Sin bundler. Sin Node en producción.** HTML5 nativo + CSS3 + ES Modules. Funciona con cualquier servidor web estático o directamente abriendo `index.html` en el navegador.

### **1. HTML**
---

| Archivo      | Función                                                                            |
| ------------ | ---------------------------------------------------------------------------------- |
| `index.html` | Estructura completa de las siete diapositivas, navegación y elementos principales. |
## 6. Guia Paso a Paso: Crear o Modificar la Presentación

### **2. CSS**
Sigue este orden para mantener la coherencia del proyecto:

| Archivo          | Función                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `style.css`      | Identidad visual, variables, tipografía, colores y diseño general. |
| `slides.css`     | Maquetación específica de cada diapositiva.                        |
| `animations.css` | Transiciones, efectos cinematográficos y animaciones.              |
### Paso 1 — Definir o ajustar el contenido

### **3. JavaScript**
Edita `js/content.js`. Aquí está todo el texto de la presentación organizado por diapositiva y por idioma (`es` / `en`). Si quieres cambiar un titular, una descripción o las estadísticas de un caso de estudio, es aquí donde debes hacerlo.

| Archivo           | Función                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| `main.js`         | Inicialización y coordinación de todos los módulos.                       |
| `navigation.js`   | Navegación entre diapositivas, teclado, contador y barra de progreso.     |
| `animations.js`   | Control de las animaciones y aparición progresiva de elementos.           |
| `interactions.js` | Pantalla completa, controles, botones y enlaces.                          |
| `config.js`       | Nombre del proyecto, URL de la DEMO, repositorio y configuración general. |
| `content.js`      | Textos, títulos, descripciones y contenido de las siete diapositivas.     |
```js
// Ejemplo de estructura en content.js
export const I18N = {
  es: {
    slide01: { title: "...", subtitle: "..." },
    slide02: { ... }
  },
  en: { ... }
}
```

### **4. Recursos gráficos**
### Paso 2 — Ajustar la paleta de colores (si es necesario)

| Carpeta               | Contenido                                        |
| --------------------- | ------------------------------------------------ |
| `images/logo/`        | Logotipo e identidad de TerraScope.              |
| `images/backgrounds/` | Fondos espaciales y composiciones visuales.      |
| `images/satellite/`   | Imágenes de observación terrestre y satélites.   |
| `images/disasters/`   | Valencia, La Palma y Turquía.                    |
| `images/screenshots/` | Capturas reales de la DEMO de vuestro compañero. |
| `icons/`              | Iconos de navegación, tecnología y metodología.  |
| `fonts/`              | Tipografías locales, si decidís utilizarlas.     |
Edita únicamente las variables `:root` en `css/style.css`. Todos los colores del proyecto están centralizados ahí. **Nunca escribas valores hexadecimales directamente en `slides.css` o en el HTML** — usa siempre las variables CSS (`var(--primary)`, `var(--danger)`, etc.).

## **Distribución de las siete diapositivas**
```css
:root {
  --primary: #2DD4BF;    /* turquesa mineral */
  --danger: #E06D53;     /* terracota */
  --warning: #F59E0B;    /* ámbar geológico */
}
```

1. **01 — The changing planet:** portada e introducción.
2. **02 — The challenge:** problema y dificultad de interpretar datos satelitales.
3. **03 — Our solution:** presentación de TerraScope.
4. **04 — How it works:** funcionamiento de la plataforma.
5. **05 — Three disasters, three perspectives:** Valencia, La Palma y Turquía.
6. **06 — Beyond visualization:** dimensión colaborativa y conocimiento compartido.
7. **07 — The vision:** impacto futuro, enlace a la DEMO, repositorio y declaración de uso de IA.
### Paso 3 — Modificar el layout de una diapositiva

## **Configuración de enlaces**
Edita la sección correspondiente en `index.html` (cada `<section class="slide">` es una diapositiva). Para ajustes de posición, tamaño y disposición de los elementos de esa diapositiva, edita el bloque correspondiente en `css/slides.css`.

En `js/config.js` centralizarás las direcciones para no tener que buscarlas dentro del código HTML:
### Paso 4 — Añadir o cambiar animaciones

```
export const CONFIG = {
    projectName: "TerraScope",
Las animaciones de entrada están en `css/animations.css`. Usa las clases `animate-in delay-N` sobre los elementos que quieras animar. Para animaciones del canvas de fondo (el campo de estrellas procedural), edita `js/animations.js`.

    event: "NASA Space Apps Challenge Málaga 2026",
### Paso 5 — Cambiar el idioma o añadir traducciones

    demoUrl: "URL_DE_LA_DEMO_DE_TU_COMPAÑERO",
El sistema de idiomas carga texto desde `js/content.js` y lo inyecta con `js/interactions.js` (función `applyLanguage`). Para añadir un nuevo idioma: añade el objeto en `I18N`, registra el botón en el HUD de `index.html` y añade el caso en `applyLanguage`.

    repositoryUrl: "URL_DEL_REPOSITORIO",
### Paso 6 — Actualizar el enlace a la demo externa

    maxSlides: 7
};
Edita `js/config.js`:

```js
export const CONFIG = {
  projectName: "GeoWave",
  demoUrl: "https://url-de-la-demo-del-equipo.com",
  repositoryUrl: "https://github.com/equipo/geowave"
}
```

Estructura definitiva
### Paso 7 — Exportar la presentación a PDF

**12 archivos principales y una carpeta de recursos gráficos.** No necesitas backend, base de datos, CesiumJS ni código de procesamiento satelital. Tampoco necesitas desarrollar ninguna funcionalidad de la DEMO.
Abre `index.html` en Chrome → `Ctrl+P` (o pulsa `P` en la presentación) → "Guardar como PDF" → orientación Horizontal → sin márgenes. Cada diapositiva ocupa exactamente una página gracias a las reglas `@media print` en `css/style.css`.

La presentación será autónoma, responsive, navegable, preparada para exportar a PDF y publicable mediante GitHub Pages.
### Paso 8 — Verificar que no hay errores de JavaScript

Desde la carpeta `PRESENTACION/` ejecuta:
```bash
node -c js/config.js js/content.js js/navigation.js js/interactions.js js/animations.js js/main.js
```
Debe devolver código 0 sin mensajes de error.

---

## 7. Decisiones de Diseño Importantes

| Decisión | Motivo |
|----------|--------|
| Sin negro puro (#000) ni azul neón (#00f, #0ff) | Paleta saturada y genérica, sin identidad editorial propia |
| Scroll vertical continuo, no carrusel | Permite exportar a PDF (1 diapositiva = 1 página) y es más natural en monitores modernos |
| Sin webpack / bundler | Cero complejidad de setup; funciona directamente en cualquier servidor estático |
| I18N en JS, no en HTML | Un único `index.html` para ambos idiomas; el JS inyecta el texto correcto |
| Paleta mineral/terracota | Transmite ciencias de la Tierra, calor humano y rigor científico — no ciencia ficción |

PRESENTACION/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   ├── slides.css
│   └── animations.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   ├── animations.js
│   ├── interactions.js
│   ├── config.js
│   └── content.js
│
└── assets/
    ├── images/
    │   ├── logo/
    │   ├── backgrounds/
    │   ├── satellite/
    │   ├── disasters/
    │   └── screenshots/
    ├── icons/
    └── fonts/
---

## 8. Atribución Científica

Los datos y metodologías citados en la presentación provienen de:

- **NASA NISAR** (ISRO/NASA) — Radar de apertura sintética en bandas L y S
- **ESA Sentinel-1** (Copernicus) — SAR C-band para detección de cambios
- **Copernicus DEM** (30m) — Modelo digital de elevación global
- **NASA Earthdata** — Portal de acceso a pasadas orbitales y archivos históricos

---

## 9. Declaración de Uso de IA

    
El equipo GeoWave utilizó herramientas de asistencia IA en el diseño preliminar, prototipado del pipeline y síntesis de contenido editorial. Todas las afirmaciones científicas, metodologías geoespaciales y atribuciones de datos han sido revisadas y validadas manualmente por integrantes del equipo con formación técnica en teledetección y sistemas de información geográfica.