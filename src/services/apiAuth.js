import supabase from "./supabase";
export async function Login({ email, password }) {
  let { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}

//user might want to access the page later ,not only after they have logged in

export async function getCurrentUser() {
  //check whether there is a active session
  const { data: session } =
    await supabase.auth.getSession();

  //=> there is no current user
  if (!session.session) return null;

  //if there is current user, we can get user from supabase
  const { data, error } =
    await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
