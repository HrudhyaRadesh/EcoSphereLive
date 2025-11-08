import MetricCard from '../MetricCard';
import { Users, Leaf, Globe, Sparkles } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <MetricCard
        icon={Users}
        label="Active Users"
        value={1247}
        trend="up"
      />
      <MetricCard
        icon={Leaf}
        label="Tons of CO2 Saved"
        value={34.7}
        unit="tons"
        decimals={1}
        trend="up"
      />
      <MetricCard
        icon={Globe}
        label="Cities Worldwide"
        value={89}
        trend="up"
      />
      <MetricCard
        icon={Sparkles}
        label="Green Points"
        value={12450}
      />
    </div>
  );
}
