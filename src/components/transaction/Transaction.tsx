import {Alert, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import changeThemeStore from "@states/ColourTheme";
import { convert } from "@helpers/CurrencyConversion";
import Label from "@components/label/Label";
import {formatTimestampDate} from "@helpers/DateHelper";
import TransactionRepository from "@database/repository/TransactionRepository";

interface TransactionProps {
  paid: boolean;
  value: number;
  expenseName: string;
  transactionId: number;
  date: string;
}

export default function Transaction({ ...props }: TransactionProps) {
  const { theme } = changeThemeStore();

  const [paid, setPaid] = useState(props.paid);
  const [requestSent, setRequestSent] = useState(false);

  const changePaidState = async () => {
    try
    {
      if (!requestSent) {
        setRequestSent(true);
        const result = await TransactionRepository.changePaidState(props.transactionId, !paid);
        if (result.success) {
          setPaid(!paid);
        }
      }
    }
    catch (error)
    {
      console.log(error);
      Alert.alert("Não foi possível atualizar esta transação!")
      return
    }
    finally
    {
      setRequestSent(false);
    }
  }

  return (
    <View className="flex flex-row items-center gap-6">
      <Pressable onPress={changePaidState}>
        {paid ? (
          <Ionicons
            name="checkmark-done-outline"
            color={theme.colours.states.success}
            size={28}
          />
        ) : (
          <Ionicons
            name="hourglass-outline"
            color={theme.text.colours.muted}
            size={28}
          />
        )}
      </Pressable>

      <View className="flex flex-1 flex-row gap-1 flex-wrap">
        <Text className="h4 text-normal w-full">{props.expenseName} </Text>
        <View className="">
          <Label transactionId={props.transactionId} />
        </View>
      </View>

      <View>
        <Text className="small text-alternative">
          {formatTimestampDate(props.date)}
        </Text>
        <View className="flex flex-row items-end">
          <Text className="small text-alternative">R$ </Text>
          <Text className="paragraph text-normal">{convert(props.value)} </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
