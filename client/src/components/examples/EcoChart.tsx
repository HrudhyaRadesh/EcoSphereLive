import EcoChart from '../EcoChart'

export default function EcoChartExample() {
  return (
    <EcoChart 
      type="doughnut"
      title="Carbon Breakdown"
      data={{
        labels: ['Travel', 'Diet', 'Electricity', 'Water'],
        values: [300, 200, 150, 100]
      }}
    />
  )
}
