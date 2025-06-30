import { Text, View } from "react-native";
import React, {Suspense, useEffect} from "react";
import CategoryRepository, {Category} from "@database/repository/CategoryRepository";

interface LabelProps {
  transactionId: number;
}
// TODO FIX THIS AND MAKE IT WORK WITH THE DATABASE DATA

export default function Label({ transactionId }: LabelProps) {

  const [category, setCategory] = React.useState<Category>()

  const fetchCategory = async () => {
    const result = await CategoryRepository.findTransactionCategory(transactionId);
    setCategory(result.data)
  }

  useEffect(() => {
    fetchCategory();
  }, [])

  if (!category) {
    return (
      <Suspense/>
    );
  }

  return (
    <View
      className="rounded-xl px-2 m-0 py-[2px]"
      style={{ backgroundColor: category.colour }}
    >
      <Text className="w-fit small text-center">{category.description}</Text>
    </View>
  );
}
