"use client";
import { useState } from "react";
import { updateGuest } from "../_lib/actions";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";
import SubmitButton from "./submitButton";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();
  const { fullName, email, nationality, nationalId, countryFlag } = guest;
  // we cant simply put this inside form , have to put it inside something that is put inside the form.
  // useFormStatus();
  return (
    <div>
      <form
        action={updateGuest}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            defaultValue={fullName}
            name="fullName"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            name="email"
            disabled
            defaultValue={email}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            {countryFlag && (
              <img
                src={countryFlag}
                alt="Country flag"
                className="h-5 rounded-sm"
              />
            )}
          </div>
          {children}
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalId">National ID number</label>
          <input
            name="nationalId" // ✅ matches server + DB
            defaultValue={nationalId}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <SubmitButton>Update Profile</SubmitButton>
          
        </div>
      </form>
    </div>
  );
}


export default UpdateProfileForm;
