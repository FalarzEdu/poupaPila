import {Alert, Text, View} from "react-native";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import CustomInput from "@components/inputs/CustomInput";
import React, {Suspense, useEffect, useState} from "react";
import BottomButton from "@components/BottomButton";
import { router } from "expo-router";
import GoalsRepository from "@database/repository/GoalsRepository";
import {toDecimal} from "@helpers/CurrencyConversion";

export default function newGoal() {

  const [value, setValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [deadLine, setDeadLine] = useState<string>("");

  const handleCreation = async () => {
    const formattedPrice = toDecimal(value)

    try
    {
      const result = await GoalsRepository.insert({ goalValue: formattedPrice, name: name, deadline: deadLine })
      console.log(result);
    }
    catch(error)
    {
      Alert.alert("Erro ao criar objetivo! Tente novamente.")
      console.error(error);
    }
    finally
    {
      router.back();
    }
  }

  return (
    <Suspense >
      <FixedFullScreen>
        <View>
          <CustomInput.Text onChange={setName} placeholder={"Viagem, Carro Novo..."} icon={"create-outline"} />
          <CustomInput.Currency placeholder="Limite" icon="chevron-collapse-outline" onChange={setValue} />
          <CustomInput.Date
            onChange={(date: Date) => setDeadLine(date.toString())}
            placeholder={"Data Limite"}
            icon={"calendar-clear-outline"}
          />
        </View>
        <BottomButton
          onPress={handleCreation}
          borderColour="border-states-warning"
          textColor="text-states-warning"
          title="Salvar"
        />
      </FixedFullScreen>
    </Suspense>
  )
}