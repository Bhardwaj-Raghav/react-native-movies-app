import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import { BUTTON_COLOR, MOVIE_DB_API_IMAGE_BASE_URL } from "../utils/constants";

const MovieTile = ({ id, title, popularity, releaseDate, imageUrl }) => {
  return (
    <View style={styles.movieTile}>
      <Image
        style={styles.image}
        source={{
          uri: MOVIE_DB_API_IMAGE_BASE_URL + "w154" + imageUrl,
        }}
      />
      <View style={styles.rightSideContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>Popularity: {popularity}</Text>
        <Text style={styles.subtitle}>Release Date: {releaseDate}</Text>
        <Pressable
          style={styles.button}
          accessibilityLabel="Learn more about this."
        >
          <Text style={styles.buttonText}>More Details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieTile: {
    width: "100%",
    // backgroundColor: "#e3e3e3",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  rightSideContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 12,
    color: "#2e2e2e",
  },
  button: {
    width: "90%",
    backgroundColor: BUTTON_COLOR,
    padding: 10,
    borderRadius: 3,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default MovieTile;
