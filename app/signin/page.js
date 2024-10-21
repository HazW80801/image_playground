"use client"

import { supabase } from "@/config/Supabase_Client"

export default function SignInPage() {
    const signInUser = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
    }
    return (
        <div className="min-h-[100vh] bg-black flex
         items-center justify-center w-full p-12 ">
            <button onClick={signInUser} className="button">signIn with google</button>
        </div>
    )
}