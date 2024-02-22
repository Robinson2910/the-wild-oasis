import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // mutation fn will basically update the database
  //then the query state is invalidated on succesfully updating data base
  //so that it refetched the data again
  const {
    mutate: updateSetting,
    isLoading: isUpdating,
  } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("setting succesfully edited");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => {
      toast.error("Failed to edit new cabin");
    },
  });
  return { isUpdating, updateSetting };
}
