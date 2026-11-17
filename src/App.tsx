import { MotionConfig } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageProvider'
import { Navbar } from './components/layout/Navbar'
import { Footer, SkipLink } from './components/layout/Footer'
import { Hero } from './components/hero/Hero'
import { TechStack } from './components/stack/TechStack'
import { Projects } from './components/projects/Projects'
import { Timeline } from './components/experience/Timeline'
import { Contact } from './components/contact/Contact'

export default function App() {
  return (
    <LanguageProvider>
      {/* reducedMotion="user": Framer Motion respeta prefers-reduced-motion */}
      <MotionConfig reducedMotion="user">
        <SkipLink />
        <Navbar />
        <main id="main">
          <Hero />
          <TechStack />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LanguageProvider>
  )
}
