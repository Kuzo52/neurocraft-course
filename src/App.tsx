import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Outcomes } from './components/Outcomes'
import { Pricing, type PlanId } from './components/Pricing'
import { Program } from './components/Program'
import { Registration } from './components/Registration'
import { Reviews } from './components/Reviews'

export default function App() {
  const [selectedPlanId, setSelectedPlanId] = useState<PlanId | null>(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Program />
        <Outcomes />
        <Pricing selectedPlanId={selectedPlanId} onSelectPlan={setSelectedPlanId} />
        <Reviews />
        <Registration selectedPlanId={selectedPlanId} />
      </main>
      <Footer />
    </>
  )
}
