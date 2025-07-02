import {Text, View} from "react-native";
import PieChart from "react-native-pie-chart";

export type DoughnutSeries = {
  value: number;
  color: string;
  label?: { text: string, fontWeight?: 'normal' | 'bold' | 'bolder', fill?: string, fontSize?: number };
}

export type DoughnutLabelData = {
  description: string;
  colour: string;
}

interface DoughnutChartProps {
  title: string;
  labelData: Array<DoughnutLabelData>
  data: Array<DoughnutSeries>
}

export default function CustomDoughnutChart( { data, title, labelData }: DoughnutChartProps ) {

  if (data.length === 0) {
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

      <Text className="mb-6 text-lg text-alternative font-regular-poppins" >{title}</Text>

      <View className="flex flex-row items-center gap-10">
        <PieChart widthAndHeight={225} series={data} cover={0.65} />
        <View>
          {labelData.map((item, key) => (
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