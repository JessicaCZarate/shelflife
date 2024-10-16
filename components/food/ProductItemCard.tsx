import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import PrimaryButton from "../PrimaryButton";

type ProductItemCardProps = {
  name: string;
  lifeSpanLeft: string;
  lifeSpanColor: string;
  quantity: number;
  imageUrl: string;
};

export default function ProductItemCard(props: ProductItemCardProps) {
  return (
    <View style={styles.productItemCardContainer}>
      <Image
        style={styles.productItemImage}
        source={{
          uri: props.imageUrl,
        }}
      />
      <View>
        <Text style={styles.productName}>{props.name}</Text>
        <Text style={{ color: props.lifeSpanColor }}>{props.lifeSpanLeft}</Text>
        <Text style={{ fontFamily: "Poppins-Medium" }}>
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
    gap: 8,
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
  },
  productItemImage: { width: 70, height: 70, borderRadius: 8 },
  productName: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    justifyContent: "space-between",
  },
});
