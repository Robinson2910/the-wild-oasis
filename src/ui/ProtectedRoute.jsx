import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  //1 Load authenticated user
  const { user, isLoading, isAuthenticated } =
    useUser();

  //3.If there is no authenticated user,redirect to the /login
  useEffect(
    function () {
      //when no longer loading i.e when user has been fetched and if not authenticate
      //we navigate to /login
      console.log(user);
      if (
        !(user?.role === "authenticated") &&
        !isLoading
      )
        navigate("/login");
    },
    [isLoading, user, navigate]
  );

  //while loading show a spinner

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.If there is user ,render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
