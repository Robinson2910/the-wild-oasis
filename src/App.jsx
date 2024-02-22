import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import DashBoard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Boooking";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";

// Similar Approach to Context API and Redux:

// Integration of React Query into the application follows a pattern similar to what was done earlier with the Context API or Redux.
// Two-step process:
// a. Creation of a data storage space.
// b. Provision of this data to the application.
// Setting up Cache and Query Client:

// For React Query integration, the cache and Query client are established using new QueryClient from "tanstack/react-query."
// Creation of QueryClient Variable:

// The QueryClient is stored in a variable named "QueryClient."
// Options for the QueryClient can be specified during its creation.
// Default Options and Query Options:

// Default options for the QueryClient can be set.
// Options for individual queries can be specified, one example being "staleTime."
// Understanding "staleTime" Option:

// "staleTime" represents the duration for which the data in the cache remains fresh before it becomes invalid and needs to be refetched.
// In the example, a "staleTime" of one minute is set (60 seconds * 1000 milliseconds).
// Overview of React Query Defaults:

// React Query has some aggressive default settings, and developers can override many options based on their application's needs.

// In the context of React Query, queryClient is an instance of QueryClient, which is a central part of React Query's functionality. The QueryClient is responsible for managing queries and mutations in your application.

// Here's the significance of the line const queryClient = new QueryClient();:

// Centralized State Management:

// Point to note *******
// QueryClient acts as a centralized store for the state of queries and mutations in your application.

// It manages the caching, fetching, and updating of data.
// Configuration:

// You can configure the QueryClient instance according to your application's needs. For example, you can set global defaults for queries, set up dev tools integration, or configure caching behavior.
// QueryClientProvider:

// The QueryClient instance is typically wrapped with a QueryClientProvider higher in your component tree. This provider makes the queryClient instance available to all components within its scope.
// Usage in Components:

// **************importan note****
// Components that need to make queries or mutations can access the queryClient instance to trigger queries or invalidate cached data.
const queryClient = new QueryClient({
  // refetching happens after 0 seconds now
  //so whenever value is changed or when there is switching btwn pages
  //thereby causing component to unmount,then data will be refetched from db

  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
function App() {
  // placing all routes inside a route is called a layout route
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* In React Router, an "index route" typically refers to a default route that is displayed when the base path (root path) of your application is accessed */}

          {/* usage of replace:This means that when the navigation
          occurs, it will replace the current
          entry in the navigation history with the
          new one, preventing the user from
          navigating back to the previous page
          using the browser's back button. */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <Navigate
                  replace
                  to="dashboard"
                />
              }
            />
            <Route
              path="dashboard"
              element={<DashBoard />}
            />
            <Route
              path="bookings"
              element={<Bookings />}
            />
            <Route
              path="bookings/:bookingId"
              element={<Booking />}
            />
            <Route
              path="checkin/:bookingId"
              element={<Checkin />}
            />
            <Route
              path="cabins"
              element={<Cabins />}
            />
            <Route
              path="users"
              element={<Users />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
            <Route
              path="account"
              element={<Account />}
            />
          </Route>
          <Route
            path="login"
            element={<Login />}
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </BrowserRouter>
      {/* Toaster because it will produce toasts,toasts is the name given to nicely modified notifications */}
      {/* gutter -space between window and toaster */}
      {/* we will place in App.jsx and where we want we can use toast fn to produce notifications or alert */}
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor:
              "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

// import styled from "styled-components";
// // styled is a function that can be used to create styled components.
// import GlobalStyles from "./styles/GlobalStyles";
// import Button from "./ui/Button";
// import Input from "./ui/Input";
// import Heading from "./ui/Heading";
// import Row from "./ui/Row";

// // styled is a function that can be used to create styled components. In this case, it's applied to the div element.
// const StyledApp = styled.div`
//   padding: 20px;
// `;

// //CRUX:this will now return a react component
// //it will be rendered as div with randomly named class with styles u mentioned

// // tmi
// // Template Literal for Styling:

// // The backticks (``) denote a template literal, allowing you to write multi-line strings with embedded expressions.
// // CSS Styles:

// // Inside the template literal, you write CSS styles as you would in a regular stylesheet. In this example, it sets a padding of 20 pixels for the StyledApp component.
// // Dynamic Styling:

// // The styles can be dynamic and interpolated with JavaScript expressions. However, in this example, the styles are static.
// // Component Creation:

// // The styled.div function returns a new React component with the specified styles. In this case, it's a div component.
// // Use the Styled Component:

// // You can now use StyledApp as a React component in your JSX.
// function App() {
//   return (
//     <>
//       {/* global style has to placed as sibling to app component */}
//       <GlobalStyles />
//       <StyledApp>
//         <Row>
//           <Row type="horizontal">
//             <Heading as="h1">
//               The Wild Oasis
//             </Heading>
//             <div>
//               <Heading as="h2">
//                 Check in and out
//               </Heading>
//               <Button
//                 variation="primary"
//                 size="medium"
//                 onClick={() => alert("check in")}
//               >
//                 Check in
//               </Button>

//               <Button
//                 variation="secondary"
//                 size="small"
//                 onClick={() => alert("check out")}
//               >
//                 Check out
//               </Button>
//             </div>
//           </Row>
//           <Row>
//             <Heading as="h3">Form</Heading>
//             <form>
//               <Input
//                 type="number"
//                 placeholder="Number of guests"
//               />
//               <Input
//                 type="number"
//                 placeholder="Number of guests"
//               />
//             </form>
//           </Row>
//         </Row>
//       </StyledApp>
//     </>
//   );
// }

// export default App;
