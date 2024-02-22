import { Children } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {/* we need to have the id in input as for of label , so we access the props of the input element which is passed as children */}
      {label && (
        <Label htmlFor={children.props.id}>
          {label}
        </Label>
      )}
      {/* // {...register("name")}
        //this will add few other props to input
        //one is name and others are onChange and
        onBlur */}
      {/* first argument of register is name */}
      {/* second argument we can pass in an object for validation */}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
