import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React from "react";
import changeThemeStore from "@states/ColourTheme";
import {Ionicons} from "@expo/vector-icons";
import {NewTransactionRowProps} from "@components/transaction/NewTransactionRow/NewTransactionRow";
import ToggleSlider from "@components/ToggleSlider";

interface SliderTransactionRowProps extends NewTransactionRowProps {
  onChange: (state: boolean) => void
  sliderColour: 'green' | 'red'
}

export default function SliderTransactionRow({ ...props }: SliderTransactionRowProps) {
  const { theme } = changeThemeStore();

  const [paid, setPaid] = React.useState<string>("Pendente");

  const changePaidState = (state: boolean) => {
    props.onChange(state);
    if (paid === "Pendente") {
      setPaid("Efetivada");
      return;
    }
    setPaid("Pendente");
  }

  return (
    <View className="flex flex-column gap-6 mb-2">
      <View className="flex flex-row items-center justify-between gap-4 mt-7 mb-3 px-8">
        <View className="flex flex-row items-center gap-4">
          <View>
            <Ionicons name={props.icon} size={26} color={theme.text.colours.alternative} />
          </View>
          <View>
            <Text className="text-alternative text-lg">{paid}</Text>
          </View>
        </View>

        {props.sliderColour === "red" && (
          <ToggleSlider ballColour="bg-states-danger" barColour="bg-states-dangerFade" onChange={changePaidState} />
        )}

        {props.sliderColour === "green" && (
          <ToggleSlider ballColour="bg-states-success" barColour="bg-states-successFade" onChange={changePaidState} />
        )}

      </View>

      <View className="h-[1px] w-full bg-neutral-one"></View>

    </View>
  );
}

const styles = StyleSheet.create({});
