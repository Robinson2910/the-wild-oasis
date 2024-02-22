import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
export async function getBookings({
  filter,
  sortBy,
  page,
}) {
  // .eq => equal to ,in that we need to specify the field and value
  //and based on that rows will be retrieved from the table

  //gte =>greater than or equal to,and based on that rows will be retrieved from the table
  // passign second argument with count's value as exact
  //when we await the query now,we will get an object with count ,data ,error
  let query = supabase
    .from("bookings")
    .select(
      "id,created_at,startDate,endDate,numNights,numGuests,status,totalPrice,cabins(name),guests(fullName,email)",
      { count: "exact" }
    );
  //filter
  if (filter) {
    query = query[filter.method || "eq"](
      filter.field,
      filter.value
    );
  }

  //sort

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;

    const to = page * PAGE_SIZE - 1;
    query = query.range(from, to); //zero based
  }
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not be loaded"
    );
  }
  return { data, count };
}
export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not get loaded"
    );
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not get loaded"
    );
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "*, guests(fullName, nationality, countryFlag)"
    )
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error(
      "Bookings could not get loaded"
    );
  }
  return data;
}

// export async function updateBooking(id, obj) {
// //   console.log("hello", id, obj);
// //   const { data, error } = await supabase
// //     .from("bookings")
// //     .update(obj)
// //     .eq("id", id)
// //     .select();

// //   return data;
// // }

export async function updateBooking(id, obj) {
  console.log(id, obj);
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      "Booking could not be updated"
    );
  }

  // Supabase `update` method doesn't return the updated data by default,
  // so you may need to fetch the updated data separately.
  const updatedData = await supabase
    .from("bookings")
    .select()
    .eq("id", id)
    .single();

  if (updatedData.error) {
    console.error(updatedData.error);
    throw new Error(
      "Error fetching updated booking data"
    );
  }
  console.log(updatedData.data);
  return updatedData.data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(
      "Booking could not be deleted"
    );
  }
  return data;
}
