"use client"
import useUser from "@/utils/useUser";
import Header from "../(comps)/Header";
import { useRouter } from "next/navigation";
import { supabase } from "@/config/Supabase_Client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';


export default function DashboardPage() {
    const [user] = useUser()
    const router = useRouter()
    const id = uuidv4()
    const createNewCanvas = async () => {
        await supabase.from("canvas")
            .insert([{ canvas_id: id, user_id: user.id }]).select()
        router.replace(`/canvas/${id}`)
    }
    const [canvasItems, setCanvasItems] = useState([])
    const fetchCanvas = async () => {
        const { data, error } =
            await supabase.from("canvas").select()
                .eq("user_id", user?.id).order("created_at", { ascending: false })
        setCanvasItems(data)
    }
    useEffect(() => {
        if (!user || !supabase) return;
        fetchCanvas()
    }, [supabase, user])
    if (user == "no user") router.replace("/signin")

    return (
        <div className="bg-black min-h-screen w-full items-center 
        justify-start flex flex-col">
            <Header />
            <div className="w-full items-center justify-end py-4 flex px-6 mt-4">
                <button className="text-white/80 text-md smooth hover:text-white"
                    onClick={createNewCanvas}> + new canvas</button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 w-full py-12 px-6 gap-6 
            lg:w-[90%]">
                {canvasItems.map((item, i) => (
                    <Link key={item.id} href={`/canvas/${item.canvas_id}`}
                        className="py-12 px-6 border border-white/10 text-white
                         bg-[#050505] rounded-md smooth hover:border-white/30" >
                        <div className="">
                            canvas-{i + 1}
                        </div>
                    </Link>

                ))}
            </div>

        </div>
    )
}