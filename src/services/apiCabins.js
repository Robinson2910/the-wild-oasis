import supabase, {
  supabaseUrl,
} from "./supabase";

export async function createEditCabin(
  newCabin,
  id
) {
  console.log(newCabin, id);
  const hasImagePath =
    newCabin.image?.startsWith?.(supabaseUrl);
  // https://kqidpyhldqypibzamslb.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // name of image file along with some random values
  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1.create/edit cabin

  let query = supabase.from("cabins");

  // A) create
  if (!id) {
    query = query.insert([
      { ...newCabin, image: imagePath },
    ]);
  }
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query
    .select()
    .single();
  if (error) {
    throw new Error("Cabin could not be created");
  }

  //2 upload image
  if (hasImagePath) return data;
  const { error: storageError } =
    await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

  //3.prevent new cabin from created if there was and error uploading the image
  if (storageError) {
    // delete cabin created with error in image
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);

    throw new Error(
      "cabins image could not be  uploaded"
    );
  }

  return data;
}

export async function getCabins() {
  let { data, error } = await supabase
    .from("cabins")
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(
      "cabins could not be deleted"
    );
  }
  return data;
}
