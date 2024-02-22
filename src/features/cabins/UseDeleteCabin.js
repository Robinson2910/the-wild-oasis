import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
export function UseDeleteCabin() {
  //spl hooke to get acces to the queryClient
  const queryClient = useQueryClient();

  // mutate is the callback fn which is returned from useMutation,it is same fn as mutationfn we defined as a property inside useMutation
  //it can be coonnected to buttons
  //so that when clicked,it will mutate the table

  // so basically on Succes onSucces fn will be called
  //on error the error fn will be called

  // think of it as **************important quick note*********

  //  hook which can be used to mutate data
  // so the hook basically takes in a mutation fn,OnSuccess fn ,OnError fn as parameters
  // if there is any error while executing mutation fn,onError will be called

  //or else onSuccess will be called
  const {
    isLoading: isDeleting,
    mutate: deleteCabin,
  } = useMutation({
    mutationFn: deleteCabinApi,
    // Invalidate the cache for the "cabins" query after successful deletion
    onSuccess: () => {
      toast.success("cabin successfull deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // onSuccess tells react query what to do as soon as mutation is successfull
    //in this situation basically we need to refetch data

    //we do this in react query by invalidating the cache

    //we can invalidateQueries
    onError: (err) => toast.error(err.message),
    //onError handler receives the error which was thrown during mutation fn was executed as argument object
  });
  return { isDeleting, deleteCabin };
}
