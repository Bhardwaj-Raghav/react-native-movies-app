import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const DropDown = ({ title, onPress = undefined }) => {
  return (
    <Pressable style={styles.selectDropdownContainer} onPress={onPress}>
      <View style={styles.selectDropdown}>
        <Text>{title}</Text>
        <FontAwesome5 name="chevron-down" size={24} color="#e3e3e3" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  selectDropdownContainer: {
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  selectDropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: 300,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default DropDown;
