import { Text, View } from "react-native";
import {Link, router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import BudgetsRepository, {Budget} from "@database/repository/BudgetsRepository";
import {convert} from "@helpers/CurrencyConversion";
import ScrollableFullScreen from "@containers/screen/ScrollableFullScreen";
import BottomButton from "@components/BottomButton";

export default function budgets() {

  const { theme } = changeThemeStore();

  const [allBudgets, setAllBudgets] = useState<Array<Budget>>([]);

  const getAllBudgets = async () => {
    const result = await BudgetsRepository.getAll();
    setAllBudgets(result.data);
  }

  useEffect(() => {
    getAllBudgets();
  }, []);

  if (!allBudgets) {
    return (
      <Text>Loading...</Text>
    )
  }

  // @ts-ignore
  return (
    <View className="h-full w-full bg-primary pb-16">
      <ScrollableFullScreen>
        <View className="h-full flex flex-1 bg-primary px-6">

          <View className="mt-4 gap-4">
            {
              allBudgets.map((budget, key) => (
                <View key={key} className="flex flex-row justify-between bg-secondary px-4 py-4 rounded-lg items-center">
                  {/*@ts-ignore*/}
                  <Text className="text-alternative" >{budget.categoryName!}</Text>
                  <Text className="text-lg text-normal" >R$ {convert(budget.value)}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </ScrollableFullScreen>

      <BottomButton
        onPress={() => router.push({pathname: "/transactions/newRevenue"})}
        borderColour="border-states-success"
        textColor="text-states-success"
        title="Adicionar Receita"
      />
    </View>
  )
}