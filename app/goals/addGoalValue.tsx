import {Alert, Text, View} from "react-native";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import CustomInput from "@components/inputs/CustomInput";
import React, {Suspense, useState} from "react";
import BottomButton from "@components/BottomButton";
import {router, useLocalSearchParams} from "expo-router";
import GoalsRepository from "@database/repository/GoalsRepository";

export default function addGoalValue() {

  const [value, setValue] = useState<string>("");
  const { id } = useLocalSearchParams()

  const handleCreation = async () => {
    const formattedPrice
      = Number(value!
      .replace("R$ ", "")
      .replace(".", "")
      .replace(",", "."));

    try
    {
      const result = await GoalsRepository.updateGoalValue(formattedPrice, id as string)
      console.log(result);
    }
    catch(error)
    {
      Alert.alert("Erro ao modificar objetivo! Tente novamente.")
      console.error(error);
    }
    finally
    {
      router.back();
    }
  }

  return (
    <View className="w-full h-full bg-primary">
      <View>
        <CustomInput.Currency placeholder="Limite" icon="chevron-collapse-outline" onChange={setValue} />
      </View>
      <BottomButton
        onPress={handleCreation}
        borderColour="border-states-warning"
        textColor="text-states-warning"
        title="Salvar"
      />
    </View>
  )
}