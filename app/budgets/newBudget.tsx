import {Alert, Text, View} from "react-native";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import CustomInput from "@components/inputs/CustomInput";
import React, {Suspense, useEffect, useState} from "react";
import CategoryRepository, {Category} from "@database/repository/CategoryRepository";
import BottomButton from "@components/BottomButton";
import BudgetsRepository from "@database/repository/BudgetsRepository";
import {Router} from "expo-router/build/rsc/router/client";
import {ExpoRouter, router} from "expo-router";

export default function newBudget() {

  const [value, setValue] = useState<string>();
  const [category, setCategory] = useState<number>();
  const [allCategories, setAllCategories] = useState<Array<Category>>([]);

  const getAllCategories = async () => {
    setAllCategories(await CategoryRepository.getAll());
  }

  const handleCreation = () => {
    const formattedPrice
      = Number(value!.replace("R$ ", "").replace(",", "."));

   try
   {
     BudgetsRepository.insert({ value: formattedPrice, categoryId: category! })
   }
   catch(error)
   {
     Alert.alert("Erro ao criar orçamento! Tente novamente.")
     console.error(error);
   }
   finally
   {
     router.back();
   }
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  if (!allCategories) {
    return (
      <Text>Loading...</Text>
    )
  }

  return (
    <Suspense >
      <FixedFullScreen>
        <View>
          <CustomInput.Currency placeholder="Limite" icon="chevron-collapse-outline" onChange={setValue} />
          <CustomInput.Select placeholder="Categoria" icon="extension-puzzle-outline" onChange={setCategory} options={allCategories} />
        </View>
        <BottomButton onPress={handleCreation} borderColour="border-states-warning" textColor="text-states-warning" title="Salvar" />
      </FixedFullScreen>
    </Suspense>
  )
}