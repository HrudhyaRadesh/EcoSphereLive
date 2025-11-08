import FeatureCard from '../FeatureCard'
import { Leaf } from 'lucide-react'

export default function FeatureCardExample() {
  return (
    <FeatureCard 
      icon={Leaf}
      title="Carbon Tracking"
      description="Monitor your daily carbon footprint with real-time calculations and insights"
      onClick={() => console.log('Feature card clicked')}
    />
  )
}
