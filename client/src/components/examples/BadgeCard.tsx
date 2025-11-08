import BadgeCard from '../BadgeCard'
import { Award } from 'lucide-react'

export default function BadgeCardExample() {
  return (
    <BadgeCard 
      icon={Award}
      title="Carbon Saver"
      description="Reduced carbon by 100kg"
      unlocked={true}
      date="Nov 5, 2025"
    />
  )
}
