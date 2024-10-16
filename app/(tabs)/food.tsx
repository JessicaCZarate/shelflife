import FoodSearchBar from "@/components/food/FoodSearchBar";
import ProductItemCard from "@/components/food/ProductItemCard";
import ScannerModal from "@/components/food/ScannerModal";
import { Database } from "@/types/supabase";
import { daysLeftUntilExpiration } from "@/utils/DateFormatter";
import { supabase } from "@/utils/supabase";
import { useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, FlatList, ActivityIndicator } from "react-native";

const imageUri = [
  "https://ph-test-11.slatic.net/p/70fa5c75f838487bc5c8d2b603750295.jpg",
  "https://www.redbasket.ph/cdn/shop/files/SM9811873-1.png?v=1695804370",
];

type ProductTypes = Database["public"]["Tables"]["products"]["Row"];

export default function Food() {
  const [products, setProducts] = useState<ProductTypes[] | null>();
  const [totalProducts, setTotalProducts] = useState<number | null>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanTrigger, setScanTrigger] = useState(0);

  async function searchProduct() {
    setIsLoading(true);
    let {
      data: products,
      error,
      count,
    } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .or(`name.ilike.%${searchText}%,barcode.ilike.%${searchText}%`)
      .returns<ProductTypes[]>();

    if (error) return Alert.alert("Something went wrong", "Can't get products");

    setProducts(products);
    setTotalProducts(count);
    setIsLoading(false);
  }

  useEffect(() => {
    searchProduct();
  }, [scanTrigger]);

  async function onScanHandler() {
    const result = await requestPermission();

    if (!result.granted) return alert("Allow Camera permission to scan product");

    setModalVisible(true);
  }

  return (
    <View style={styles.foodRootContainer}>
      <FoodSearchBar
        searchValue={searchText}
        onScan={onScanHandler}
        setSearchText={setSearchText}
        onPress={searchProduct}
      />

      <View style={styles.totalStoredFoodTextContainer}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>All Stored Food</Text>
        <Text style={styles.totalTextStyle}>
          Total:{" "}
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>
            {totalProducts && totalProducts > 10 ? totalProducts : `0${totalProducts}`}
          </Text>
        </Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="black" style={{ marginVertical: 15 }} />}

      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, backgroundColor: "transparent", paddingBottom: 40 }}
        style={{ paddingBottom: 20, marginTop: 16 }}
        renderItem={({ item }) => {
          const daysLeft = daysLeftUntilExpiration(item.expiration_date);
          const color = daysLeft >= 8 ? "green" : daysLeft >= 5 ? "orange" : "red";

          return (
            <>
              <ProductItemCard
                key={item.id}
                imageUrl={item.image_url}
                name={item.name}
                quantity={item.quantity}
                barcode={item.barcode}
                lifeSpanColor={color}
                lifeSpanLeft={`${daysLeft} days left`}
              />
            </>
          );
        }}
      />

      <ScannerModal
        trigger={setScanTrigger}
        setBarCode={setSearchText}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  foodRootContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  totalStoredFoodTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  totalTextStyle: {
    fontFamily: "Poppins",
    fontSize: 16,
    alignItems: "center",
  },
});
