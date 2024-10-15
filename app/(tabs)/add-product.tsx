import { useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";

import { Colors } from "@/constants/Colors";
import PrimaryButton from "@/components/PrimaryButton";
import TextField from "@/components/add-product/TextField";
import SelectField from "@/components/add-product/SelectField";
import UploadImage from "@/components/add-product/UploadImage";
import ScanBarcodeIconButton from "@/components/add-product/ScanBarcodeIconButton";
import DatePicker from "@/components/add-product/DatePicker";

export default function AddProduct() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [barcode, setBarcode] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<string | undefined>();
  const [note, setNote] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function onBarcodeScannedHandler(result: BarcodeScanningResult) {
    setBarcode(result.raw);
    setIsCameraVisible(false);
    Alert.alert("Success", "You have successfull scanned the product");
  }

  return (
    <ScrollView style={styles.container}>
      {!isCameraVisible && (
        <ScanBarcodeIconButton onPress={() => setIsCameraVisible(true)} />
      )}
      <View
        style={{
          overflow: "hidden",
          borderRadius: 20,
          marginBottom: 20,
        }}
      >
        {isCameraVisible && (
          <CameraView
            style={styles.camera}
            facing={facing}
            onBarcodeScanned={onBarcodeScannedHandler}
            mirror
          >
            <View style={styles.buttonContainer}></View>
          </CameraView>
        )}
      </View>
      <UploadImage />

      <View style={{ gap: 20, marginBottom: 40 }}>
        <TextField
          value={barcode}
          label="Product Barcode"
          onChangeText={setBarcode}
          placeholder="Barcode Number"
        />
        <SelectField
          label="Categories"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <DatePicker label="Expiration Date:" />
        <TextField
          value={quantity}
          label="Quanity"
          onChangeText={setQuantity}
          placeholder="Input number of items"
        />
        <TextField
          value={note}
          label="Note"
          onChangeText={setNote}
          placeholder="Add description"
        />
      </View>

      <PrimaryButton title="Create" variant="solid" onPress={() => {}} />

      <View style={{ paddingBottom: 20 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    flex: 1,
    backgroundColor: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
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
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
