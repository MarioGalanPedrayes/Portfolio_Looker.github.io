/* ============================================================
   main.js · Portfolio Looker
   ============================================================
   Este archivo gestiona toda la interactividad de la web:
   1. Navbar: efecto de scroll
   2. Animaciones de entrada por scroll (IntersectionObserver)
   3. Diagrama de flujo: animación por pasos
   4. Dashboard simulado: datos, KPIs, gráficos y tabla
   ============================================================ */


/* ============================================================
   1. NAVBAR · EFECTO SCROLL
   Añade la clase .scrolled a la navbar cuando el usuario
   baja más de 50px, lo que activa un fondo más opaco en CSS.
============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ============================================================
   2. ANIMACIONES DE ENTRADA POR SCROLL
   IntersectionObserver observa todos los elementos con el
   atributo [data-animate]. Cuando entran en el viewport,
   les añade la clase .visible que activa la transición CSS.
============================================================ */
const animatedElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.15,          // Se activa cuando el 15% del elemento es visible
  rootMargin: '0px 0px -40px 0px'  // Margen inferior para activar un poco antes
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Retraso escalonado basado en el índice del elemento
      // para que las tarjetas aparezcan una detrás de otra
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);

      // Una vez animado, dejar de observar para ahorrar recursos
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedElements.forEach(el => observer.observe(el));


/* ============================================================
   3. ANIMACIÓN DEL DIAGRAMA DE FLUJO
   Los pasos del diagrama se animan de uno en uno con un
   retardo escalonado cuando el diagrama entra en el viewport.
============================================================ */
const flowDiagram = document.getElementById('flow-diagram');
const flowSteps   = document.querySelectorAll('.flow-step');

const flowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Anima cada paso con un retardo de 200ms entre ellos
      flowSteps.forEach((step, i) => {
        setTimeout(() => {
          step.classList.add('visible');
        }, i * 200);
      });
      flowObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

if (flowDiagram) {
  flowObserver.observe(flowDiagram);
}


/* ============================================================
   4. DASHBOARD SIMULADO
   ============================================================
   Datos ficticios organizados por trimestre (Q1–Q4 2024).
   Cuando el usuario cambia el período en el <select>,
   se actualizan los KPIs, los gráficos y la tabla.
============================================================ */

/**
 * BASE DE DATOS FICTICIA
 * Cada clave es un período (q1, q2, q3, q4).
 * Contiene: KPIs, datos de barras, datos de dona y tabla de clientes.
 */
const dashboardData = {

  q1: {
    /* Métricas clave del período */
    kpis: {
      ingresos:        '€ 38.450',
      ingresosTrend:   '▲ 5% vs Q4 anterior',
      gastos:          '€ 22.100',
      gastosTrend:     '▼ 3% vs Q4 anterior',
      beneficio:       '€ 16.350',
      beneficioTrend:  '▲ 11% vs Q4 anterior',
      clientes:        '24',
      clientesTrend:   '▲ 2 nuevos clientes',
    },

    /* Datos para el gráfico de barras: ingresos y gastos por mes */
    barras: {
      labels:   ['Enero', 'Febrero', 'Marzo'],
      ingresos: [11200, 13400, 13850],
      gastos:   [7200,  7600,  7300],
    },

    /* Datos para el gráfico de dona: distribución de gastos */
    dona: [
      { label: 'Personal',     value: 9800,  color: '#2563eb' },
      { label: 'Alquiler',     value: 4200,  color: '#10b981' },
      { label: 'Software',     value: 3100,  color: '#f59e0b' },
      { label: 'Marketing',    value: 3000,  color: '#8b5cf6' },
      { label: 'Otros',        value: 2000,  color: '#64748b' },
    ],

    /* Tabla de top clientes */
    clientes: [
      { nombre: 'Inversiones Castilla S.L.',  sector: 'Inversión',    facturacion: '€ 8.200',  crecimiento: '+12%' },
      { nombre: 'Autoservicio Pérez',          sector: 'Retail',       facturacion: '€ 5.400',  crecimiento: '+4%'  },
      { nombre: 'Clínica Dental Moreno',       sector: 'Salud',        facturacion: '€ 4.800',  crecimiento: '-2%'  },
      { nombre: 'Transportes Ávila',           sector: 'Logística',    facturacion: '€ 4.200',  crecimiento: '+7%'  },
      { nombre: 'Café Central',                sector: 'Hostelería',   facturacion: '€ 3.100',  crecimiento: '+1%'  },
    ],
  },

  q2: {
    kpis: {
      ingresos:        '€ 42.800',
      ingresosTrend:   '▲ 11% vs Q1',
      gastos:          '€ 23.500',
      gastosTrend:     '▲ 6% vs Q1',
      beneficio:       '€ 19.300',
      beneficioTrend:  '▲ 18% vs Q1',
      clientes:        '27',
      clientesTrend:   '▲ 3 nuevos clientes',
    },

    barras: {
      labels:   ['Abril', 'Mayo', 'Junio'],
      ingresos: [13500, 14800, 14500],
      gastos:   [7800,  7900,  7800],
    },

    dona: [
      { label: 'Personal',     value: 10500, color: '#2563eb' },
      { label: 'Alquiler',     value: 4200,  color: '#10b981' },
      { label: 'Software',     value: 3300,  color: '#f59e0b' },
      { label: 'Marketing',    value: 3500,  color: '#8b5cf6' },
      { label: 'Otros',        value: 2000,  color: '#64748b' },
    ],

    clientes: [
      { nombre: 'Inversiones Castilla S.L.',  sector: 'Inversión',    facturacion: '€ 9.100',  crecimiento: '+11%' },
      { nombre: 'Autoservicio Pérez',          sector: 'Retail',       facturacion: '€ 5.800',  crecimiento: '+7%'  },
      { nombre: 'Grupo Constructor Sur',       sector: 'Construcción', facturacion: '€ 5.200',  crecimiento: '+21%' },
      { nombre: 'Clínica Dental Moreno',       sector: 'Salud',        facturacion: '€ 4.900',  crecimiento: '+2%'  },
      { nombre: 'Transportes Ávila',           sector: 'Logística',    facturacion: '€ 4.400',  crecimiento: '+5%'  },
    ],
  },

  q3: {
    kpis: {
      ingresos:        '€ 48.320',
      ingresosTrend:   '▲ 12% vs Q2',
      gastos:          '€ 24.100',
      gastosTrend:     '▲ 3% vs Q2',
      beneficio:       '€ 24.220',
      beneficioTrend:  '▲ 26% vs Q2',
      clientes:        '31',
      clientesTrend:   '▲ 4 nuevos clientes',
    },

    barras: {
      labels:   ['Julio', 'Agosto', 'Septiembre'],
      ingresos: [15200, 16100, 17020],
      gastos:   [8100,  7900,  8100],
    },

    dona: [
      { label: 'Personal',     value: 11200, color: '#2563eb' },
      { label: 'Alquiler',     value: 4200,  color: '#10b981' },
      { label: 'Software',     value: 3400,  color: '#f59e0b' },
      { label: 'Marketing',    value: 3200,  color: '#8b5cf6' },
      { label: 'Otros',        value: 2100,  color: '#64748b' },
    ],

    clientes: [
      { nombre: 'Inversiones Castilla S.L.',  sector: 'Inversión',    facturacion: '€ 10.400', crecimiento: '+14%' },
      { nombre: 'Grupo Constructor Sur',       sector: 'Construcción', facturacion: '€ 7.200',  crecimiento: '+38%' },
      { nombre: 'Autoservicio Pérez',          sector: 'Retail',       facturacion: '€ 6.100',  crecimiento: '+5%'  },
      { nombre: 'Clínica Dental Moreno',       sector: 'Salud',        facturacion: '€ 5.200',  crecimiento: '+6%'  },
      { nombre: 'Transportes Ávila',           sector: 'Logística',    facturacion: '€ 4.800',  crecimiento: '+9%'  },
    ],
  },

  q4: {
    kpis: {
      ingresos:        '€ 51.700',
      ingresosTrend:   '▲ 7% vs Q3',
      gastos:          '€ 26.900',
      gastosTrend:     '▲ 12% vs Q3',
      beneficio:       '€ 24.800',
      beneficioTrend:  '▲ 2% vs Q3',
      clientes:        '33',
      clientesTrend:   '▲ 2 nuevos clientes',
    },

    barras: {
      labels:   ['Octubre', 'Noviembre', 'Diciembre'],
      ingresos: [16800, 17200, 17700],
      gastos:   [8600,  9100,  9200],
    },

    dona: [
      { label: 'Personal',     value: 12100, color: '#2563eb' },
      { label: 'Alquiler',     value: 4200,  color: '#10b981' },
      { label: 'Software',     value: 3600,  color: '#f59e0b' },
      { label: 'Marketing',    value: 4200,  color: '#8b5cf6' },
      { label: 'Otros',        value: 2800,  color: '#64748b' },
    ],

    clientes: [
      { nombre: 'Inversiones Castilla S.L.',  sector: 'Inversión',    facturacion: '€ 11.200', crecimiento: '+8%'  },
      { nombre: 'Grupo Constructor Sur',       sector: 'Construcción', facturacion: '€ 8.400',  crecimiento: '+17%' },
      { nombre: 'Autoservicio Pérez',          sector: 'Retail',       facturacion: '€ 6.500',  crecimiento: '+7%'  },
      { nombre: 'Farmacia López',              sector: 'Salud',        facturacion: '€ 5.800',  crecimiento: '+31%' },
      { nombre: 'Transportes Ávila',           sector: 'Logística',    facturacion: '€ 5.100',  crecimiento: '+6%'  },
    ],
  },
};


/* ============================================================
   FUNCIÓN: updateKPIs
   Actualiza las tarjetas de métricas clave con los datos
   del período seleccionado. Anima el cambio con una clase CSS.
   @param {object} kpis - Objeto con los valores del período
============================================================ */
function updateKPIs(kpis) {
  const fields = [
    { id: 'kpi-ingresos',         value: kpis.ingresos        },
    { id: 'kpi-ingresos-trend',   value: kpis.ingresosTrend   },
    { id: 'kpi-gastos',           value: kpis.gastos          },
    { id: 'kpi-gastos-trend',     value: kpis.gastosTrend     },
    { id: 'kpi-beneficio',        value: kpis.beneficio       },
    { id: 'kpi-beneficio-trend',  value: kpis.beneficioTrend  },
    { id: 'kpi-clientes',         value: kpis.clientes        },
    { id: 'kpi-clientes-trend',   value: kpis.clientesTrend   },
  ];

  fields.forEach(({ id, value }) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Efecto de parpadeo para marcar el cambio de valor
    el.style.opacity = '0';
    el.style.transform = 'translateY(-4px)';
    setTimeout(() => {
      el.textContent = value;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 150);
  });
}


/* ============================================================
   FUNCIÓN: drawBarChart
   Dibuja un gráfico de barras agrupadas (ingresos vs gastos)
   en un elemento <canvas> usando la Canvas 2D API nativa.
   No depende de ninguna librería externa.
   @param {HTMLCanvasElement} canvas
   @param {object} data - { labels, ingresos, gastos }
============================================================ */
function drawBarChart(canvas, data) {
  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;

  // Limpia el canvas antes de redibujar
  ctx.clearRect(0, 0, W, H);

  const padding   = { top: 20, right: 20, bottom: 40, left: 56 };
  const chartW    = W - padding.left - padding.right;
  const chartH    = H - padding.top  - padding.bottom;

  const allValues = [...data.ingresos, ...data.gastos];
  const maxVal    = Math.max(...allValues) * 1.15;   // 15% de espacio superior

  const months    = data.labels.length;
  const groupW    = chartW / months;
  const barW      = groupW * 0.3;
  const gap       = groupW * 0.05;

  /* Dibuja líneas de guía horizontales y etiquetas del eje Y */
  const ySteps = 4;
  ctx.strokeStyle = 'rgba(30, 45, 69, 0.8)';
  ctx.lineWidth   = 1;
  ctx.fillStyle   = '#64748b';
  ctx.font        = '11px DM Sans, sans-serif';
  ctx.textAlign   = 'right';

  for (let i = 0; i <= ySteps; i++) {
    const yVal  = (maxVal / ySteps) * i;
    const yPos  = padding.top + chartH - (chartH * i / ySteps);

    ctx.beginPath();
    ctx.moveTo(padding.left, yPos);
    ctx.lineTo(padding.left + chartW, yPos);
    ctx.stroke();

    // Etiqueta del eje Y (formatea en miles con €)
    const label = yVal >= 1000
      ? `€${(yVal / 1000).toFixed(0)}k`
      : `€${yVal.toFixed(0)}`;
    ctx.fillText(label, padding.left - 8, yPos + 4);
  }

  /* Dibuja las barras con animación frame a frame */
  let progress = 0;

  function animate() {
    // Redibuja las líneas de guía en cada frame (necesario al limpiar)
    ctx.clearRect(0, 0, W, H);

    // Líneas guía
    ctx.strokeStyle = 'rgba(30, 45, 69, 0.8)';
    ctx.lineWidth   = 1;
    ctx.fillStyle   = '#64748b';
    ctx.font        = '11px DM Sans, sans-serif';
    ctx.textAlign   = 'right';

    for (let i = 0; i <= ySteps; i++) {
      const yVal = (maxVal / ySteps) * i;
      const yPos = padding.top + chartH - (chartH * i / ySteps);
      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(padding.left + chartW, yPos);
      ctx.stroke();
      const label = yVal >= 1000
        ? `€${(yVal / 1000).toFixed(0)}k`
        : `€${yVal.toFixed(0)}`;
      ctx.fillText(label, padding.left - 8, yPos + 4);
    }

    // Dibuja cada grupo de barras
    data.labels.forEach((label, i) => {
      const groupX = padding.left + i * groupW + groupW * 0.1;

      // Barra de ingresos (azul)
      const ingHeight = (data.ingresos[i] / maxVal) * chartH * progress;
      ctx.fillStyle = '#2563eb';
      ctx.beginPath();
      ctx.roundRect(groupX, padding.top + chartH - ingHeight, barW, ingHeight, [3, 3, 0, 0]);
      ctx.fill();

      // Barra de gastos (ámbar)
      const gasHeight = (data.gastos[i] / maxVal) * chartH * progress;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(groupX + barW + gap, padding.top + chartH - gasHeight, barW, gasHeight, [3, 3, 0, 0]);
      ctx.fill();

      // Etiqueta del mes en el eje X
      ctx.fillStyle   = '#64748b';
      ctx.font        = '11px DM Sans, sans-serif';
      ctx.textAlign   = 'center';
      ctx.fillText(label, groupX + barW + gap / 2, H - padding.bottom + 18);
    });

    // Avanza la animación
    if (progress < 1) {
      progress = Math.min(progress + 0.06, 1);
      requestAnimationFrame(animate);
    }
  }

  animate();
}


/* ============================================================
   FUNCIÓN: drawDonutChart
   Dibuja un gráfico de dona con los datos de distribución
   de gastos. También rellena la leyenda lateral.
   @param {HTMLCanvasElement} canvas
   @param {Array} data - [{ label, value, color }]
============================================================ */
function drawDonutChart(canvas, data) {
  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const cx     = W / 2;
  const cy     = H / 2;
  const radius = Math.min(W, H) / 2 - 16;
  const inner  = radius * 0.58;     // Radio interior de la dona

  const total  = data.reduce((sum, d) => sum + d.value, 0);
  let startAngle = -Math.PI / 2;    // Empezar desde arriba (12 en punto)

  // Animación de la dona
  let progress = 0;

  function animate() {
    ctx.clearRect(0, 0, W, H);

    let angle = startAngle;
    data.forEach(segment => {
      const slice = (segment.value / total) * Math.PI * 2 * progress;

      // Segmento de la dona
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + slice);
      ctx.arc(cx, cy, inner, angle + slice, angle, true);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();

      // Separador blanco entre segmentos
      ctx.strokeStyle = '#111827';
      ctx.lineWidth   = 2;
      ctx.stroke();

      angle += slice;
    });

    // Texto central: total
    if (progress === 1) {
      ctx.fillStyle   = '#e2e8f0';
      ctx.font        = 'bold 13px DM Sans, sans-serif';
      ctx.textAlign   = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Total', cx, cy - 10);
      ctx.font        = 'bold 15px DM Sans, sans-serif';
      ctx.fillStyle   = '#94a3b8';
      ctx.fillText(`€${(total / 1000).toFixed(1)}k`, cx, cy + 10);
    }

    if (progress < 1) {
      progress = Math.min(progress + 0.05, 1);
      requestAnimationFrame(animate);
    }
  }

  animate();

  // Rellena la leyenda con puntos de color y etiquetas
  const legendEl = document.getElementById('dona-legend');
  if (legendEl) {
    legendEl.innerHTML = data.map(d => `
      <span style="display:flex; align-items:center; gap:0.4rem; font-size:0.78rem; color:#94a3b8;">
        <span style="width:9px;height:9px;border-radius:50%;background:${d.color};flex-shrink:0;display:inline-block;"></span>
        ${d.label}
      </span>
    `).join('');
  }
}


/* ============================================================
   FUNCIÓN: updateTable
   Rellena el cuerpo de la tabla de clientes con los datos
   del período seleccionado, incluyendo clases de color para
   el indicador de crecimiento (positivo / negativo).
   @param {Array} clientes - Array de objetos de clientes
============================================================ */
function updateTable(clientes) {
  const tbody = document.getElementById('tabla-clientes');
  if (!tbody) return;

  tbody.innerHTML = clientes.map(c => {
    // Determina si el crecimiento es positivo o negativo
    const growthClass = c.crecimiento.startsWith('+')
      ? 'growth-positive'
      : 'growth-negative';

    return `
      <tr>
        <td>${c.nombre}</td>
        <td>${c.sector}</td>
        <td><strong>${c.facturacion}</strong></td>
        <td class="${growthClass}">${c.crecimiento}</td>
      </tr>
    `;
  }).join('');
}


/* ============================================================
   FUNCIÓN: renderDashboard
   Función principal que orquesta la actualización completa
   del dashboard al cambiar de período:
   1. Lee los datos del período seleccionado
   2. Actualiza los KPIs
   3. Redibuja los gráficos
   4. Actualiza la tabla
   @param {string} period - Clave del período (q1, q2, q3, q4)
============================================================ */
function renderDashboard(period) {
  const data = dashboardData[period];
  if (!data) return;

  updateKPIs(data.kpis);

  const canvasBarras = document.getElementById('chart-barras');
  const canvasDona   = document.getElementById('chart-dona');

  if (canvasBarras) drawBarChart(canvasBarras, data.barras);
  if (canvasDona)   drawDonutChart(canvasDona, data.dona);

  updateTable(data.clientes);
}


/* ============================================================
   EVENTO: CAMBIO DE PERÍODO
   Escucha el evento change del select de período.
   Cada vez que cambia, vuelve a renderizar el dashboard
   con los datos del período elegido.
============================================================ */
const filtroPeriodo = document.getElementById('filtro-periodo');

if (filtroPeriodo) {
  filtroPeriodo.addEventListener('change', (e) => {
    renderDashboard(e.target.value);
  });
}


/* ============================================================
   INICIALIZACIÓN
   Al cargar la página, renderiza el dashboard con el período
   por defecto (Q3, que es el que aparece seleccionado en HTML).
   Se usa DOMContentLoaded para garantizar que el DOM esté listo.
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const initialPeriod = filtroPeriodo ? filtroPeriodo.value : 'q3';
  renderDashboard(initialPeriod);
});
