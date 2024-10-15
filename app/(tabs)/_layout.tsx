import { Text, View } from "react-native";
import { Tabs } from "expo-router";

import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: { display: "none" },
        tabBarStyle: { height: 60 },
        headerStyle: { height: 110 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitleStyle: { display: "none" },
          headerLeft: () => (
            <View style={{ flexDirection: "column", gap: -50, marginLeft: 10 }}>
              <Text
                style={{
                  fontFamily: "Poppins-Bold",
                  fontSize: 24,
                }}
              >
                ShelfLife
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 14,
                  marginTop: -10,
                  marginLeft: 20,
                }}
              >
                Food Waste Tracker
              </Text>
            </View>
          ),
          headerRight: () => (
            <Text style={{ fontFamily: "Poppins-SemiBold", marginRight: 20 }}>
              DASHBOARD
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Foundation size={28} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="food"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-takeout-box"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="add-product"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
          title: "",
          headerStyle: { height: 50 },
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="analytics" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
