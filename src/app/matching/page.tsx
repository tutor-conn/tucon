"use client"; //for the event handlers
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

let tutors = [
  {
    profilePicture: "/tutor3.jpg",
    altText: "Elaine's profile picture",
    name: "Elaine",
    payRate: "16",
    course: "SART*2710",
    city: "Guelph",
  },
  {
    profilePicture: "/tutor2.jpg",
    altText: "Janelle's profile picture",
    name: "Janelle",
    payRate: "22",
    course: "MUSC*2220",
    city: "Toronto",
  },
  {
    profilePicture: "/tutor4.png",
    altText: "Bartholomew's profile picture",
    name: "Bartholomew",
    payRate: "34",
    course: "HIST*2260",
    city: "Oakville",
  },
  {
    profilePicture: "/tutor5.png",
    altText: "Brody's profile picture",
    name: "Brody",
    payRate: "53",
    course: "ATH*3210",
    city: "Waterloo",
  },
  {
    profilePicture: "/tutor1.jpg",
    altText: "Peter's profile picture",
    name: "Peter",
    payRate: "26",
    course: "PHIL*3390",
    city: "London",
  },
  {
    profilePicture: "/tutor6.png",
    altText: "Celine's profile picture",
    name: "Celine",
    payRate: "17",
    course: "ENG*2130",
    city: "Mississauga",
  },
];
// Tutor data: elaine janelle bartholomew brody peter celine

export default function MatchingPage() {
  const [tutorCount, setTutorCount] = useState(0);
  const router = useRouter();

  // Get the current tutor based on tutorCount
  const currentTutor = tutors[tutorCount];

  // Function to handle button click
  function handleButtonClick(choice: string) {
    if (choice === "✓") {
      toast.error(
        "You accepted this tutor. They have been notified, please be patient for a response.",
      );
    } else {
      toast.error("You declined this tutor.");
    }
    // Move to the next tutor
    setTutorCount((prevCount) => prevCount + 1);
  }

  // Function to handle refresh button click
  function handleRefreshClick() {
    setTutorCount(0); // Set tutorCount to 0
    tutors = shuffleArray(tutors);
  }

  // Function to shuffle array using Fisher-Yates shuffle algorithm on geeks for geeks
  function shuffleArray<t>(array: t[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to handle profile picture click
  function handleProfileClick() {
    router.push("/view-profile");
  }

  function renderTutorCardContent(
    tutorCount: number,
    handleProfileClick: () => void,
    handleButtonClick: (choice: string) => void,
  ) {
    if (tutorCount < 6) {
      // Render content for tutor card when tutorCount is greater than 0
      return (
        <>
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
              alt={currentTutor.altText}
              src={currentTutor.profilePicture}
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
              <span className="font-bold">{currentTutor.name}</span>
            </p>
            <div className="flex flex-col items-start sm:flex-row sm:items-center ">
              <p className="mr-4 text-2xl">{`$${currentTutor.payRate}/hr`}</p>
              <div className="rounded-lg bg-orange-500 p-2">
                <p className="text-xl text-white">{currentTutor.course}</p>
              </div>
            </div>
            <p className="text-2xl text-gray-600">📍{currentTutor.city}</p>
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
        </>
      );
    } else {
      // Render message when tutorCount is 0
      return (
        <div className="flex h-full items-center justify-center p-8">
          {/* Refresh card content */}
          <div className="text-center">
            <p className="text-2xl font-semibold">
              Looks like you&apos;ve reached the end.
            </p>
            <p className="text-xl">Click to refresh and see more tutors.</p>
            <button
              className="mt-6 rounded-lg bg-orange-500 px-6 py-3 text-2xl font-bold text-white hover:bg-orange-700"
              onClick={handleRefreshClick}
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar message={"isStudent"} />
      <main className="flex-1">
        <section className="pt-8">
          <div className="flex justify-center">
            {/* Card */}
            <div
              className="relative max-w-md space-y-6 rounded-2xl border-1 border-gray-100 bg-white shadow-xl"
              id="tutorCard"
              style={{ height: "800px" }} // Set fixed dimensions for the card
            >
              {/* Card contents */}
              {renderTutorCardContent(
                tutorCount,
                handleProfileClick,
                handleButtonClick,
              )}
            </div>{" "}
            {/* end card */}
          </div>
        </section>
      </main>
    </div>
  );
}
