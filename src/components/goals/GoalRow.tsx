import {Text, View} from "react-native";
import {convert} from "@helpers/CurrencyConversion";
import React, {useEffect} from "react";

interface GoalRowProps {
  goalValue: number;
  currentValue: number;
  key: number;
  deadline: string;
  name: string;
}

export default function GoalRow({ ...props }: GoalRowProps) {

  const [goalPercentage, setGoalPercentage] = React.useState(0);

  const convertToPercentage = (num1: number, num2: number) => {
    if (1 > num1 || 1 > num2) { return 0 }
    return Math.trunc((num2 / num1) * 100);
  }

  useEffect(() => {
    setGoalPercentage(
      convertToPercentage(props.goalValue, props.currentValue)
    );
  }, []);

  if (goalPercentage < 0) {
    return (
      <Text>Calculando...</Text>
    )
  }

  return (
    <View key={props.key}>
      <View className="flex flex-row justify-between">
        <Text className="mb-2 font-regular-poppins text-normal" >{props.name}</Text>
        <Text className="font-regular-poppins text-normal" >{goalPercentage}%</Text>
      </View>
      <View className="bg-tertiary w-full h-2 relative rounded-lg">
        <View
          className="h-2 fixed rounded-lg"
          style={{
            width: `${goalPercentage <= 100 ? goalPercentage : 100 }%`,
            backgroundColor: `${goalPercentage <= 100 ? '#60a5fa' : '#3fa72c'}`
          }}>
        </View>
      </View>
      <View className="flex flex-row justify-between mt-2">
        <Text className="font-regular-poppins text-muted" >R$ 0,00</Text>
        <Text className="font-regular-poppins text-normal text-lg" >R$ {convert(props.currentValue)}</Text>
        <Text className="font-regular-poppins text-muted" >R$ {convert(props.goalValue)}</Text>
      </View>
    </View>
  )
}