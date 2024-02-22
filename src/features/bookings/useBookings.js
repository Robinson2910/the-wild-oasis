import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  // we reading the query parameter using search params and pass it to the api call

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };
  // {
  //   field: "totalPrice",
  //   value: 5000,
  //   method: "gte",
  // };

  //sort

  const sortByRaw =
    searchParams.get("sortBy") ||
    "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //pagination

  const page = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  // whenever the component using the query state is unmounted
  //query state is set to unactive then after it is mounted it will refetched and set to active and then stale

  //QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // we can add any value for the query to depend on,here on to this array,so whenever this filter changes or sortBy,react query will refetch the data
    queryFn: () =>
      getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data;
  const count = data?.count;

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filter,
        sortBy,
        page + 1,
      ], // we can add any value for the query to depend on,here on to this array,so whenever this filter changes or sortBy,react query will refetch the data
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [
        "bookings",
        filter,
        sortBy,
        page - 1,
      ], // we can add any value for the query to depend on,here on to this array,so whenever this filter changes or sortBy,react query will refetch the data
      queryFn: () =>
        getBookings({
          filter,
          sortBy,
          page: page - 1,
        }),
    });

  return {
    isLoading,
    bookings,
    error,
    count,
  };
}

// so the data will be cached with key as bookins,filter object

//so for each field value of filter,bookings will be cached and then from that cache we can use
