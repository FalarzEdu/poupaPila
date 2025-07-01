import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import BudgetsRepository from "@database/repository/BudgetsRepository";
import {convert} from "@helpers/CurrencyConversion";

export default function BudgetSection(props: {}) {

  const [budgets, setBudgets] = useState<Array<{budgetValue: number, categoryExpense: number, categoryName: string}>>([]);

  const calcBudgets = async () => {
    const result = await BudgetsRepository.calcBudgets();
    setBudgets(result.data)
  }

  const convertToPercentage = (num1: number, num2: number) => {
    if (!num1 || !num2) { return 0 }
    console.log(Math.trunc((num2 / num1) * 100))
    return Math.trunc((num2 / num1) * 100);
  }

  useEffect(() => {
    calcBudgets();
  }, [])

  if (!budgets) {
    return(
      <Text>Nada a mostrar.</Text>
    )
  }

  return (
  <View className="w-full text-center text-alternative text-lg gap-4">
    <Text className="font-regular-poppins text-alternative w-full text-center uppercase">Orçamentos</Text>
    <View className="gap-8">
      {
        budgets.map((budget, key) => (
          <View key={key}>
            <View className="flex flex-row justify-between">
              <Text className="mb-2 font-regular-poppins text-normal" >{budget.categoryName}</Text>
              <Text className="font-regular-poppins text-normal" >{convertToPercentage(budget.budgetValue, budget.categoryExpense)}%</Text>
            </View>
            <View className="bg-tertiary w-full h-2 relative rounded-lg">
              <View
                className="bg-blue-400 h-2 fixed rounded-lg"
                style={{ width: `${convertToPercentage(budget.budgetValue, budget.categoryExpense)}%` }}>
              </View>
            </View>
            <View className="flex flex-row justify-between mt-2">
              <Text className="font-regular-poppins text-muted" >R$ 0,00</Text>
              <Text className="font-regular-poppins text-normal text-lg" >R$ {convert(budget.categoryExpense)}</Text>
              <Text className="font-regular-poppins text-muted" >R$ {convert(budget.budgetValue)}</Text>
            </View>

          </View>
        ))
      }
    </View>
  </View>
  )
}