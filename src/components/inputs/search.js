import { Text, View, TextInput, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { INPUT_ICON_COLOR } from "../../utils/constants";

const SearchInput = ({ onChange, value, isError = false }) => {
  return (
    <View style={[styles.inputContainer, isError ? styles.errorStyle : null]}>
      <FontAwesome5 name="search" size={24} color="#a5a5ae" />
      <TextInput
        style={styles.inputText}
        placeholder="i.e. James Bond, CSI"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#eaeaea",
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: "#00000000"
  },
  errorStyle: {
    borderColor: "#df6a6a",
  },
  inputText: {
    marginLeft: 10,
  },
});
