import ActivityCard from '../ActivityCard';
import recyclingIcon from '@assets/generated_images/Recycling_activity_icon_e6183701.png';
import bikingIcon from '@assets/generated_images/Biking_activity_icon_c9c89be0.png';
import plantingIcon from '@assets/generated_images/Tree_planting_activity_icon_4be35a62.png';

export default function ActivityCardExample() {
  return (
    <div className="space-y-4 p-6 max-w-2xl">
      <ActivityCard
        type="Recycling"
        description="Recycled 5kg of plastic and paper waste"
        co2Saved={2.3}
        pointsEarned={50}
        timestamp="2 hours ago"
        icon={recyclingIcon}
      />
      <ActivityCard
        type="Biking"
        description="Cycled 15km instead of driving"
        co2Saved={3.5}
        pointsEarned={75}
        timestamp="5 hours ago"
        icon={bikingIcon}
      />
      <ActivityCard
        type="Planting"
        description="Planted 3 trees in local community garden"
        co2Saved={12.0}
        pointsEarned={200}
        timestamp="1 day ago"
        icon={plantingIcon}
      />
    </div>
  );
}
