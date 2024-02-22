import { useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({
  cabinToEdit = {},
  onCloseModal,
}) {
  const { id: editId, ...editValues } =
    cabinToEdit;
  console.log(editValues);
  // for creating a new cabin we dont need any defaultvalues,so we create a variable to check if its for editing cabin or for editing cabin
  // this logic is implemented in this way because for creating cabin no parameter will be passed and hence empty object will default value

  //and retrieving editId from {} will be undefined
  // Boolean of undefined is false
  const isEditSession = Boolean(editId);

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
  } = useForm({
    defaultValues: isEditSession
      ? editValues
      : {},
  });

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

  const { isCreating, createCabin } =
    useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  // const queryClient = useQueryClient();

  const isWorking = isEditing || isCreating;
  function onSubmit(data) {
    // onSuccess handler doesnt have to be passed only on the mutation hook,but it can also be passed onto the function where mutation happens i.e in the mutate function,here in this case we have renamed mutate to editCabin and createCabim
    // case1: editing without selecting image
    const image =
      typeof data.image === "string"
        ? data.image
        : data.image[0];
    if (isEditSession) {
      editCabin(
        {
          newCabinData: { ...data, image: image },
          id: editId,
        },
        {
          onSuccess: (data) => {
            console.log(data); //data after editing
            reset();
          },
        }
      );
    } else {
      createCabin(
        {
          ...data,
          image: image,
        },
        {
          onSuccess: (data) => {
            console.log(data); //data after editing
            reset();
            onCloseModal?.();
          },
        }
      );
    }
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
      type={onCloseModal ? "modal" : "regular"}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
            required: isEditSession
              ? false
              : "The field is required",
          })}
          disabled={isWorking}
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
        <Button disabled={isWorking}>
          {!isEditSession
            ? "Create New Cabin"
            : "Edit Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
