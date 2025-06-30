import "../public/css/global.css";

import { View } from "react-native";
import React, {Suspense, useEffect, useState} from "react";

import changeThemeStore from "@states/ColourTheme";
import FixedScreen from "@containers/screen/FixedScreen";
import MainDisplay from "@components/balance/MainDisplay";
import { useFonts } from "expo-font";
import SecondaryDisplay from "@components/balance/SecondaryDisplay";
import CardDisplay from "@components/balance/CardDisplay/CardDisplay";
import TransactionRepository from "@database/repository/TransactionRepository";
import CustomDoughnutChart, {DoughnutLabelData, DoughnutSeries} from "@components/DoughnutChart";

export default function home() {
  const { theme } = changeThemeStore();

  // AUTO REDIRECT FOR TESTS
  // return <Redirect href="/transactions/newExpense" />;

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins Bold.ttf"),
    "Poppins-Semibold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  });

  const [chartInfo, setChartInfo] = useState<Array<DoughnutSeries> | null>(null)
  const [chartLabelData, setChartLabelData] = useState<Array<DoughnutLabelData>>([])

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
          fill: theme.background.primary
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

  const formatDecimalToPercentage = (value: number): string => {
    return Math.trunc(value * 100).toString();
  }

  useEffect(() => {
    loadChartInformation();
  }, []);

  if (!chartInfo || !chartLabelData) {
    return (
      <Suspense fallback={<div>Loading...</div>} />
    )
  }

  return (
    <FixedScreen>
      <View className="mt-8">
        <View className="flex flex-row justify-between content-end">
          <SecondaryDisplay
            text="Inicial"
            value={23.55}
            icon="enter-outline"
            iconSize={14}
            iconColour={theme.colours.primary.fade}
          />
          <MainDisplay
            text="Saldo"
            value={500.86}
            icon="wallet-outline"
            iconSize={18}
            iconColour={theme.colours.primary.fade}
          />
          <SecondaryDisplay
            text="Previsto"
            value={731.41}
            dynamicValueColour={true}
            icon="exit-outline"
            iconSize={14}
            iconColour={theme.colours.primary.fade}
          />
        </View>

        <View className="mt-8 flex flex-row gap-4">
          <View className="flex-1">
            <CardDisplay.WithLink
              text="Entrada"
              iconDirection="right"
              value={6700}
              icon={"arrow-up-circle"}
              iconColour={theme.colours.states.success}
              iconSize={30}
              href="transactions/revenues"
            />
          </View>
          <View className="flex-1">
            <CardDisplay.WithLink
              text="Saída"
              iconDirection="left"
              value={6442.14}
              icon={"arrow-down-circle"}
              iconColour={theme.colours.states.danger}
              iconSize={30}
              href="transactions/expenses"
            />
          </View>
        </View>

        {/* <View className="mt-6">
          <Text className="h4 text-alternative text-center">
            Despesas por categoria
          </Text>
        </View> */}
      </View>

      <View>
        <CustomDoughnutChart title="Despesas por Categoria" labelData={chartLabelData} data={chartInfo!} />
      </View>
    </FixedScreen>
  );
}
