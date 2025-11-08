import PersonalImpact from '../PersonalImpact';

export default function PersonalImpactExample() {
  return (
    <div className="p-6 max-w-md">
      <PersonalImpact
        yourCO2Saved={8.4}
        thisMonthCO2={5.2}
        lastMonthCO2={4.1}
        achievements={['First Tree', 'Eco Warrior', '50 Points']}
      />
    </div>
  );
}
