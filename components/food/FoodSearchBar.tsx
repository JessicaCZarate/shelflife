import { StyleSheet, TextInput, View } from "react-native";
import ScanBarcodeIconButton from "../add-product/ScanBarcodeIconButton";
import PrimaryButton from "../PrimaryButton";
import { Colors } from "@/constants/Colors";

export default function FoodSearchBar() {
  return (
    <View style={styles.outerSearchBarWrapper}>
      <View style={styles.innerSearchBarWrapper}>
        <TextInput style={{ flex: 1 }} placeholder="Search" />
        <ScanBarcodeIconButton color={Colors.mediumGray} onPress={() => {}} />
      </View>
      <PrimaryButton title="Search" variant="solid" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerSearchBarWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  innerSearchBarWrapper: {
    backgroundColor: Colors.lightSilver,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
});
