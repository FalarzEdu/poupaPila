import {Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {convert} from "@helpers/CurrencyConversion";
import GoalsRepository, {Goal} from "@database/repository/GoalsRepository";
import GoalRow from "@components/goals/GoalRow";

interface GoalSectionProps {
  refreshKey: number
}

export default function GoalSection({ refreshKey }: GoalSectionProps) {

  const [goals, setGoals] = useState<Array<Goal>>([]);

  const getAllGoals = async () => {
    const result = await GoalsRepository.getAll();
    setGoals(result.data)
  }

  useEffect(() => {
    getAllGoals();
  }, [refreshKey]);

  if (goals.length === 0) {
    return(
      <View className="w-full">
        <Text className="font-regular-poppins text-alternative w-full text-center uppercase">Objetivos</Text>
        <Text className="font-regular-poppins text-muted h-full text-center mt-2">Nada a mostrar.</Text>
      </View>
    )
  }

  return (
    <View className="w-full text-center text-alternative text-lg gap-4">
      <Text className="font-regular-poppins text-alternative w-full text-center uppercase">Objetivos</Text>
      <View className="gap-8">
        {
          goals.map((goal, key) => (
            <GoalRow
              key={key}
              name={goal.name}
              deadline={goal.deadline}
              currentValue={goal.currentValue}
              goalValue={goal.goalValue}
            />
          ))
        }
      </View>
    </View>
  )
}