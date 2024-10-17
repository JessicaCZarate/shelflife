import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 40,
        backgroundColor: "white",
        gap: 20,
      }}
    >
      <View style={{ alignSelf: "center", justifyContent: "center" }}>
        <Ionicons style={{ alignSelf: "center" }} name="person-circle-outline" size={100} />
        <Text style={{ fontFamily: "Poppins-SemiBold" }}>johndoe@gmail.com</Text>
      </View>
      <View style={{ borderColor: "black", padding: 30, borderWidth: 1, borderRadius: 20 }}>
        <Text style={{ fontFamily: "Poppins", fontSize: 18 }}>Current Plan</Text>
        <Text style={{ fontFamily: "Poppins-Bold", fontSize: 18 }}>FREE TIER</Text>
      </View>
      <TouchableOpacity style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Ionicons name="rocket-outline" size={34} />
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
          Upgrade to subscription plan
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Ionicons name="log-out-outline" size={34} />
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>Log out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Ionicons name="person-remove-outline" size={34} />
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}
