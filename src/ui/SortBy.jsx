import { useSearchParams } from "react-router-dom";
import Select from "./Select";

{
  /* this sort by component will provide a dropdown menu with options we provide
      and onClicking that option query parameter will be set, and that query paramter  will be read from CabinTAble and from there we can sort it accordingly */
}
function SortBy({ options }) {
  const [searchParams, setSearchParams] =
    useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
