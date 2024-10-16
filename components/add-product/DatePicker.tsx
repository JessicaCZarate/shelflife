import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDate } from "@/utils/DateFormatter";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Fonts";

type Props = {
  label: string;
  setExpirationDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

export default function DatePicker(props: Props) {
  const [date, setDate] = useState<Date | undefined>();
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setShow(false);
      return;
    }

    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      props.setExpirationDate(selectedDate);
    }

    setShow(false);
  };

  const showMode = (currentMode: AndroidNativeProps["mode"]) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  function showDatePicker() {
    if (Platform.OS === "android") {
      return showMode("date");
    }

    setShow(true);
  }

  return (
    <View
      style={{
        borderBottomWidth: 2,
        borderBottomColor: Colors.mutedGray,
        paddingBottom: 6,
      }}
    >
      <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: Fonts.labelSize }}>
        {props.label}
      </Text>
      <Pressable style={{ marginTop: 6 }} onPress={showDatePicker}>
        <Text style={{ fontFamily: "Poppins", fontSize: 14 }}>
          {!date ? "--/--/---" : formatDate(date.toISOString())}
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker value={new Date()} mode="date" display="default" onChange={onChange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
