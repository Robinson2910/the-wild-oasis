// In general, the `useQuery` hook is a part of the React Query library, which is designed to simplify and manage data fetching in React applications. Without abstraction, here's an explanation of what `useQuery` does:

// 1. **Data Fetching:**
//    - `useQuery` is used to fetch data from an asynchronous source, such as an API endpoint.
//    - It encapsulates the logic for making the request, handling loading states, and managing the retrieved data.

// 2. **Caching:**
//    - React Query includes a caching mechanism, and `useQuery` takes advantage of this to cache the fetched data.
//    - If the same query is made again, React Query can return the cached data instead of making a new request, improving performance.

// 3. **Automatic State Management:**
//    - `useQuery` manages the state of the data fetching process, providing information about whether the data is currently being fetched (`isLoading`), if there's an error during fetching (`error`), and the actual data (`data`).

// 4. **Dependency Tracking:**
//    - It automatically tracks dependencies and ensures that if the underlying data changes (e.g., due to a refetch), the components using the query will re-render with the updated data.

// 5. **Optimistic Updates and Offline Support:**
//    - React Query supports optimistic updates, allowing you to update the UI optimistically before the server responds.
//    - It also provides features for working with offline data, enabling you to work with locally cached data when the network is unavailable.

// 6. **Polling and Refetching:**
//    - `useQuery` supports automatic polling for fresh data at specified intervals.
//    - It allows manual triggering of refetches when needed, giving you control over when to fetch updated data.

// In essence, `useQuery` abstracts away many complexities involved in data fetching, making it easier for developers to handle asynchronous operations in their React applications. It simplifies the management of loading states, error handling, caching, and data synchronization with the UI.

import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, error, settings };
}
