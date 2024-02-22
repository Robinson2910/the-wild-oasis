import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinTableOperation() {
  return (
    <TableOperations>
      {/* this filter component will place the buttons based on options we pass,
      and query parameters will be passed with field name,and the value of button that is clicked,  and then that query parameter can be read from cabin table and based on that we can filter it */}
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          {
            value: "no-discount",
            label: "No discount",
          },
          {
            value: "with-discount",
            label: "With Discount",
          },
        ]}
      />
      {/* this sort by component will provide a dropdown menu with options we provide
      and onClicking that option query parameter will be set, and that query paramter  will be read from CabinTAble and from there we can sort it accordingly */}
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by name (A-Z)",
          },
          {
            value: "name-desc",
            label: "Sort by name (Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by price(low first)",
          },
          {
            value: "regularPrice-desc",
            label: "Sort by price(high first)",
          },
          {
            value: "maxCapcity-asc",
            label: "Sort by capacity (low first)",
          },
          {
            value: "maxCapcity-desc",
            label:
              "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperation;
