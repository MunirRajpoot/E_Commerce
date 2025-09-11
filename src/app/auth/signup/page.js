"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SignupPage() {
    const router = useRouter()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            // 1. Create user account
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            })

            if (authError) throw authError

            const user = authData.user
            if (!user) throw new Error("User not created")

            // 2. Insert profile row with full_name
            const { error: profileError } = await supabase.from("profiles").insert([
                {
                    id: user.id,
                    full_name: fullName,
                },
            ])

            if (profileError) throw profileError

            alert("Signup successful! Please check your email to confirm.")
            router.push("/auth/login")
        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    )
}
