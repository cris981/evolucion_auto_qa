import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  LayoutDashboard,
  Menu,
  Settings,
  TestTube2,
  TriangleAlert,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const evolution = [
  { month: 'Ene', automated: 182, total: 420 },
  { month: 'Feb', automated: 211, total: 438 },
  { month: 'Mar', automated: 248, total: 451 },
  { month: 'Abr', automated: 273, total: 467 },
  { month: 'May', automated: 308, total: 486 },
  { month: 'Jun', automated: 346, total: 502 },
  { month: 'Jul', automated: 371, total: 518 },
  { month: 'Ago', automated: 408, total: 536 },
]

const areas = [
  { name: 'Checkout', automated: 94, total: 108, trend: 8, status: 'En objetivo' },
  { name: 'Catálogo', automated: 87, total: 112, trend: 5, status: 'En progreso' },
  { name: 'Usuarios', automated: 76, total: 96, trend: 3, status: 'En progreso' },
  { name: 'Backoffice', automated: 63, total: 101, trend: -2, status: 'Requiere foco' },
  { name: 'Integraciones', automated: 88, total: 119, trend: 6, status: 'En progreso' },
]

const periods = ['6 meses', '8 meses', '12 meses']

function Metric({ icon: Icon, label, value, detail, tone = 'green' }) {
  return (
    <article className="metric">
      <div className={`metric-icon ${tone}`}><Icon size={19} strokeWidth={1.8} /></div>
      <div>
        <p className="eyebrow">{label}</p>
        <strong>{value}</strong>
        <p className="metric-detail">{detail}</p>
      </div>
    </article>
  )
}

Metric.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  tone: PropTypes.string,
}

function App() {
  const [period, setPeriod] = useState('8 meses')
  const [menuOpen, setMenuOpen] = useState(false)
  const visibleData = period === '6 meses' ? evolution.slice(-6) : evolution

  return (
    <div className="app-shell">
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <span className="brand-mark"><TestTube2 size={20} /></span>
          <span>QA Pulse</span>
        </div>
        <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"><X size={20} /></button>
        <nav aria-label="Navegación principal">
          <a className="nav-item active" href="#resumen"><LayoutDashboard size={18} />Resumen</a>
          <a className="nav-item" href="#evolucion"><Activity size={18} />Evolución</a>
          <a className="nav-item" href="#cobertura"><Bot size={18} />Cobertura</a>
        </nav>
        <div className="sidebar-foot">
          <a className="nav-item" href="#configuracion"><Settings size={18} />Configuración</a>
          <div className="team-chip">
            <span>QA</span>
            <div><strong>Equipo Core</strong><small>8 integrantes</small></div>
          </div>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Abrir menú"><Menu size={21} /></button>
          <div className="topbar-date"><CalendarDays size={17} /><span>Actualizado: 28 sep 2026</span></div>
          <button className="export-button"><Download size={17} />Exportar informe</button>
        </header>

        <div className="content" id="resumen">
          <section className="page-heading">
            <div>
              <p className="kicker">AUTOMATIZACIÓN DE QA</p>
              <h1>El progreso, con contexto.</h1>
              <p>Una lectura clara de la cobertura automatizada, su ritmo y los próximos puntos de atención.</p>
            </div>
            <div className="release-badge"><span></span>Sprint 38 · estable</div>
          </section>

          <section className="metrics-grid" aria-label="Indicadores principales">
            <Metric icon={Bot} label="Cobertura automatizada" value="76%" detail="+9 puntos este trimestre" />
            <Metric icon={CheckCircle2} label="Casos automatizados" value="408" detail="de 536 casos totales" tone="blue" />
            <Metric icon={Clock3} label="Tiempo ahorrado" value="128 h" detail="estimadas este mes" tone="amber" />
            <Metric icon={TriangleAlert} label="Tests inestables" value="12" detail="-4 desde el sprint anterior" tone="red" />
          </section>

          <section className="chart-section" id="evolucion">
            <div className="section-heading">
              <div>
                <p className="eyebrow">HISTÓRICO</p>
                <h2>Evolución de la cobertura</h2>
              </div>
              <div className="period-control">
                <select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Periodo del gráfico">
                  {periods.map((item) => <option key={item}>{item}</option>)}
                </select>
                <ChevronDown size={15} />
              </div>
            </div>
            <div className="chart-legend"><span className="dot automated"></span>Automatizados <span className="dot total"></span>Casos totales</div>
            <div className="chart-wrap">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visibleData} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
                  <defs>
                    <linearGradient id="automatedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16735f" stopOpacity={0.24} />
                      <stop offset="100%" stopColor="#16735f" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#dedbd4" strokeDasharray="3 5" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#77756f', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#77756f', fontSize: 12 }} />
                  <Tooltip contentStyle={{ border: '1px solid #d7d3ca', borderRadius: 6, boxShadow: '0 8px 24px rgba(28, 32, 29, .08)' }} />
                  <Area type="monotone" dataKey="total" stroke="#a7a49d" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Casos totales" />
                  <Area type="monotone" dataKey="automated" stroke="#16735f" fill="url(#automatedFill)" strokeWidth={3} name="Automatizados" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="coverage-section" id="cobertura">
            <div className="section-heading">
              <div>
                <p className="eyebrow">POR DOMINIO</p>
                <h2>Cobertura por área</h2>
              </div>
              <p className="section-note">Objetivo del trimestre: 80%</p>
            </div>
            <div className="coverage-table" role="table" aria-label="Cobertura automatizada por área">
              <div className="table-row table-head" role="row">
                <span>Área</span><span>Cobertura</span><span>Casos</span><span>Variación</span><span>Estado</span>
              </div>
              {areas.map((area) => {
                const percentage = Math.round((area.automated / area.total) * 100)
                return (
                  <div className="table-row" role="row" key={area.name}>
                    <strong>{area.name}</strong>
                    <div className="progress-cell"><div className="progress-track"><span style={{ width: `${percentage}%` }}></span></div><b>{percentage}%</b></div>
                    <span>{area.automated} / {area.total}</span>
                    <span className={area.trend >= 0 ? 'trend up' : 'trend down'}>{area.trend >= 0 ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}{Math.abs(area.trend)}%</span>
                    <span className={`status ${area.status === 'Requiere foco' ? 'attention' : area.status === 'En objetivo' ? 'success' : ''}`}>{area.status}</span>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </main>
      {menuOpen && <button className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú"></button>}
    </div>
  )
}

export default App