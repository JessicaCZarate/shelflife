import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

type SelectFieldProps = {
  label: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedValue: string | undefined;
};

type PickerItem = {
  label: string;
  value: string;
};

const foodCategories: PickerItem[] = [
  { label: "Canned", value: "canned" },
  { label: "Meat", value: "meat" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Fruits", value: "fruits" },
  { label: "Grains", value: "grains" },
  { label: "Oils", value: "oils" },
  { label: "Condiments", value: "condiments" },
  { label: "Beverage", value: "beverage" },
  { label: "Dessert", value: "dessert" },
  { label: "Poultry", value: "poultry" },
  { label: "Fish", value: "fish" },
  { label: "Snack", value: "snack" },
];

export default function SelectField(props: SelectFieldProps) {
  return (
    <View>
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: Fonts.labelSize }}>
        {props.label}:
      </Text>
      <View
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: 6,
          marginTop: 12,
        }}
      >
        <Picker
          selectedValue={props.selectedValue}
          mode="dialog"
          onValueChange={(itemValue, itemIndex) => props.setSelectedValue(itemValue)}
        >
          {foodCategories.map(({ label, value }, index) => (
            <Picker.Item key={label + index} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
