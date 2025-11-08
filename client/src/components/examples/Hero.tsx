import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero 
      totalCO2Saved={34.7}
      onAddActivity={() => console.log('Add activity clicked')}
    />
  );
}
