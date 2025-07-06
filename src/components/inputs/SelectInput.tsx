import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import changeThemeStore from "@states/ColourTheme";
import { Ionicons } from "@expo/vector-icons";
import { NewTransactionRowProps } from "@components/inputs/CustomInput";
import {router} from "expo-router";
import * as path from "node:path";

interface SelectTransactionRowProps extends NewTransactionRowProps {
  options: Array<any>;
  onChange: (categoryId: number) => void;
  customButtons?: Array<{title: string, action: () => void}>
}

export default function SelectInput({ ...props }: SelectTransactionRowProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("");

  const { theme } = changeThemeStore();

  const CustomModal = () => (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-secondary w-3/4 p-4 rounded-lg">
          <FlatList
            data={props.options}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="py-5 border-b border-gray-300"
                onPress={() => {
                  props.onChange(item.id);
                  setSelected(item.description);
                  setModalVisible(false);
                }}
              >
                <Text className="text-base text-normal">{item.description}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Close Button */}
          <TouchableOpacity
            className="mt-4 py-3 bg-gray-200 rounded-md items-center"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-black text-base">Fechar</Text>
          </TouchableOpacity>
          {
            props.customButtons?.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="mt-4 py-3 bg-gray-200 rounded-md items-center"
                onPress={item.action}
              >
                <Text className="text-black text-base">{item.title}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>
    </Modal>
  );


  return (
    <>
      <TouchableOpacity className="p-0" onPress={() => setModalVisible(true)}>
        <View className="flex flex-row gap-4 mt-7 mb-7 items-center justify-between px-8">
          <View className="flex flex-row gap-4">
            <View>
              <Ionicons
                name={props.icon}
                size={26}
                color={theme.text.colours.alternative}
              />
            </View>
            <View>
              <Text className="text-alternative text-lg">
                {selected || props.placeholder}
              </Text>
            </View>
          </View>

          <View className="flex">
            <Ionicons
              name={"chevron-down-outline"}
              size={26}
              color={theme.text.colours.alternative}
            />
          </View>
        </View>
        <View className="h-[1px] w-full bg-neutral-one"></View>
      </TouchableOpacity>

      <CustomModal />
    </>
  );
}
