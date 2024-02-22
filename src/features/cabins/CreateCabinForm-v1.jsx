import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
  // this hook will return few fns one is register and other one is handleSubmit,reset,getValues

  // getValues gets all values from entired form as an object
  // but using name of the field we can extract for each field

  // from formState object we can extract errors object using errors property
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm();

  const { errors } = formState;
  console.log(errors);
  // how to use react hook
  // step 1 :So always the first step is to register all the input fields
  // that we actually want React hook form, to handle.

  // step2:And then the second part is to specify

  // the on submit form in the from.

  // then we are going to call that handle submit function that we also received from use form by passing a new fn

  // that we want to be called whenever the form is submitted.

  // So when onSubmit,handleSubmit will call onSubmit function by passing the form related data as argument,
  // then using that we can push it to db

  //it will be passed on by handleSubmit fn into the on submit

  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } =
    useMutation({
      mutationFn: createCabin,
      onSuccess: () => {
        toast.success(
          "New cabin successfully created"
        );
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        reset();
      },
      onError: (err) => {
        toast.error("Failed to create new cabin");
      },
    });

  function onSubmit(data) {
    // console.log(data);
    mutate({ ...data, image: data.image[0] });
  }
  // if there is one Error in validations(validation fails)
  //handle submit will call not call onSubmit fn
  // but instead calls the seconds function by passing errors as an argument
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
            min: {
              value: 1,
              message:
                "Capcity should be at least one",
            },
          })}
          disabled={isCreating}
        />
      </FormRow>

      {/* Convert the rest of the FormRows like the first one */}
      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "The field is required",
          })}
          disabled={isCreating}
        />
      </FormRow>

      {/* Leave the last FormRow unchanged */}
      <FormRow>
        <Button
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
