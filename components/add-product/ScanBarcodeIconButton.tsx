import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  onPress: () => void;
};

export default function ScanBarcodeIconButton({ onPress }: Props) {
  return (
    <TouchableOpacity
      style={{
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 8,
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="barcode-scan" size={34} color="black" />
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>Scan</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
