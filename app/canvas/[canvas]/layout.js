"use client"
import { Inter } from "next/font/google";
import "../../globals.css";
import { redirect, useRouter } from "next/navigation";
import useUser from "@/utils/useUser";
import { supabase } from "@/config/Supabase_Client";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    const [user] = useUser();
    const router = useRouter()
    if (user == "no user") router.replace("/signin")
    const checkUserCanvas = async () => {
        const { data, error } = await supabase.from("canvas").select().eq("user_id", user?.id)
        if (data.length == 0) {
            router.replace("/dashboard")
        }
    }
    useEffect(() => {
        if (!supabase || !user) return
        checkUserCanvas()
    }, [supabase, user])

    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
