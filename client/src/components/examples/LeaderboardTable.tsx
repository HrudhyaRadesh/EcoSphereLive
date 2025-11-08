import LeaderboardTable from '../LeaderboardTable'

export default function LeaderboardTableExample() {
  const entries = [
    { rank: 1, username: 'EcoWarrior', points: 15420 },
    { rank: 2, username: 'GreenThumb', points: 12350 },
    { rank: 3, username: 'EarthLover', points: 10200 },
    { rank: 4, username: 'YourUsername', points: 8500, isCurrentUser: true },
    { rank: 5, username: 'NatureFan', points: 7800 },
  ]

  return <LeaderboardTable entries={entries} />
}
