import { Text, View, StyleSheet, Pressable } from "react-native";
import { SELECT_COLOR } from "../utils/constants";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <View style={styles.container}>
      {currentPage > 1 ? (
        <Pressable
          style={styles.button}
          onPress={() => {
            onPageChange(currentPage - 1);
          }}
        >
          <Text style={styles.buttonText}>&lt; Previous</Text>
        </Pressable>
      ) : null}
      <Text style={styles.currentPage}>{currentPage}</Text>
      {totalPages > currentPage ? (
        <Pressable
          style={styles.button}
          onPress={() => {
            onPageChange(currentPage + 1);
          }}
        >
          <Text style={styles.buttonText}>Next &gt;</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 20,
  },
  button: {
    width: 100,
    alignItems: "center",
    padding: 10,
    backgroundColor: SELECT_COLOR,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
  },
  currentPage: {
    backgroundColor: SELECT_COLOR,
    height: "100%",
    textAlignVertical: "center",
    padding: 10,
    borderRadius: 5,
    color: "white",
  },
});
