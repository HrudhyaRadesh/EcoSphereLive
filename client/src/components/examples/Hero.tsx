import Hero from '../Hero'

export default function HeroExample() {
  return (
    <Hero 
      onGetStarted={() => console.log('Get Started clicked')}
      onLearnMore={() => console.log('Learn More clicked')}
    />
  )
}
