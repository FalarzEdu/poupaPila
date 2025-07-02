import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import changeThemeStore from "@states/ColourTheme";
import {Ionicons} from "@expo/vector-icons";
import {NewTransactionRowProps} from "@components/inputs/CustomInput";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface DateTransactionRowProps extends NewTransactionRowProps {
  onChange: (date: Date) => void
}

export default function DateInput({ ...props }: DateTransactionRowProps) {
  const { theme } = changeThemeStore();

  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const changeDate = (_event: any, selectedDate?: Date) => {
    //setShowPicker(Platform.OS === 'ios'); // iOS keeps picker open
    if (selectedDate) {
      setDate(selectedDate);
      props.onChange(selectedDate)
    }
  };

  return (
    <View className="flex flex-column gap-6 mb-2">
      <Pressable
        onPress={() => setShowPicker(true)}
        className="flex flex-row items-center gap-4 mt-7 mb-3  px-8"
      >
        <View>
          <Ionicons name={props.icon} size={26} color={theme.text.colours.alternative} />
        </View>
        <View>
          <Text className="text-alternative text-lg">
            {date.toLocaleDateString('pt-BR')}
          </Text>
          {showPicker && (
            <RNDateTimePicker
              mode="date"
              display="default"
              value={new Date()}
              onChange={changeDate}
            />
          )}
        </View>
      </Pressable>

      <View className="h-[1px] w-full bg-neutral-one"></View>

    </View>
  );
}

const styles = StyleSheet.create({});
