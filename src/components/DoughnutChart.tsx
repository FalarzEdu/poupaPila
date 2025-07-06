import {Text, View} from "react-native";
import PieChart from "react-native-pie-chart";
import {useEffect, useState} from "react";
import TransactionRepository from "@database/repository/TransactionRepository";
import changeThemeStore from "@states/ColourTheme";

export type DoughnutSeries = {
  value: number;
  color: string;
  label?: { text: string, fontWeight?: 'normal' | 'bold' | 'bolder', fill?: string, fontSize?: number };
}

export type DoughnutLabelData = {
  description: string;
  colour: string;
}

interface CustomDoughnutChartProps {
  refreshKey: number;
}

export default function CustomDoughnutChart({ refreshKey }: CustomDoughnutChartProps) {

  const { theme } = changeThemeStore();

  const [chartInfo, setChartInfo] = useState<Array<DoughnutSeries>>([])
  const [chartLabelData, setChartLabelData] = useState<Array<DoughnutLabelData>>([])

  const formatDecimalToPercentage = (value: number): string => {
    return Math.trunc(value * 100).toString();
  }

  const loadChartInformation = async (): Promise<void> => {
    const chartData = await TransactionRepository.expensesByCategory();

    const chartSeries: Array<DoughnutSeries> = [];
    const chartLabel: Array<DoughnutLabelData> = [];
    for (const chart of chartData.data)
    {
      chartSeries.push({
        value: chart.categoryPrice,
        color: chart.colour,
        label: {
          text: formatDecimalToPercentage(chart.categoryPrice / chart.totalPrice) + "%",
          fontWeight: "bolder",
          fill: theme.background.primary,
          fontSize: 16
        }
      });

      chartLabel.push({
        description: chart.description,
        colour: chart.colour
      });
    }

    setChartInfo(chartSeries);
    setChartLabelData(chartLabel);
  }

  useEffect(() => {
    loadChartInformation();
  }, [refreshKey]);

  if (chartInfo.length === 0) {
    return (
      <View className="flex justify-center mt-6 bg-secondary px-2 py-6 rounded-xl">
        <Text className="text-normal text-sm font-regular-poppins text-center">
          Nenhuma despesa registrada este mês para exibir.
        </Text>
      </View>
    )
  }

  return (
    <View className="flex justify-center items-center mt-6">

      <Text className="mb-6 text-lg text-alternative font-regular-poppins" >Despesas por Categoria</Text>

      <View className="flex flex-row items-center gap-10">
        <PieChart widthAndHeight={225} series={chartInfo} cover={0.65} />
        <View>
          {chartLabelData.map((item, key) => (
            <View className="flex flex-row items-center gap-2" key={key}>
              <View style={{backgroundColor: item.colour}} className="h-3 w-3 rounded-full"></View>
              <Text className="text-normal font-regular-poppins">{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

    </View>
  )
}