import { StyleSheet, TextInput, View } from "react-native";
import ScanBarcodeIconButton from "../add-product/ScanBarcodeIconButton";
import PrimaryButton from "../PrimaryButton";
import { Colors } from "@/constants/Colors";

type Props = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  onPress: () => void;
  onScan: () => void;
};

export default function FoodSearchBar(props: Props) {
  return (
    <View style={styles.outerSearchBarWrapper}>
      <View style={styles.innerSearchBarWrapper}>
        <TextInput
          value={props.searchValue}
          style={{ flex: 1 }}
          placeholder="Search"
          onChangeText={props.setSearchText}
        />
        <ScanBarcodeIconButton color={Colors.mediumGray} onPress={props.onScan} />
      </View>
      <PrimaryButton title="Search" variant="solid" onPress={props.onPress} />
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
