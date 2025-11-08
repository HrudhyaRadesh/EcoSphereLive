import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  isCurrentUser?: boolean;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <Card data-testid="table-leaderboard">
      <CardHeader>
        <CardTitle>Global Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                entry.isCurrentUser ? 'bg-primary/10 border border-primary/20' : 'hover-elevate'
              }`}
              data-testid={`row-leaderboard-${entry.rank}`}
            >
              <div className="w-8 text-center font-bold">
                {entry.rank <= 3 ? (
                  <Badge variant={entry.rank === 1 ? "default" : "secondary"}>
                    #{entry.rank}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">#{entry.rank}</span>
                )}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback>{entry.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{entry.username}</div>
                {entry.isCurrentUser && (
                  <Badge variant="outline" className="text-xs">You</Badge>
                )}
              </div>
              <div className="font-bold text-primary">{entry.points.toLocaleString()} pts</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
