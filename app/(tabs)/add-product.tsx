import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

import PrimaryButton from "@/components/PrimaryButton";
import TextField from "@/components/add-product/TextField";
import SelectField from "@/components/add-product/SelectField";
import UploadImage from "@/components/add-product/UploadImage";
import ScanBarcodeIconButton from "@/components/add-product/ScanBarcodeIconButton";
import DatePicker from "@/components/add-product/DatePicker";
import BarcodeScanner from "@/components/add-product/BarcodeScanner";
import { supabase } from "@/utils/supabase";
import { ImagePickerAsset } from "expo-image-picker";
import { validateProductData } from "@/utils/productDataValidation";

type ProductTypes = {
  name: string;
  barcode: string;
  category: string;
  expiration_date: Date;
  quantity: string;
  image_url: string;
  notes: string;
};

export default function AddProduct() {
  const [permission, requestPermission] = useCameraPermissions();

  const [productData, setProductData] = useState<ProductTypes>();

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [barcode, setBarcode] = useState<string | undefined>();
  const [productName, setProductName] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<string | undefined>("1");
  const [note, setNote] = useState<string | undefined>();
  const [selectedValue, setSelectedValue] = useState<string | undefined>("canned");
  const [expirationDate, setExpirationDate] = useState<Date | undefined>();
  const [imageUri, setImageUri] = useState<ImagePickerAsset | undefined>();

  function launchBarcodeScanner() {
    requestPermission();
    setIsCameraVisible(true);
  }

  async function onCreateHanlder() {
    const productData = {
      name: productName,
      barcode: barcode,
      category: selectedValue,
      expiration_date: expirationDate,
      quantity: quantity,
      image_url: "",
      notes: note,
    };

    const errors = validateProductData(productData);

    if (!errors.length) return Alert.alert("Invalid data", "Please put valid data");

    if (imageUri?.base64) {
      try {
        const base64 = imageUri.base64;
        const filename = `public/${imageUri.fileName}`;

        const { data, error } = await supabase.storage
          .from("product_images")
          .upload(filename, decode(base64), { contentType: imageUri.mimeType });

        if (error) throw new Error(error.message);

        const { data: imageData } = supabase.storage.from("product_images").getPublicUrl(data.path);

        productData.image_url = imageData.publicUrl;
        alert("saved");
      } catch (error) {
        console.log("error:", error);
      }
    }

    const { data, error } = await supabase.from("products").insert([productData]).select();

    if (error) return Alert.alert("Something went wrong", error.message);

    console.log(data);
  }

  useEffect(() => {
    console.log(productData);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {!isCameraVisible && (
        <ScanBarcodeIconButton color="black" label="Scan" onPress={launchBarcodeScanner} />
      )}
      {permission && isCameraVisible && (
        <BarcodeScanner setBarcode={setBarcode} setIsCameraVisible={setIsCameraVisible} />
      )}
      <UploadImage setImageUri={setImageUri} />

      <View style={{ gap: 20, marginBottom: 40 }}>
        <TextField
          value={barcode}
          label="Product Barcode"
          onChangeText={setBarcode}
          placeholder="Barcode Number"
          type="number-pad"
        />
        <TextField
          value={productName}
          label="Product Name"
          onChangeText={setProductName}
          placeholder="Enter product name"
        />
        <SelectField
          label="Categories"
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
        />
        <DatePicker setExpirationDate={setExpirationDate} label="Expiration Date:" />
        <TextField
          value={quantity}
          label="Quanity"
          onChangeText={setQuantity}
          placeholder="Input number of items"
          type="number-pad"
        />
        <TextField value={note} label="Note" onChangeText={setNote} placeholder="Add description" />
      </View>

      <PrimaryButton title="Create" variant="solid" onPress={onCreateHanlder} />

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
    fontFamily: "Poppins-SemiBold",
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
