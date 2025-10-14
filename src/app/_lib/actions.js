"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";
// if we are using the bind , the formdata must come as the last argument
export async function createBooking(bookingData,formData)
{
    const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const newBooking= {...bookingData,guestId:session.user.guestId, numGuests:Number(formData.get("numGuests")),observations:formData.get("observations").slice(0,1000),extrasPrice:0,totalPrice:bookingData.cabinPrice,
    isPaid:false,
    hasBreakfast:false,
    status: "unconfirmed",
  }
  const { error } = await supabase
    .from('bookings')
    .insert([newBooking])
    
  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/account/reservations");
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // console.log("🟢 Full session object:", session);

  const nationalId = formData.get("nationalId");
  const nationalityValue = formData.get("nationality");

  const [nationality, countryFlag] = nationalityValue
    ? nationalityValue.split("%")
    : [null, null];

  const regex = /^[A-Za-z0-9]{6,12}$/;
  if (!regex.test(nationalId)) {
    throw new Error("National ID must be 6–12 alphanumeric characters.");
  }

  const updateData = { nationality, countryFlag, nationalId };

  // ✅ Now guestId will always be available
  const guestId = session.user.guestId;
  if (!guestId) throw new Error("No guest ID found in session");

  // console.log("🟡 Attempting update with:", { guestId, updateData });

  const {  error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", guestId)
    .select();

  // console.log("🔎 Supabase response:", { data, error });

  if (error) throw new Error(`Guest could not be updated: ${error.message}`);
  // manual revalidation for fresh data
  revalidatePath("/account/profile");
  // revalidateTag("guests");
  
}
export async function deleteReservation(bookingId)
{
  // right now by only this any malacious user can use the network tab and from their can delet any bookings so we have to protect it

  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // making it safe
  const guestBookings= await getBookings(session.user.guestId);
  const  guestBookingIds= guestBookings.map((booking)=>booking.id);
  if(!guestBookingIds.includes(bookingId))
  {

    throw new Error("you are not allowed to delete this reservation");
  }
  const {  error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath("/account/reservations"); 

}
export async function updateBooking(formData)
{  const bookingId= Number(formData.get("bookingId"));
  // console.log(formData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  // making it safe
  const guestBookings= await getBookings(session.user.guestId);
  const  guestBookingIds= guestBookings.map((booking)=>booking.id);
  if(!guestBookingIds.includes(bookingId))
  {

    throw new Error("you are not allowed to update this reservation");
  }
  const updateData= {numGuests:Number(formData.get("numGuests")),
    observations:formData.get("observations").slice(0,1000),
  };
  
  const { error } = await supabase
    .from('bookings')
    .update(updateData)
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  // revalidation always must happen before redirection
  revalidatePath("/account/reservations"); 
  revalidatePath(`/account/reservations/edit/${bookingId}`); 


  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
