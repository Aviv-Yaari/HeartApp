import React from "react";
import { StyleSheet, TextInput } from "react-native";

export function AppInput(props) {
  return <TextInput {...props} style={{ ...style.input, ...props.style }} />;
}

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    marginBottom: 10,
    borderRadius: 4,
    padding: 10,
  },
});
