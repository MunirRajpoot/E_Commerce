"use client"
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
    const { user } = useUser();

    if (!user) {
        return <p className="p-6">Please Login to see your profiles</p>
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profiles</h1>
            <p className="mb-2"><strong>Email:</strong>{user.email}</p>
            <p><strong>Joined:</strong>{new Date(user.created_at).toDateString()}</p>
        </div>
    )
}