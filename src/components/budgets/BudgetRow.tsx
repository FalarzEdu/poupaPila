import {Text, View} from "react-native";
import {convert} from "@helpers/CurrencyConversion";
import React, {useEffect} from "react";

interface BudgetRowProps {
  budgetValue: number;
  categoryExpense: number;
  categoryName: string;
  key: number;
}

export default function BudgetRow({ ...props }: BudgetRowProps) {

  const [budgetSpentPercentage, setBudgetSpentPercentage] = React.useState(0);

  const convertToPercentage = (num1: number, num2: number) => {
    if (1 > num1 || 1 > num2) { return 0 }
    return Math.trunc((num2 / num1) * 100);
  }

  useEffect(() => {
    setBudgetSpentPercentage(
      convertToPercentage(props.budgetValue, props.categoryExpense)
    );
  }, []);

  if (budgetSpentPercentage < 0) {
    return (
      <Text>Calculando...</Text>
    )
  }

  return (
    <View key={props.key}>
      <View className="flex flex-row justify-between">
        <Text className="mb-2 font-regular-poppins text-normal" >{props.categoryName}</Text>
        <Text className="font-regular-poppins text-normal" >{convertToPercentage(props.budgetValue, props.categoryExpense)}%</Text>
      </View>
      <View className="bg-tertiary w-full h-2 relative rounded-lg">
        <View
          className="h-2 fixed rounded-lg"
          style={{
            width: `${budgetSpentPercentage <= 100 ? budgetSpentPercentage : 100 }%`,
            backgroundColor: `${budgetSpentPercentage <= 100 ? '#60a5fa' : '#ef4444'}`
          }}>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-2">
        <Text className="font-regular-poppins text-muted" >R$ 0,00</Text>
        <Text className="font-regular-poppins text-normal text-lg" >R$ {convert(props.categoryExpense)}</Text>
        <Text className="font-regular-poppins text-muted" >R$ {convert(props.budgetValue)}</Text>
      </View>
    </View>
  )
}