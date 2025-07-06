import CustomInput from "@components/inputs/CustomInput";
import React, {useState} from "react";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import BottomButton from "@components/BottomButton";
import CategoryRepository from "@database/repository/CategoryRepository";
import {Alert} from "react-native";
import {router} from "expo-router";

export default function newCategory() {

  const [title, setTitle] = useState<string>("");
  const [colourPicked, setColourPicked] = useState<string>();

  const handleCategoryInsert = async () => {
    if (!title || !colourPicked) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    await CategoryRepository.insert({description: title, colour: colourPicked})
    router.back();
  }

  return (
    <FixedFullScreen>
      <CustomInput.Text onChange={setTitle} placeholder={"Nome"} icon={"document-text-outline"} />
      <CustomInput.Colour placeholder="Cor" icon={"color-palette-outline"} pickColour={setColourPicked} />

      <BottomButton onPress={handleCategoryInsert} borderColour="border-states-success" textColor="text-states-success" title="Salvar" />

    </FixedFullScreen>
  )
}