import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkin,
    isLoading: isCheckingIn,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    // this data is the value returned from the checkIn fn i.e the updateBooking
    onSuccess: (data) => {
      toast.success(
        `booking #${data.id} succesfully checked in`
      );
      queryClient.invalidateQueries("booking");

      navigate("/");
    },
    onError: (err) => {
      toast.error(
        "There was an error while checking in"
      );
    },
  });
  return { checkin, isCheckingIn };
}
