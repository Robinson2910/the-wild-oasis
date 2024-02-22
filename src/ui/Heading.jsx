import styled, { css } from "styled-components";

//since we are using the template literal we can
//go into js mode by using `${}`

//we can write css in external variable and then use it
//using template literal with dollar
// eg

//css function here would be extremely helpful
// just to get syntax highlighting back
//
const test = `

 
`;

// Create a Styled Component with Dynamic Styling:

// styled.h1 is used to create a styled h1 component.
// ${(props) => ...} allows for dynamic styling based on the props passed to the component.
// Conditional Styling with props.as:

// The code checks if the as prop is equal to "h1". If true, it applies additional styles using the css helper.
const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;

      ${test}
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;

      ${test}
    `}
      ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;

      ${test}
    `}

      ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
      ${test}
    `}
  line-height:1.4 /* ${test} */
`;
Heading.defaultProps = {
  as: "h1",
};

export default Heading;
