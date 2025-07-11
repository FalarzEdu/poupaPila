import {Alert, View} from "react-native";
import React, {useEffect, useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import CustomInput from "@components/inputs/CustomInput";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import BottomButton from "@components/BottomButton";
import TransactionRepository from "@database/repository/TransactionRepository";
import CategoryRepository, {Category} from "@database/repository/CategoryRepository";
import {router} from "expo-router";
import {toDecimal} from "@helpers/CurrencyConversion";

export default function newExpense() {

  const { theme } = changeThemeStore();

  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [installments, setInstallments] = useState<string>("1")
  const [allCategories, setAllCategories] = useState<Array<Category>>([]);
  const [category, setCategory] = useState<number>(0)
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [paid, setPaid] = useState<boolean>(false)

  const getAllCategories = async (): Promise<void> => {
    setAllCategories(await CategoryRepository.getAll());
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleTransactionInsert = async () => {
    try {
      const formattedPrice = toDecimal(price)
      const result = await TransactionRepository.insert({
        description: description,
        type: 'expense',
        price: formattedPrice,
        installments: Number(installments),
        paid: paid,
        date: dueDate.toISOString(),
        categoryId: category,
      })

      if (!result.success) {
        Alert.alert("Houve um erro ao adicionar esta despesa. Tente novamente.")
        return;
      }
      router.back();
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <FixedFullScreen>
      <View>

        <CustomInput.Text icon={"document-text-outline"} placeholder={"Descrição"} onChange={setDescription} />

        <CustomInput.Currency icon={"pricetag-outline"} placeholder={"0"} onChange={setPrice} />

        <CustomInput.Text icon={"reload"} placeholder={"Parcelas"} onChange={setInstallments} />

        <CustomInput.Select
          icon={"extension-puzzle-outline"}
          placeholder={"Categoria"}
          options={allCategories}
          onChange={setCategory}
          customButtons={[
            {title: "Criar", action: () => {router.push({pathname: "/categories/newCategory"})}},
          ]}
        />

        <CustomInput.Date icon={"calendar-outline"} placeholder={"Data de Vencimento"} onChange={setDueDate} />

        <CustomInput.Slider icon={"checkmark-circle"} placeholder={"Efetivada"} onChange={setPaid} sliderColour={"red"} />

      </View>

      <BottomButton onPress={handleTransactionInsert} borderColour="border-states-danger" textColor="text-states-danger" title="Salvar" />

    </FixedFullScreen>
  );
}
