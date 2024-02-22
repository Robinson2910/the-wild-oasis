import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  // object with two proeprties
  //queryKey:uniquely identify data that we are going to query here
  //late if we useQuery again with this exact key then data would be read from the cache
  // fn which is responsible for querying or fetching data fromapi
  //fn needs to return promise
  //promise when resolved returns the data
  //that data is the one which will be stored in the cache
  // cabins state(query state) is similar to all other state we create
  //when it changes rerenders and refetches will happen
  const { isLoading, cabins, error } =
    useCabins();
  // returned data from query fn will be stored in cache with key as cabins
  //next time data can be retrieved directly from cache
  //make sure query fn is a async fn which returns a promise

  // think of it as

  // 1) we are creating a query state using the hook(useQuery)
  // 2) and it will be cached with the key name we give
  // if data is fetched without error,or it will return an error
  //isLoading is for notifying that it is trying to fetch data

  if (isLoading) return <Spinner />;
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capcity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
