import './index.css'
import useLenis from './hooks/useLenis'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import GameHUD from './components/GameHUD'
import StageNav from './components/StageNav'
import StageToast from './components/StageToast'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

export default function App() {
  useLenis()

  return (
    <div className="scanline" style={{ background: '#020305' }}>
      <Cursor />
      <Navbar />
      <GameHUD />
      <StageNav />
      <StageToast />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}
