import { View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";

import DropDown from "../components/inputs/dropdown";
import ListTile from "../components/list-tile";

import { getListing } from "../utils/api-call";

import BottomSheetInput from "../components/inputs/bottom-sheet";
import Pagination from "../components/pagination";
import PageLoader from "../components/loader";

const Listing = ({
  type,
  requestType = [],
  initialSelectedRequestTypeIndex = 1,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    initialSelectedRequestTypeIndex
  );
  const [List, setList] = useState(null);
  const [totalPagesAvailable, setTotalPagesAvailable] = useState(null);
  // const [totalResultsAvailable, setTotalResultsAvailable] = useState(null);
  const [page, setPage] = useState(1);
  const [apiCallActiveStatus, setApiCallActiveStatus] = useState(true);
  const [dropDownSelected, setDropDownSelected] = useState(false);

  const getList = async (pageNumber = 1) => {
    setApiCallActiveStatus(true);
    const { results, total_pages, total_results } = await getListing(
      type,
      requestType[selectedIndex],
      pageNumber
    );
    setList(results);
    setTotalPagesAvailable(total_pages);
    // setTotalResultsAvailable(total_results);
    setPage(pageNumber);
    setApiCallActiveStatus(false);
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, [selectedIndex, type]);

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <DropDown
        title={requestType[selectedIndex]}
        onPress={() => {
          setDropDownSelected(true);
        }}
      />
      {apiCallActiveStatus ? (
        <PageLoader />
      ) : (
        <FlatList
          style={styles.flatList}
          data={[...List, { id: -1, isPagination: true }]}
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
        values={requestType}
        selectedIndex={selectedIndex}
        onChange={(index) => {
          setSelectedIndex(index || 0);
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
  },
  flatList: {
    marginBottom: 20,
  },
});

export default Listing;
