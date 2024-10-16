import FoodSearchBar from "@/components/food/FoodSearchBar";
import ProductItemCard from "@/components/food/ProductItemCard";
import { View, StyleSheet, Text } from "react-native";

const imageUri = [
  "https://ph-test-11.slatic.net/p/70fa5c75f838487bc5c8d2b603750295.jpg",
  "https://www.redbasket.ph/cdn/shop/files/SM9811873-1.png?v=1695804370",
];

export default function Food() {
  return (
    <View style={styles.foodRootContainer}>
      <FoodSearchBar />

      <View style={styles.totalStoredFoodTextContainer}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
          All Stored Food
        </Text>
        <Text style={styles.totalTextStyle}>
          Total:{" "}
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 20 }}>00</Text>
        </Text>
      </View>

      <View style={{ marginTop: 40, gap: 20 }}>
        <ProductItemCard
          imageUrl={imageUri[0]}
          lifeSpanLeft="2 days left"
          name="Mega Sardines"
          quantity={12}
          lifeSpanColor="red"
        />
        <ProductItemCard
          imageUrl={imageUri[1]}
          lifeSpanLeft="5 days left"
          name="Selecta Fortified Milk"
          quantity={12}
          lifeSpanColor="green"
        />
      </View>
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
