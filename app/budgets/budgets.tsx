import { Text, View } from "react-native";
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import BudgetsRepository, {Budget} from "@database/repository/BudgetsRepository";
import {convert} from "@helpers/CurrencyConversion";
import ScrollableFullScreen from "@containers/screen/ScrollableFullScreen";

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

        <Link className="fixed top-0 w-[64px]" href={"/budgets/newBudget"}>
          <Ionicons
            name="add-circle-outline"
            color={theme.colours.states.success}
            size={64}
            className="w-fit"
          />
        </Link>

      </View>
    </ScrollableFullScreen>
  )
}