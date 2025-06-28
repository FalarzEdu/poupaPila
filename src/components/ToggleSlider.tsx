import {Pressable, View} from "react-native";
import {useState} from "react";

interface ToggleSliderProps {
  onChange: (state: boolean) => void;
  ballColour: string;
  barColour: string;
}

export default function ToggleSlider({ ballColour, barColour, onChange }: ToggleSliderProps ) {

  const [state, setState] = useState<boolean>(false)

  const changeState = (state: boolean) => {
    setState(!state)
    onChange(!state)
  }

  if (!state) return (
    <Pressable onPress={() => changeState(state)}>
      <View className="h-5 w-16 bg-secondary rounded-full relative">
        <View className="h-8 w-8 bg-tertiary rounded-full fixed -top-safe-offset-1.5" />
      </View>
    </Pressable>
  )

  return (
    <Pressable onPress={() => changeState(state)}>
      <View className={`h-5 w-16 rounded-full relative ${barColour}`}>
        <View className={`h-8 w-8 rounded-full fixed -top-safe-offset-1.5 left-8 ${ballColour}`} />
      </View>
    </Pressable>
  )

}