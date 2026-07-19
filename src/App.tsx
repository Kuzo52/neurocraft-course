import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Outcomes } from './components/Outcomes'
import { Pricing } from './components/Pricing'
import { Program } from './components/Program'
import { Registration } from './components/Registration'
import { Reviews } from './components/Reviews'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Program />
        <Outcomes />
        <Pricing />
        <Reviews />
        <Registration />
      </main>
      <Footer />
    </>
  )
}
