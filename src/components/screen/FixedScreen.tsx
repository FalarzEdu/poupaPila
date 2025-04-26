import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Theme } from "../../../public/themes/theme";
import changeThemeStore from "../../states/ColourTheme";

interface FixedScreenProps {
  children: ReactNode;
}

export default function FixedScreen({ children }: FixedScreenProps) {
  return <View className="bg-primary w-full h-full px-8 pt-4">{children}</View>;
}
