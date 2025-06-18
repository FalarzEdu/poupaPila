import {Pressable, Text} from "react-native";

interface BottomButtonProps {
  onPress: () => void;
  borderColour: string;
  title: string
  textColor: string | 'white';
}

export default function BottomButton({ ...props }: BottomButtonProps ) {
  return (
    <Pressable
      onPress={props.onPress}
      className={`px-4 py-2 rounded border-2 text-center w-full absolute bottom-0 
      h-16 flex justify-center items-center ${props.borderColour}`}
    >
      <Text className={`${props.textColor} text-xl`}>{ props.title }</Text>
    </Pressable>
  )
}