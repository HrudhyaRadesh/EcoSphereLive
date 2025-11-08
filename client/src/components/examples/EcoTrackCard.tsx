import EcoTrackCard from '../EcoTrackCard'
import { Car } from 'lucide-react'

export default function EcoTrackCardExample() {
  return (
    <EcoTrackCard 
      icon={Car}
      title="Travel"
      fields={[
        { name: 'car', label: 'Car Distance', unit: 'km', placeholder: '0' },
        { name: 'bus', label: 'Bus/Train Distance', unit: 'km', placeholder: '0' },
        { name: 'flight', label: 'Flight Distance', unit: 'km', placeholder: '0' }
      ]}
      onDataChange={(data) => console.log('Travel data:', data)}
    />
  )
}
