import { StyleSheet, Text, View, Pressable } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant: "solid" | "outline";
};

export default function PrimaryButton(props: ButtonProps) {
  switch (props.variant) {
    case "solid":
      return (
        <Pressable style={[styles.base, styles.solid]} onPress={props.onPress}>
          <Text style={[styles.baseTextStyle, styles.solidTextStyle]}>
            {props.title}
          </Text>
        </Pressable>
      );
    case "outline":
      return (
        <Pressable
          style={[styles.base, styles.outline]}
          onPress={props.onPress}
        >
          <Text style={[styles.baseTextStyle, styles.outlineTextStyle]}>
            {props.title}
          </Text>
        </Pressable>
      );
  }
}

const styles = StyleSheet.create({
  base: {
    minWidth: 200,
    borderRadius: 10,
    paddingVertical: 10,
  },
  baseTextStyle: { textAlign: "center", fontFamily: "Poppins-SemiBold" },

  solid: { backgroundColor: "black" },
  outline: { borderWidth: 1, borderColor: "black" },

  solidTextStyle: { color: "white" },
  outlineTextStyle: { color: "black" },
});
