import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import PrimaryButton from "../PrimaryButton";
import { FontDisplay } from "expo-font";

type ProductItemCardProps = {
  name: string | null;
  lifeSpanLeft: string | null;
  lifeSpanColor: string;
  quantity: number | null;
  imageUrl: string | null;
  barcode: string | null;
};

const imagePlaceholder = "https://ircsan.com/wp-content/uploads/2024/03/placeholder-image.png";

export default function ProductItemCard(props: ProductItemCardProps) {
  return (
    <View style={styles.productItemCardContainer}>
      <Image
        style={styles.productItemImage}
        source={{
          uri: props.imageUrl ?? imagePlaceholder,
        }}
      />
      <View>
        <Text style={styles.productName}>{props.name}</Text>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12, color: "grey" }}>
          {props.barcode}
        </Text>
        <Text style={{ color: props.lifeSpanColor, fontSize: 12 }}>{props.lifeSpanLeft}</Text>
        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 12 }}>
          Quantity: {props.quantity}
        </Text>
      </View>
      <View style={{ marginLeft: "auto", alignSelf: "center" }}>
        <PrimaryButton
          fontSize={12}
          title="View"
          variant="outline"
          paddingBlock={5}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productItemCardContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#f5f5f5",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    overflow: "hidden",
  },
  productItemImage: { width: 70, height: "100%", borderRadius: 8 },
  productName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    justifyContent: "space-between",
  },
});
