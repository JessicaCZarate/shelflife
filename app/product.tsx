import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import TextField from "@/components/add-product/TextField";
import SelectField from "@/components/add-product/SelectField";
import DatePicker from "@/components/add-product/DatePicker";
import { supabase } from "@/utils/supabase";
import { Database } from "@/types/supabase";
import { validateProductData } from "@/utils/productDataValidation";

type ProductData = Database["public"]["Tables"]["products"]["Row"];

export default function Product() {
  const { productId } = useLocalSearchParams();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [barcode, setBarcode] = useState<string | undefined>();
  const [productName, setProductName] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<string | undefined>("1");
  const [note, setNote] = useState<string | undefined>("");
  const [selectedValue, setSelectedValue] = useState<string | undefined>("canned");
  const [expirationDate, setExpirationDate] = useState<string | undefined>();
  const [imageUri, setImageUri] = useState<string | null>("");

  const [modalVisible, setModalVisible] = useState(false);

  async function fetchProduct() {
    setLoading(true);
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .returns<ProductData[]>();

    if (error) return Alert.alert("Something went wrong", error.message);

    if (!products) return Alert.alert("Something went wrong", "No product was found");

    let data = products[0];
    setBarcode(data.barcode as string | undefined);
    setProductName(data.name as string | undefined);
    setQuantity(data.quantity?.toString() as string | undefined);
    setSelectedValue(data.category as string | undefined);
    setExpirationDate(data.expiration_date as string | undefined);
    setImageUri(data.image_url);

    console.log(products[0]);

    setLoading(false);
  }

  async function onDelete() {
    const { error } = await supabase.from("products").delete().eq("id", productId);

    if (error) Alert.alert("Delete Error", error.message);

    setModalVisible(false);
    navigation.goBack();
  }

  async function onUpdate() {
    setLoading(true);
    const productData = {
      name: productName,
      barcode: barcode,
      category: selectedValue,
      expiration_date: expirationDate,
      quantity: quantity,
      notes: note,
    };

    const errors = validateProductData(productData);
    console.log(errors);

    try {
      if (errors.length !== 0) throw new Error("Please input valid data");

      const { error } = await supabase.from("products").update(productData).eq("id", productId);

      if (error) throw new Error(error.message);
      Alert.alert("Success", "Product data successfully updated");
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Something went wrong", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
    console.log(productId);
  }, []);
  return (
    <View style={{ gap: 20, marginBottom: 40, padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <>
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
          <DatePicker
            defaultValue={expirationDate}
            setExpirationDate={setExpirationDate}
            label="Expiration Date:"
          />
          <TextField
            value={quantity}
            label="Quanity"
            onChangeText={setQuantity}
            placeholder="Input number of items"
            type="number-pad"
          />
          <TextField
            value={note}
            label="Note"
            onChangeText={setNote}
            placeholder="Add description"
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "black",
                flex: 1,
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={onUpdate}
            >
              <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                flex: 1,
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#0000007b",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 150,
              width: 280,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              gap: 20,
            }}
          >
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
              This action is irreversible
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "black",
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={onDelete}
              >
                <Text style={{ color: "white" }}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  flex: 1,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: "white" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
