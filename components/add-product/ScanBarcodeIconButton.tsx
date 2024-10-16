import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  onPress: () => void;
  color: string;
  label?: string;
};

export default function ScanBarcodeIconButton(props: Props) {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
      }}
      onPress={props.onPress}
    >
      <MaterialCommunityIcons
        name="barcode-scan"
        size={34}
        color={props.color}
      />
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
