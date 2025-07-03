import {Text, View} from "react-native";
import {Link} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import {convert} from "@helpers/CurrencyConversion";
import ScrollableFullScreen from "@containers/screen/ScrollableFullScreen";
import GoalsRepository, { Goal } from "@database/repository/GoalsRepository";
import {formatTimestampDate} from "@helpers/DateHelper";

export default function goals() {

  const { theme } = changeThemeStore();

  const [allGoals, setAllGoals] = useState<Array<Goal>>([]);

  const getAllGoals = async () => {
    const result = await GoalsRepository.getAll();
    setAllGoals(result.data);
  }

  useEffect(() => {
    getAllGoals();
  }, []);

  if (!allGoals) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <ScrollableFullScreen>
      <View className="h-full flex flex-1 bg-primary px-6">

        <View className="mt-4 gap-4">
          {
            allGoals.map((goal, key) => (
              <Link href={{ pathname: "goals/addGoalValue", params: {id: goal.id} }} key={key} >
                <View className="flex flex-col gap-2 justify-between bg-secondary px-4 py-4 rounded-lg items-center">
                  <View className="flex flex-row justify-between w-full">
                    <Text className="text-alternative" >{goal.name}</Text>
                    <Text className="text-normal">{formatTimestampDate(goal.deadline)}</Text>
                  </View>
                  <View className="h-[1px] w-full bg-neutral-two" />
                  <View className="flex flex-row gap-2 items-center justify-between w-full">
                    <Text className="text-lg text-normal" >R$ {convert(goal.currentValue)}</Text>
                    <Text className="text-lg text-muted">R$ {convert(goal.goalValue)}</Text>
                  </View>
                </View>
              </Link>
            ))
          }
        </View>

        <Link className="fixed top-0 w-[64px]" href={"/goals/newGoal"}>
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