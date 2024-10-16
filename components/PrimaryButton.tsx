import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant: "solid" | "outline";
  paddingBlock?: number;
  paddingInline?: number;
  fontSize?: number;
};

export default function PrimaryButton(props: ButtonProps) {
  let customStyle = {
    paddingVertical: props.paddingBlock ?? 10,
    paddingHorizontal: props.paddingInline ?? 15,
  };

  switch (props.variant) {
    case "solid":
      return (
        <Pressable
          style={[styles.base, styles.solid, customStyle]}
          onPress={props.onPress}
        >
          <Text
            style={[
              styles.baseTextStyle,
              styles.solidTextStyle,
              { fontSize: props.fontSize ?? 16 },
            ]}
          >
            {props.title}
          </Text>
        </Pressable>
      );
    case "outline":
      return (
        <TouchableOpacity
          style={[styles.base, styles.outline, customStyle]}
          onPress={props.onPress}
        >
          <Text
            style={[
              styles.baseTextStyle,
              styles.outlineTextStyle,
              { fontSize: props.fontSize ?? 16 },
            ]}
          >
            {props.title}
          </Text>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 10,
    justifyContent: "center",
  },
  baseTextStyle: { textAlign: "center", fontFamily: "Poppins-SemiBold" },

  solid: { backgroundColor: "black" },
  outline: { borderWidth: 1, borderColor: "black" },

  solidTextStyle: { color: "white" },
  outlineTextStyle: { color: "black" },
});
