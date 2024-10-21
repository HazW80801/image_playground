"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/config/Supabase_Client";
import useUser from "@/utils/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const [user] = useUser()
    const router = useRouter()
    if (user == "no user") router.replace("/signin")
    const signOut = async () => {
        await supabase.auth.signOut()
        router.replace("/signin")
    }

    return (
        <div className="bg-black w-full border-b border-white/5 py-4
        px-4 items-center justify-between flex space-x-2">
            <Link href="/dashboard" prefetch className="link">Image
                <b className="text-yellow-400 font-mono pl-1">Playground_</b></Link>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {user !== "no user" &&
                        <div className="flex space-x-2 items-center justify-center">
                            <img className="rounded-full h-6 w-6 self-center"
                                src={user?.user_metadata.picture} alt={user?.user_metadata.name} />
                            <p className="label text-white">{user?.user_metadata.name}</p>
                        </div>
                    }
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black text-white
                 border-white border-white/10">
                    <Link href={"/dashboard"} >
                        <DropdownMenuItem className="dropmenu_item">
                            dashboard
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/usage"} >

                        <DropdownMenuItem className="dropmenu_item">
                            usage
                        </DropdownMenuItem>
                    </Link>
                    <Link href={"/plans"} >
                        <DropdownMenuItem className="dropmenu_item">
                            plans
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="dropmenu_item" onClick={signOut}>logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}