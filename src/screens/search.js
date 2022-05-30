import { View, StyleSheet, FlatList, Text, Pressable } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import SearchInput from "../components/inputs/search";
import DropDown from "../components/inputs/dropdown";
import ListTile from "../components/list-tile";

import { getListing } from "../utils/api-call";

import BottomSheetInput from "../components/inputs/bottom-sheet";
import Pagination from "../components/pagination";
import PageLoader from "../components/loader";
import { BUTTON_COLOR, SEARCH_REQUEST_TYPE } from "../utils/constants";

const Search = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dropDownSelected, setDropDownSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isError, setIsError] = useState(false);
  const [list, setList] = useState(null);
  const [totalPagesAvailable, setTotalPagesAvailable] = useState(null);
  // const [totalResultsAvailable, setTotalResultsAvailable] = useState(null);
  const [page, setPage] = useState(1);
  const [apiCallActiveStatus, setApiCallActiveStatus] = useState(true);

  const getList = async (pageNumber = 1) => {
    setApiCallActiveStatus(true);
    const { results, total_pages, total_results } = await getListing(
      "Search",
      SEARCH_REQUEST_TYPE[selectedIndex],
      pageNumber,
      searchTerm
    );
    setList(results);
    setTotalPagesAvailable(total_pages);
    // setTotalResultsAvailable(total_results);
    setPage(pageNumber);
    setApiCallActiveStatus(false);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputsContainer}>
        <Text style={styles.inputContainerText}>
          Search Movie/TV Show Name<Text style={styles.requiredText}>*</Text>
        </Text>
        <SearchInput
          isError={isError}
          onChange={(value) => {
            setSearchTerm(value);
          }}
          value={searchTerm}
        />
        <Text style={styles.inputContainerText}>
          Choose Search Type<Text style={styles.requiredText}>*</Text>
        </Text>
        <View style={styles.typeContainer}>
          <DropDown
            title={SEARCH_REQUEST_TYPE[selectedIndex]}
            customStyle={[
              styles.dropDownStyle,
              isError ? styles.dropDownErrorStyle : null,
            ]}
            onPress={() => {
              setDropDownSelected(true);
            }}
          />
          <Pressable
            style={styles.searchButton}
            onPress={() => {
              if ("" === searchTerm.trim()) {
                setIsError(true);
              } else {
                setIsError(false);
                getList();
              }
            }}
          >
            <FontAwesome5 name="search" size={24} color="white" />
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
        </View>
        {isError ? (
          <Text style={styles.errorText}>Movie/TV show name is required</Text>
        ) : (
          <Text style={styles.infoText}>Please select a search type</Text>
        )}
      </View>
      {!list ? (
        <Text style={styles.placeholderText}>Please initiate a search</Text>
      ) : apiCallActiveStatus ? (
        <PageLoader />
      ) : (
        <FlatList
          style={styles.flatList}
          data={[...list, { id: -1, isPagination: true }]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            !item.isPagination ? (
              <ListTile
                id={item.id}
                title={item.title || item.originalName || item.name}
                popularity={item.popularity}
                releaseDate={item.release_date}
                imageUrl={item.poster_path}
              />
            ) : (
              <Pagination
                totalPages={totalPagesAvailable}
                currentPage={page}
                onPageChange={(newPage) => {
                  getList(newPage);
                }}
              />
            )
          }
        />
      )}
      <BottomSheetInput
        values={SEARCH_REQUEST_TYPE}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index);
        }}
        onClose={() => {
          setDropDownSelected(false);
        }}
        isVisible={dropDownSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 100,
  },
  inputsContainer: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  inputContainerText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    marginTop: 10,
    color: "#df6a6a",
    fontWeight: "bold",
  },
  infoText: {
    marginTop: 15,
  },
  requiredText: {
    color: "#df6a6a",
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDownStyle: {
    width: 160,
    marginRight: 20,
  },
  dropDownErrorStyle: {
    borderColor: "#df6a6a",
    borderWidth: 2,
  },
  searchButton: {
    backgroundColor: BUTTON_COLOR,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    marginLeft: 10,
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    paddingTop: 125,
  },
  flatList: {
    marginBottom: 20,
  },
});

export default Search;