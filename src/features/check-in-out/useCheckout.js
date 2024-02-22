import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckout() {
  const queryClient = useQueryClient();

  const {
    mutate: checkout,
    isLoading: isCheckingOut,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    // this data is the value returned from the checkIn fn i.e the updateBooking
    onSuccess: (data) => {
      toast.success(
        `booking #${data.id} succesfully checked out`
      );
      queryClient.invalidateQueries("booking");
    },
    onError: (err) => {
      toast.error(
        "There was an error while checking out"
      );
    },
  });
  return { checkout, isCheckingOut };
}
