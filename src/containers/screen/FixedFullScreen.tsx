import { View } from "react-native";
import React, { ReactNode } from "react";
import changeThemeStore from "../../states/ColourTheme";
interface FixedScreenProps {
  children: ReactNode;
}

export default function FixedFullScreen({ children }: FixedScreenProps) {
  const { theme } = changeThemeStore();

  return (
    <View
      style={{
        backgroundColor: theme.background.primary,
      }}
      className="w-4/5 h-full"
    >
      {children}
    </View>
  );
}
