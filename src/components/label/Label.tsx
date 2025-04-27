import { Text, View } from "react-native";
import React from "react";
import transaction_categories from "../../mocks/transactions_categories";
import categories from "../../mocks/categories";

interface LabelProps {
  transactionId: number;
}

export default function Label({ transactionId }: LabelProps) {
  const pivot_table = transaction_categories.find(
    (transaction_categories) =>
      transactionId === transaction_categories.transaction_id
  );
  const category = categories.find(
    (categories) => categories.id === pivot_table?.category_id
  );

  return (
    <View
      className="rounded-xl px-2 m-0 py-[2px]"
      style={{ backgroundColor: category?.colour }}
    >
      <Text className="w-fit small text-center">{category?.description} </Text>
    </View>
  );
}
