import { View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";

import DropDown from "../components/inputs/dropdown";
import MovieTile from "../components/movie-tile";

import { getListing } from "../utils/api-call";

import { MOVIE_REQUEST_TYPE } from "../utils/constants";
import BottomSheetInput from "../components/inputs/bottom-sheet";
import Pagination from "../components/pagination";
import PageLoader from "../components/loader";

const MoviesListing = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [moviesList, setMoviesList] = useState(null);
  const [totalPagesAvailable, setTotalPagesAvailable] = useState(null);
  // const [totalResultsAvailable, setTotalResultsAvailable] = useState(null);
  const [page, setPage] = useState(1);
  const [apiCallActiveStatus, setApiCallActiveStatus] = useState(true);
  const [dropDownSelected, setDropDownSelected] = useState(false);

  const getMovieList = async () => {
    setApiCallActiveStatus(true);
    const { results, total_pages, total_results } = await getListing(
      "Movie",
      MOVIE_REQUEST_TYPE[selectedIndex],
      page
    );
    setMoviesList(results);
    setTotalPagesAvailable(total_pages);
    // setTotalResultsAvailable(total_results);
    setApiCallActiveStatus(false);
  };

  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, [selectedIndex, page]);

  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <DropDown
        title={MOVIE_REQUEST_TYPE[selectedIndex]}
        onPress={() => {
          console.log("Here");
          setDropDownSelected(true);
        }}
      />
      {apiCallActiveStatus ? (
        <PageLoader />
      ) : (
        <FlatList
          style={styles.flatList}
          data={[...moviesList, { id: -1, isPagination: true }]}
          keyExtractor={(movie) => movie.id}
          renderItem={({ item }) =>
            !item.isPagination ? (
              <MovieTile
                id={item.id}
                title={item.title}
                popularity={item.popularity}
                releaseDate={item.release_date}
                imageUrl={item.poster_path}
              />
            ) : (
              <Pagination
                totalPages={totalPagesAvailable}
                currentPage={page}
                onPageChange={(newPage) => {
                  setPage(newPage);
                }}
              />
            )
          }
        />
      )}

      <BottomSheetInput
        values={MOVIE_REQUEST_TYPE}
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index || 0);
          setDropDownSelected(false);
          setPage(1);
        }}
        isVisible={dropDownSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  flatList: {
    marginBottom: 20,
  },
});

export default MoviesListing;
