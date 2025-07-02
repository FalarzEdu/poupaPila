import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import BudgetsRepository from "@database/repository/BudgetsRepository";
import {convert} from "@helpers/CurrencyConversion";
import BudgetRow from "@components/budgets/BudgetRow";

export default function BudgetSection(props: {}) {

  const [budgets, setBudgets] = useState<Array<{budgetValue: number, categoryExpense: number, categoryName: string}>>([]);
  const [budgetSpentPercentage, setBudgetSpentPercentage] = useState(0);

  const calcBudgets = async () => {
    const result = await BudgetsRepository.calcBudgets();
    setBudgets(result.data)
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
          <BudgetRow
            budgetValue={budget.budgetValue}
            categoryExpense={budget.categoryExpense}
            categoryName={budget.categoryName}
            key={key}
          />
        ))
      }
    </View>
  </View>
  )
}