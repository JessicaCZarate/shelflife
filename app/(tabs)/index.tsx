import ArrowRight from "@/components/svg/ArrowRight";
import DashboardCard from "@/components/dashboard/DashboardCard";
import AbstractGraySwirl from "@/components/svg/AbstractGraySwirl";
import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold" }}>
          Hi Jessica!
        </Text>
        <View
          style={{
            width: 40,
            height: 20,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.lightGray,
          }}
        >
          <Text style={{ fontSize: 10 }}>Free</Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: "Poppins-SemiBold",
          fontSize: 20,
          textAlign: "center",
          width: "100%",
          marginTop: 40,
          marginBottom: 20,
        }}
      >
        About to Expire
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          justifyContent: "center",
        }}
      >
        <DashboardCard numberOfItems={"00"} numOfDaysToExpire="< 3 days" />
        <DashboardCard numberOfItems={"00"} numOfDaysToExpire="4-7 days" />
        <DashboardCard numberOfItems={"00"} numOfDaysToExpire="> 7 days" />
      </View>

      <View style={{ marginTop: 40, marginHorizontal: 40 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
          Food Items: --
        </Text>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
          Expired Items: --
        </Text>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 18 }}>
          Total Food Waste: --
        </Text>
      </View>
    </View>
  );
}
