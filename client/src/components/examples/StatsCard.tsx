import StatsCard from '../StatsCard'
import { TrendingDown } from 'lucide-react'

export default function StatsCardExample() {
  return (
    <StatsCard 
      icon={TrendingDown}
      title="Carbon Footprint"
      value="1,245 kg"
      change="-12% from last month"
      trend="down"
    />
  )
}
