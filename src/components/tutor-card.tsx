"use client";

import Image from "next/image";
import { toast } from "sonner";

export function TutorCard() {
  // Function to handle button click
  function handleButtonClick(choice: string) {
    document.getElementById("tutorCard")?.remove();
    // TODO
    if (choice === '✓') {
      toast.error("You accepted");
      
    } else {
      toast.error("You declined")
    }
  };

  // Function to handle profile picture click
  function handleProfileClick() {
    // TODO
    toast.error("A full profile view would be shown");

  };

  return (
  <div
    className="max-w-md bg-white rounded-2xl space-y-6 shadow-xl border-1 border-gray-100 relative"
    id = "tutorCard"
  >
    {/* Profile Picture (Button) */}
    <button
      className="h-90 rounded-t-2xl"
      onClick={handleProfileClick}
      style={{transition: "filter 0.3s"}}
      onMouseOver={(e) => {e.currentTarget.style.filter = "brightness(0.8)"}} // on hover event handler
      onMouseOut={(e) => {e.currentTarget.style.filter = "brightness(1)"}} // on non-hover event handler
    >
      <Image
        alt="John Cena's profile picture"
        src="/bingbing.png"
        className="rounded-t-xl"
        height="720"
        width="720"
      />
      <div
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 z-10"
      >
        View profile
      </div>
    </button>
    {/* Profile Information */}
    <div className="flex flex-col space-y-4 pl-8 pb-4">
      <p className="text-4xl">
        <span className="font-bold">John Cena</span>
      </p>
      <div className="flex flex-col items-start sm:flex-row sm:items-center ">
        <p className="text-2xl mr-4">$22/hr</p>
        <div className="bg-orange-500 rounded-lg p-2">
          <p className="text-white text-xl">ATH*3210</p>
        </div>
      </div>
      <p className="text-2xl text-gray-600">📍Massachusetts</p>
    </div>
    {/* Accept/Decline Buttons */}
    <div className="flex justify-center space-x-5 relative z-10 pb-8 sm:space-x-20">
      <button
        className={
          "rounded-full bg-red-500 text-white items-center justify-center font-bold text-4xl " +
          "transition-colors duration-200 hover:bg-red-600 " +
          "w-24 h-24"
        }
        onClick={() => handleButtonClick("X")} // on click event handler
      >
        X
      </button>
      <button
        className={
          "rounded-full bg-green-500 text-white items-center justify-center font-bold text-4xl " +
          "transition-colors duration-200 hover:bg-green-600 " +
          "w-24 h-24"
        }
        onClick={() => handleButtonClick("✓")} // on click event handler
      >
        ✓
      </button>
    </div>
    {/* Background behind buttons */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-100 rounded-b-xl z-0"></div>
  </div>
  );
}