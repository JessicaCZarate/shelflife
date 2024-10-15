import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AbstractGraySwirl from "../svg/AbstractGraySwirl";

type Props = {
  numberOfItems: string;
  numOfDaysToExpire: string;
};

export default function DashboardCard(props: Props) {
  return (
    <View
      style={{
        width: 150,
        height: 100,
        backgroundColor: "black",
        borderRadius: 12,
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <View style={{ marginLeft: 15 }}>
        <Text
          style={{
            color: "white",
            fontSize: 22,
            fontFamily: "Poppins-SemiBold",
          }}
        >
          {props.numberOfItems}
        </Text>
        <Text style={{ color: "white" }}>{props.numOfDaysToExpire}</Text>
      </View>

      <View
        style={{
          position: "absolute",
          right: -25,
          top: -30,
          transform: [{ rotateZ: "0deg" }],
        }}
      >
        <AbstractGraySwirl />
      </View>

      <View style={{ gap: 4, position: "absolute", right: 12, top: 15 }}>
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 20,
            backgroundColor: "white",
          }}
        ></View>
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 20,
            backgroundColor: "white",
          }}
        ></View>
      </View>
    </View>
  );
}
