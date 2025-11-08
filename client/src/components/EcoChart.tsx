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
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          "hsl(var(--chart-1))",
          "hsl(var(--chart-2))",
          "hsl(var(--chart-3))",
          "hsl(var(--chart-4))",
          "hsl(var(--chart-5))",
        ],
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
