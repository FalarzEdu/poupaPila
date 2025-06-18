import {Pressable, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import NewTransactionRow from "@components/transaction/NewTransactionRow/NewTransactionRow";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import BottomButton from "@components/BottomButton";

export default function newExpense() {

  const { theme } = changeThemeStore();

  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [installments, setInstallments] = useState<string>("1")
  const [category, setCategory] = useState<number>(0)
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [paid, setPaid] = useState<boolean>(false)

  const log = () => {
    console.log(description)
    console.log(price)
    console.log(installments)
    console.log(dueDate)
    console.log(paid)
  }

  return (
    <FixedFullScreen>
      <View>

        <NewTransactionRow.Text icon={"document-text-outline"} placeholder={"Descrição"} onChange={setDescription} />

        <NewTransactionRow.Text icon={"pricetag-outline"} placeholder={"R$ 0,00"} onChange={setPrice} />

        <NewTransactionRow.Text icon={"reload"} placeholder={"Parcelas"} onChange={setInstallments} />

        <NewTransactionRow.Select icon={"extension-puzzle-outline"} placeholder={"Categoria"} />

        <NewTransactionRow.Date icon={"calendar-outline"} placeholder={"Data de Vencimento"} onChange={setDueDate} />

        <NewTransactionRow.Slider icon={"checkmark-circle"} placeholder={"Efetivada"} onChange={setPaid} sliderColour={"red"} />

      </View>

      <BottomButton onPress={log} borderColour="border-states-danger" textColor="text-states-danger" title="Salvar" />

    </FixedFullScreen>
  );
}
