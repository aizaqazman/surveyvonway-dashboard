'use server'

import { LoginRequest, sessionOptions, SessionData } from "@/components/types";
import { getIronSession } from "iron-session";
// import { getSession } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const users:LoginRequest[]=[
    {
        email: "aizaq@gmail.com",
        password: "12345",
        isAdmin: true,
    }
]

export const LoginUser = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prevState: any,
    formData: FormData
) => {

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions);

    const formEmail = formData.get("email") as string;
    const formPassword = formData.get("password") as string;

    //find user by email
    const user = users.find(
        (user) => user.email === formEmail && user.password === formPassword
    );

    if (!user) {
        console.log("User not found")
        return { success: false,message: "Wrong credentials"}
    }

    //set session properties
    session.userEmail = user.email;
    session.isAdmin = user.isAdmin;
    session.isLoggedIn = true;

    //persist the session
    await session.save();
    console.log("Session saved:", session);

    redirect("/dashboard")
};

