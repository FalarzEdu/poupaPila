import React, { useState } from 'react';
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import {Ionicons} from "@expo/vector-icons";
import changeThemeStore from "@states/ColourTheme";
import {NewTransactionRowProps} from "@components/inputs/CustomInput";

interface ColourSelectRowProps extends NewTransactionRowProps {
  pickColour: (colour: string) => void
}

export default function ColourInput({...props}: ColourSelectRowProps) {

  const { theme } = changeThemeStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [colourPicked, setColourPicked] = useState<string>();

  const onSelectColor = (colourObject: any) => {
    setColourPicked(colourObject.hex)
    props.pickColour(colourObject.hex)
  };

  return (
    <View>
      <TouchableOpacity className="p-0" onPress={() => setModalVisible(true)}>
        <View className="flex flex-row gap-4 mt-7 mb-7 items-center justify-between px-8">
          <View className="flex flex-row gap-4">
            <View>
              <Ionicons
                name={props.icon}
                size={26}
                color={colourPicked ?? theme.text.colours.alternative}
              />
            </View>
            <View>
              <Text className="text-alternative text-lg">
                {colourPicked || props.placeholder}
              </Text>
            </View>
          </View>
        </View>
        <View className="h-[1px] w-full bg-neutral-one"></View>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType='slide'>
        <ColorPicker style={{ width: '70%' }} value='red' onComplete={onSelectColor}>
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title='Ok' onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}