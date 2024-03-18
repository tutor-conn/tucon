"use client";

import Image from "next/image";
import { toast } from "sonner";

export function TutorCard() {
  // Function to handle button click
  function handleButtonClick(choice: string) {
    document.getElementById("tutorCard")?.remove();
    // TODO
    if (choice === "✓") {
      toast.error("You accepted");
    } else {
      toast.error("You declined");
    }
  }

  // Function to handle profile picture click
  function handleProfileClick() {
    // TODO
    toast.error("A full profile view would be shown");
  }

  return (
    <div
      className="relative max-w-md space-y-6 rounded-2xl border-1 border-gray-100 bg-white shadow-xl"
      id="tutorCard"
    >
      {/* Profile Picture (Button) */}
      <button
        className="h-90 rounded-t-2xl"
        onClick={handleProfileClick}
        style={{ transition: "filter 0.3s" }}
        onMouseOver={(e) => {
          e.currentTarget.style.filter = "brightness(0.8)";
        }} // on hover event handler
        onMouseOut={(e) => {
          e.currentTarget.style.filter = "brightness(1)";
        }} // on non-hover event handler
      >
        <Image
          alt="John Cena's profile picture"
          src="/bingbing.png"
          className="rounded-t-xl"
          height="720"
          width="720"
        />
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center text-2xl text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
          View profile
        </div>
      </button>
      {/* Profile Information */}
      <div className="flex flex-col space-y-4 pb-4 pl-8">
        <p className="text-4xl">
          <span className="font-bold">John Cena</span>
        </p>
        <div className="flex flex-col items-start sm:flex-row sm:items-center ">
          <p className="mr-4 text-2xl">$22/hr</p>
          <div className="rounded-lg bg-orange-500 p-2">
            <p className="text-xl text-white">ATH*3210</p>
          </div>
        </div>
        <p className="text-2xl text-gray-600">📍Massachusetts</p>
      </div>
      {/* Accept/Decline Buttons */}
      <div className="relative z-10 flex justify-center space-x-5 pb-8 sm:space-x-20">
        <button
          className={
            "items-center justify-center rounded-full bg-red-500 text-4xl font-bold text-white " +
            "transition-colors duration-200 hover:bg-red-600 " +
            "h-24 w-24"
          }
          onClick={() => handleButtonClick("X")} // on click event handler
        >
          X
        </button>
        <button
          className={
            "items-center justify-center rounded-full bg-green-500 text-4xl font-bold text-white " +
            "transition-colors duration-200 hover:bg-green-600 " +
            "h-24 w-24"
          }
          onClick={() => handleButtonClick("✓")} // on click event handler
        >
          ✓
        </button>
      </div>
      {/* Background behind buttons */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-20 rounded-b-xl bg-gray-100"></div>
    </div>
  );
}
