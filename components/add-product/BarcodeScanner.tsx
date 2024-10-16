import { Alert, StyleSheet, View } from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";

type Props = {
  setBarcode: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsCameraVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function BarcodeScanner(props: Props) {
  function onBarcodeScannedHandler(result: BarcodeScanningResult) {
    props.setBarcode(result.raw);
    props.setIsCameraVisible(false);

    Alert.alert("Success", "You have successfull scanned the product");
  }

  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: 20,
        marginBottom: 20,
      }}
    >
      <CameraView
        style={styles.camera}
        facing={"back"}
        onBarcodeScanned={onBarcodeScannedHandler}
        mirror
      >
        <View style={styles.buttonContainer}></View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
});
