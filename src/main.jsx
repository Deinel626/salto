import { StrictMode, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Camera, Menu, Send, X } from 'lucide-react'
import { createRoot } from 'react-dom/client'
import flyerImage from './media/flyer salto 5.jpg'
import promotionalVideo from './media/salto video promocional.mp4'
import nexoLatinoVideo from './media/Nexo Latino Video.mp4'
import './nexo-video.css'
import './styles.css'

const artists = [
  { number: '', name: 'BANDAS', tag: 'sección', image: '', className: 'artist-group bands-group' },
  { number: '01', name: 'PUNKIS', tag: 'banda', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/punkis.mty/' },
  { number: '02', name: 'COCO TRASH', tag: 'banda', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/coco_trash_/' },
  { number: '03', name: 'BLINDOUT', tag: 'banda', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/blindoutmx/' },
  { number: '04', name: 'MIENTEME', tag: 'banda', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/mienteme_slw/' },
  { number: '05', name: 'NO MIRES AL BRUJO', tag: 'banda', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/nomiresalbrujo/' },
  { number: '06', name: 'LAS FLORES TAMBIEN SANGRAN', tag: 'banda', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/lasflorestambiensangran/' },
  { number: '07', name: 'ESTRAFALARIA', tag: 'banda', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/estrafalaria_oficial/' },
  { number: '08', name: 'CENICERO', tag: 'banda', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/cenicero.re/' },
  { number: '', name: 'DJ', tag: 'sección', image: '', className: 'artist-group dj-group' },
  { number: '01', name: 'NENUKA', tag: 'dj', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/nenuka_no/' },
  { number: '02', name: 'ZAVALA', tag: 'dj', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/zavalaproduce/' },
  { number: '03', name: 'NUTRIAXO', tag: 'dj', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/01800nutriaxo/' },
  { number: '04', name: 'JUANAMARIHUANAA', tag: 'dj', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/juanamarihuanaa/' },
  { number: '05', name: 'PAO PADILLA', tag: 'dj', image: '', className: 'tilt-left', instagram: 'https://www.instagram.com/pao_padillaaa/' },
  { number: '06', name: 'BELLAKITO BELLAKON', tag: 'dj', image: '', className: 'tilt-right', instagram: 'https://www.instagram.com/bellakitobellakon/' },
]

const ticketUrl = 'https://luma.com/smos2ldo'
const bandFormEndpoint = import.meta.env.VITE_BAND_FORM_ENDPOINT || ''

function BandRegistration() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    if (!bandFormEndpoint) return
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const data = new FormData(form)
    data.append('form-name', 'band-registration')
    try {
      const response = await fetch(bandFormEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!response.ok) throw new Error('No se pudo enviar')
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return <section id="registro" className="band-registration poster-pad">
    <div className="section-label registration-label"><span>04</span> ¿QUIERES SUBIRTE?</div>
    <div className="registration-heading"><div><p className="eyebrow registration-eyebrow">[ LLAMADO A BANDAS ]</p><h2>REGISTRA<br /><em>TU BANDA</em></h2></div><p className="registration-intro">Si quieres tocar en la próxima edición de SALTO, deja tus datos. Escuchamos proyectos nuevos, ruidos y de aquí.</p></div>
    <form className="band-form" name="band-registration" method="POST" action="/" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="band-registration" /><p className="hidden-field"><label>No llenar: <input name="bot-field" /></label></p>
      <label><span>Nombre de la banda *</span><input required name="band-name" type="text" placeholder="ej. Las criaturas" /></label><label><span>Persona de contacto *</span><input required name="contact-name" type="text" placeholder="Tu nombre" /></label><label><span>Correo electrónico (opcional)</span><input name="email" type="email" placeholder="hola@tubanda.com" /></label><label><span>Instagram / enlace *</span><input required name="link" type="url" placeholder="https://instagram.com/tubanda" /></label><label className="full-field"><span>Cuéntanos sobre su sonido</span><textarea name="message" rows="4" placeholder="Género, ciudad y cualquier link para escucharlos…" /></label>
      <div className="form-footer"><small>Al enviar aceptas que SALTO use estos datos para contactarte sobre futuras ediciones.</small><button className="form-submit" disabled={status === 'sending'}>{status === 'sending' ? 'ENVIANDO…' : <>ENVIAR PROPUESTA <Send size={17} /></>}</button></div>{status === 'success' && <p className="form-message success-message" role="status">¡Listo! Recibimos la propuesta de tu banda.</p>}{status === 'error' && <p className="form-message error-message" role="alert">No se pudo enviar. Inténtalo de nuevo en un momento.</p>}
    </form>
  </section>
}

function Eye({ interactive = true }) {
  const eyeRef = useRef(null)
  const [blink, setBlink] = useState(false)
  useEffect(() => { const timer = setInterval(() => { setBlink(true); setTimeout(() => setBlink(false), 170) }, 3100); return () => clearInterval(timer) }, [])
  useEffect(() => {
    if (!interactive) return
    const track = (event) => { if (!eyeRef.current) return; const rect = eyeRef.current.getBoundingClientRect(); eyeRef.current.style.setProperty('--look-x', `${Math.max(-12, Math.min(12, (event.clientX - rect.left - rect.width / 2) / 22))}px`); eyeRef.current.style.setProperty('--look-y', `${Math.max(-8, Math.min(8, (event.clientY - rect.top - rect.height / 2) / 30))}px`) }
    window.addEventListener('pointermove', track); return () => window.removeEventListener('pointermove', track)
  }, [interactive])
  return <div ref={eyeRef} className={`ink-eye ${blink ? 'is-blinking' : ''}`} aria-label="Ojo dibujado decorativo"><div className="eye-scribble">(((</div><div className="eye-ball"><div className="iris"><span /></div></div><div className="eye-lid top" /><div className="eye-lid bottom" /></div>
}

function Scribbles() { return <><span className="scribble s1">✶</span><span className="scribble s2">✕</span><span className="scribble s3">↯</span><span className="scribble s4">!!!</span><span className="scribble s5">/\</span></> }

function App() {
  const [intro, setIntro] = useState(true), [menuOpen, setMenuOpen] = useState(false), [activeArtist, setActiveArtist] = useState(1)
  useEffect(() => { const timer = setTimeout(() => setIntro(false), 1250); return () => clearTimeout(timer) }, [])
  useEffect(() => {
    const links = document.querySelectorAll('a[href="#boletos"], a[href="#contacto"]')
    links.forEach((link) => { link.href = ticketUrl; link.target = '_blank'; link.rel = 'noreferrer' })
  }, [])
  useEffect(() => {
    const eventPhoto = document.querySelector('.event-photo')
    if (!eventPhoto) return
    const video = document.createElement('video')
    video.className = 'event-video'
    video.src = promotionalVideo
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.controls = true
    video.setAttribute('aria-label', 'Video promocional de SALTO')
    eventPhoto.prepend(video)
    const flyer = document.createElement('img')
    flyer.className = 'flyer-image'
    flyer.src = flyerImage
    flyer.alt = 'Flyer oficial de SALTO Vol. 5 Nexo Latino'
    eventPhoto.append(flyer)
    return () => { video.remove(); flyer.remove() }
  }, [])
  useEffect(() => {
    const ticketSection = document.getElementById('boletos')
    if (!ticketSection) return
    const costumeSection = document.createElement('section')
    costumeSection.id = 'disfraces'
    costumeSection.className = 'costume-section poster-pad'
    costumeSection.innerHTML = '<span class="costume-kicker">[ CÓDIGO DE VESTIMENTA ]</span><div class="costume-content"><div><span class="costume-symbol">//</span><h2>VEN<br /><em>DISFRAZADX</em></h2></div><div class="costume-copy"><p>Trae tu personaje, tu monstruo o tu versión más extraña.</p><strong>PROHIBIDO USAR MÁSCARA DE LÁTEX.</strong><small>Por seguridad de todxs.</small></div></div>'
    ticketSection.before(costumeSection)
    return () => costumeSection.remove()
  }, [intro, menuOpen, activeArtist])
  return <>
    {intro && <div className="intro-screen"><div className="intro-barcode">SALTILLO / 666 / 2026</div><Eye interactive={false} /><div className="intro-wordmark">SALTO<small>VOL. 05 / RUIDO LOCAL</small></div></div>}
    <header className="site-header"><a href="#top" className="brand">SALTO<sup>®</sup></a><div className="header-scrawl">SOLO RUIDO</div><nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#evento" onClick={() => setMenuOpen(false)}>el flyer</a><a href="#lineup" onClick={() => setMenuOpen(false)}>line up</a><a href="#nexo" onClick={() => setMenuOpen(false)}>nexo latino</a><a href="#boletos" onClick={() => setMenuOpen(false)}>boletos ↗</a></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X /> : <Menu />}</button></header>
    <main id="top">
      <section className="hero poster-pad"><div className="poster-tape tape-a" /><div className="poster-tape tape-b" /><Scribbles /><span className="margin-note note-a">SALTILLO, COAH.</span><span className="margin-note note-b">PRESENTA / 31.10.26</span><div className="hero-copy"><p className="eyebrow">[ UNA NOCHE / SIN PERMISO ]</p><h1>SALTO</h1><div className="hero-sub"><span>HALLOWEEN<br />EDITION</span><b>VOL.<br />05</b></div></div><div className="hero-eye-wrap"><Eye /><span>MIRA FIJO / NO PARPADEES</span></div><div className="hero-red-hand">ESTAMOS<br />HACIENDO<br />RUIDO</div><div className="hero-info"><span>31 OCTUBRE 2026</span><span>HORA: POR CONFIRMAR</span><span>UBICACIÓN: [PULCATA MARQUES AGUAYO]</span></div><a href="#boletos" className="sticker-button">¿VAS A SALTAR? <ArrowUpRight size={18} /></a><div className="hero-bottom-scribble">MÚSICA / CUERPOS / FUEGO / COMUNIDAD</div></section>
      <section id="evento" className="event-section poster-pad"><div className="section-label"><span>01</span> EL FLYER SE MUEVE</div><div className="event-copy"><h2>¿QUÉ ES<br /><em>SALTO?</em></h2><p>Un punto de encuentro para la música y el talento que nace aquí. <strong>No es una fiesta elegante.</strong><br /><br />Una señal desde Saltillo.</p></div><div className="event-photo"><div className="photo-x">X</div><div className="photo-placeholder">ARCHIVO<br /><i>VIVO</i><small>NO SIGNAL / 00X</small></div><span className="photo-stamp">SALTO<br />LOCAL<br />NOISE</span><span className="photo-caption">[ HECHO EN SALTILLO / POR SALTILLO / PARA SALTILLO ]</span></div></section>
      <section id="lineup" className="lineup-section poster-pad"><div className="section-label"><span>02</span> LOS NOMBRES DEL RUIDO</div><div className="lineup-heading"><h2>LINE<br /><em>UP</em></h2><span className="hand-note">pásale el ojo<br />a los nombres ↓</span></div><div className="artist-list">{artists.map((artist, index) => {
        const content = <><span className="artist-number">{artist.number}</span><span className="artist-name">{artist.name}</span><span className="artist-tag">{artist.tag}</span><span className="artist-plus">+</span></>
        const rowProps = { className: `artist-row ${artist.className} ${activeArtist === index ? 'active' : ''}`, onMouseEnter: () => setActiveArtist(index), onFocus: () => setActiveArtist(index) }
        return artist.instagram
          ? <a key={artist.name} href={artist.instagram} target="_blank" rel="noreferrer" {...rowProps}>{content}</a>
          : <button key={artist.name} type="button" {...rowProps}>{content}</button>
      })}</div><div className="artist-preview" style={{ backgroundImage: `url(${artists[activeArtist].image})` }}><span>REC / {artists[activeArtist].number}</span></div><div className="lineup-sticker">SÓLO<br />SONIDO<br />LOCAL</div></section>
      <section id="nexo" className="nexo-section poster-pad"><div className="nexo-tape" /><div className="section-label neon-label"><span>03</span> OTRO FLYER / OTRA FRECUENCIA</div><div className="nexo-content"><div><p className="eyebrow acid">[ PRESENTA ]</p><h2>NEXO<br /><em>LATINO</em></h2></div><p className="nexo-description">La escena no se vende.<br /><br /><span></span></p></div><div className="nexo-video-wrap"><video className="nexo-video" controls playsInline preload="metadata" aria-label="Nexo Latino Video"><source src={nexoLatinoVideo} type="video/mp4" />Tu navegador no puede reproducir este video.</video><span className="nexo-video-label">[ NEXO LATINO VIDEO ]</span></div><div className="nexo-orbit">✹</div><div className="nexo-graffiti">NO<br />LIMITES<br />NO<br />REGLAS</div></section>
      <section id="boletos" className="ticket-section poster-pad"><span className="ticket-corner">ÚLTIMO AVISO / ÚLTIMO AVISO / ÚLTIMO AVISO</span><div className="ticket-scribble">ENTRA<br />BAILA<br />ROMPE</div><h2>¿VAS A<br /><span>SALTAR?</span></h2><p>cupo limitado / trae a tu gente / no llegues tarde</p><a href="#contacto" className="ticket-sticker">COMPRAR BOLETOS <ArrowUpRight size={20} /></a></section>
      <BandRegistration />
    </main>
    <footer id="contacto" className="site-footer poster-pad"><div className="footer-top"><a href="#top" className="brand footer-brand">SALTO<sup>®</sup></a><p>Halloween edition<br /><small>nos vemos del otro lado.</small></p><div className="footer-social"><a href="https://www.instagram.com/salt0__/"><Camera size={17} /> Instagram</a></div></div><div className="footer-bottom"><span>© SALTO / 2026 / HECHO EN SALTILLO</span><span>✶ SIN VUELTAS ✶</span></div></footer>
  </>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
