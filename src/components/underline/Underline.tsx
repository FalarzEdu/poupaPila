import { StyleSheet, View } from "react-native";
import React from "react";

interface UnderlineProps {
  smaller?: boolean;
}

export default function Underline({ smaller = false }: UnderlineProps) {
  if (smaller) {
    return (
      <View style={styles.container} className="h-[5px] bg-primary-fade"></View>
    );
  }
  return (
    <View style={styles.container} className="h-2 bg-primary-medium"></View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 100,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 16,
  },
});
