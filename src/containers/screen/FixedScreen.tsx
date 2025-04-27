import { View } from "react-native";
import React, { ReactNode } from "react";
import changeThemeStore from "../../states/ColourTheme";
interface FixedScreenProps {
  children: ReactNode;
}

export default function FixedScreen({ children }: FixedScreenProps) {
  const { theme } = changeThemeStore();

  return (
    <View
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: theme.background.primary,
      }}
      className="w-4/5 h-full"
    >
      {children}
    </View>
  );
}
