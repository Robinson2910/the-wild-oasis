import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const [searchParams] = useSearchParams();

  // object with two proeprties
  //queryKey:uniquely identify data that we are going to query here
  //late if we useQuery again with this exact key then data would be read from the cache
  // fn which is responsible for querying or fetching data fromapi
  //fn needs to return promise
  //promise when resolved returns the data
  //that data is the one which will be stored in the cache
  // cabins state(query state) is similar to all other state we create
  //when it changes rerenders and refetches will happen
  const { isLoading, cabins } = useCabins();
  // returned data from query fn will be stored in cache with key as cabins
  //next time data can be retrieved directly from cache
  //make sure query fn is a async fn which returns a promise

  // think of it as

  // 1) we are creating a query state using the hook(useQuery)
  // 2) and it will be cached with the key name we give
  // if data is fetched without error,or it will return an error
  //isLoading is for notifying that it is trying to fetch data

  if (isLoading) return <Spinner />;

  // 1)Filter
  const filterValue =
    searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") {
    filteredCabins = cabins;
  } else if (filterValue === "no-discount") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount === 0
    );
  } else if (filterValue === "with-discount") {
    filteredCabins = cabins.filter(
      (cabin) => cabin.discount > 0
    );
  }

  // Sort

  const sortBy =
    searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capcity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => (
            <CabinRow
              cabin={cabin}
              key={cabin.id}
            />
          )}
        />
        {/* <Table.Body render>
        {cabins.map((cabin) => (
          <CabinRow
            cabin={cabin}
            key={cabin.id}
          />
        ))}
      </Table.Body> */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
