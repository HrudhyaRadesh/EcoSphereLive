import EcoMap from '../EcoMap'

export default function EcoMapExample() {
  return (
    <EcoMap 
      startPoint={[51.505, -0.09]}
      endPoint={[51.515, -0.1]}
      onMapReady={(map) => console.log('Map ready:', map)}
    />
  )
}
