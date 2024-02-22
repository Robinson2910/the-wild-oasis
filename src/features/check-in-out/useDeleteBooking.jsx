import {
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const {
    isDeleting,
    data,
    mutate: deleteBookingMutate,
  } = useMutation({
    mutationFn: (bookingId) =>
      deleteBooking(bookingId),
    onSuccess: () => {
      toast.success(
        "booking succesfully deleted"
      );
      queryClient.invalidateQueries("bookings");
    },
    onError: (err) =>
      toast.error("Booking could not be deleted"),
  });

  return {
    isDeleting,
    deleteBookingMutate,
    data,
  };
}
