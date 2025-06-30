import {Alert, View} from "react-native";
import React, {useEffect, useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import NewTransactionRow from "@components/transaction/NewTransactionRow/NewTransactionRow";
import FixedFullScreen from "@containers/screen/FixedFullScreen";
import BottomButton from "@components/BottomButton";
import TransactionRepository from "@database/repository/TransactionRepository";
import CategoryRepository, {Category} from "@database/repository/CategoryRepository";
import {router} from "expo-router";

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
      const formattedPrice
            = Number(price.replace("R$ ", "").replace(",", "."));
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
      router.replace("/transactions/expenses");
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <FixedFullScreen>
      <View>

        <NewTransactionRow.Text icon={"document-text-outline"} placeholder={"Descrição"} onChange={setDescription} />

        <NewTransactionRow.Currency icon={"pricetag-outline"} placeholder={"0"} onChange={setPrice} />

        <NewTransactionRow.Text icon={"reload"} placeholder={"Parcelas"} onChange={setInstallments} />

        <NewTransactionRow.Select icon={"extension-puzzle-outline"} placeholder={"Categoria"} options={allCategories} onChange={setCategory} />

        <NewTransactionRow.Date icon={"calendar-outline"} placeholder={"Data de Vencimento"} onChange={setDueDate} />

        <NewTransactionRow.Slider icon={"checkmark-circle"} placeholder={"Efetivada"} onChange={setPaid} sliderColour={"red"} />

      </View>

      <BottomButton onPress={handleTransactionInsert} borderColour="border-states-danger" textColor="text-states-danger" title="Salvar" />

    </FixedFullScreen>
  );
}
