import DashboardCard from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const data = [
  { value: 50, label: "Canned" },
  { value: 80, label: "Meat" },
  { value: 90, label: "Vegetable" },
  { value: 70, label: "Snack" },
  { value: 80, label: "Beverage" },
  { value: 150, label: "Fish" },
  { value: 180, label: "Dessert" },
  { value: 25, label: "Oil" },
  { value: 20, label: "Grain" },
];

type AnalyticsTypes = { value: any; label: string };
type ProductNumTypes = {
  threeDaysBeforeCount: number;
  fourToSevenDaysBeforeCount: number;
  greaterThanSevenDaysBeforeCount: number;
};

export default function Index() {
  const [productData, setProductData] = useState<AnalyticsTypes[]>([]);
  const [productNum, setProductNum] = useState<ProductNumTypes>({
    threeDaysBeforeCount: 0,
    fourToSevenDaysBeforeCount: 0,
    greaterThanSevenDaysBeforeCount: 0,
  });

  const today = new Date().toISOString().split("T")[0];

  async function getAnalytics() {
    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .lt("expiration_date", today);

    if (error)
      return Alert.alert("Something went wrong", "We can't compile your data at the moment");

    if (!products)
      return Alert.alert("No data was found", "It seems like you don't have any expired data yet");

    const categoryCount = products.reduce((acc, product) => {
      const category = product.category || "Unknown"; // Handle case if category is missing
      const quantity = product.quantity || 0; // Handle case if quantity is missing
      acc[category] = (acc[category] || 0) + quantity; // Add quantity to the category count
      return acc;
    }, {} as Record<string, number>);

    const data = Object.keys(categoryCount).map((category) => ({
      value: categoryCount[category], // Use the summed quantity as the value
      label: category,
    }));

    console.log(data);
    setProductData(data);
  }

  async function getExpirationCategoryCounts() {
    const today = new Date(); // Current date

    let { data: products, error } = await supabase
      .from("products")
      .select("*")
      .gte("expiration_date", new Date().toISOString().split("T")[0]); // Get non-expired products

    if (error)
      return Alert.alert("Something went wrong", "We can't retrieve your data at the moment");

    if (!products || products.length === 0)
      return Alert.alert("No data found", "It seems like there are no products to categorize.");

    // Initialize counts for each category
    let threeDaysBeforeCount = 0;
    let fourToSevenDaysBeforeCount = 0;
    let greaterThanSevenDaysBeforeCount = 0;

    products.forEach((product) => {
      const expirationDate = new Date(product.expiration_date);
      const timeDifference = expirationDate.getTime() - today.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

      if (daysDifference <= 3) {
        // Expiration within 3 days
        threeDaysBeforeCount++;
      } else if (daysDifference >= 4 && daysDifference <= 7) {
        // Expiration in 4 to 7 days
        fourToSevenDaysBeforeCount++;
      } else if (daysDifference > 7) {
        // Expiration greater than 7 days
        greaterThanSevenDaysBeforeCount++;
      }
    });

    setProductNum({
      threeDaysBeforeCount,
      fourToSevenDaysBeforeCount,
      greaterThanSevenDaysBeforeCount,
    });
  }

  useEffect(() => {
    getAnalytics();
    getExpirationCategoryCounts();
  }, []);

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
        <Text style={{ fontSize: 18, fontFamily: "Poppins-SemiBold" }}>Hi Jessica!</Text>
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

      <View style={{ alignItems: "center", width: "100%", marginTop: 40 }}>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
          Expired Item by Category
        </Text>
        <BarChart
          width={300}
          barWidth={50}
          data={productData}
          xAxisLabelTextStyle={{ textTransform: "capitalize" }}
        />
      </View>

      <Text style={styles.dashboardCardsTitle}>About to Expire</Text>
      <View style={styles.dashboardCardsWrapper}>
        <DashboardCard
          numberOfItems={`${productNum.threeDaysBeforeCount}`}
          numOfDaysToExpire="< 3 days"
        />
        <DashboardCard
          numberOfItems={`${productNum.fourToSevenDaysBeforeCount}`}
          numOfDaysToExpire="4-7 days"
        />
        <DashboardCard
          numberOfItems={`${productNum.greaterThanSevenDaysBeforeCount}`}
          numOfDaysToExpire="> 7 days"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dashboardCardsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    textAlign: "center",
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  dashboardCardsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
});
