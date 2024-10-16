import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

type TextFieldProps = {
  label: string;
  placeholder: string;
  onChangeText?: (text: string) => void | undefined;
  value: string | undefined;
  type?: TextInputProps["keyboardType"] | undefined;
};

export default function TextField(props: TextFieldProps) {
  return (
    <View>
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: Fonts.labelSize }}>
        {props.label}:
      </Text>
      <TextInput
        keyboardType={props.type}
        style={styles.container}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.mutedGray,
    height: 40,
    minWidth: 200,
  },
});
