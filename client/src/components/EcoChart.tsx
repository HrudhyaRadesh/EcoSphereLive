import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EcoChartProps {
  type: "doughnut" | "bar";
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}

export default function EcoChart({ type, title, data }: EcoChartProps) {
  // Map category names to specific colors
  const getCategoryColor = (label: string): string => {
    const colorMap: Record<string, string> = {
      'Travel': 'rgb(59, 130, 246)',        // Blue
      'Diet': 'rgb(34, 197, 94)',           // Green
      'Electricity': 'rgb(251, 191, 36)',   // Yellow/Amber
      'Water': 'rgb(14, 165, 233)',         // Cyan/Light Blue
    };
    return colorMap[label] || "hsl(var(--chart-1))";
  };

  // Generate background colors based on labels
  const backgroundColor = data.labels.map(label => getCategoryColor(label));

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: backgroundColor,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "hsl(var(--foreground))",
          padding: 15,
        },
      },
    },
  };

  return (
    <Card data-testid={`chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "doughnut" ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </CardContent>
    </Card>
  );
}
