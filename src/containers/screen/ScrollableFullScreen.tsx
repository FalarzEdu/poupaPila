import {ScrollView} from "react-native";
import {ReactNode} from "react";
import changeThemeStore from "@states/ColourTheme";

interface ScrollableFullScreenProps {
  children: ReactNode;
}

export default function ScrollableFullScreen({ children }: ScrollableFullScreenProps) {

  const { theme } = changeThemeStore();

  return (
    <ScrollView
      style={{
        backgroundColor: theme.background.primary,
        height: 'auto',
        width: '100%',
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 16
      }}
    >
      {children}
    </ScrollView>
  )
}