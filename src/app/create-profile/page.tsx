"use client";

import { AuthBox } from "@/components/auth-box";
import { Anchor } from "@/components/ui/anchor";
import { Button } from "@/components/ui/button";

export default function SelectProfileType() {
    return (
        <AuthBox>
            <div className="text-center p-3">
              <h1 className="text-3xl font-bold p-2">Create a Profile</h1>

              <p className="text-gray-500">Are you a Student or a Tutor?</p>
            </div>

            <span className="inline-flex p-6 w-full items-center">
                <Anchor href="/create-profile/student">
                    <Button
                        className="w-40 mr-3"
                        type="button"
                        // disabled if user is not signed into an account
                        // (could happen if they manually navigate to /create-profile) ?
                    >
                        Student
                    </Button>
                </Anchor>
                
                <Anchor href="/create-profile/tutor">
                    <Button
                        className="w-40"
                        type="button"
                        // disabled if user is not signed into an account
                        // (could happen if they manually navigate to /create-profile) ?
                    >
                        Tutor
                    </Button>
                </Anchor>
            </span>
        </AuthBox>
    )
}