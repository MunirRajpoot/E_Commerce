"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"  // ✅ named import (not default)

export default function LoginPage() {
    const router = useRouter() // ✅ works in App Router
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const { data, error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (loginError) throw loginError

            alert("Login successful!")
            router.push("/") // ✅ redirect after login
        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Login</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border p-2 rounded"
                    autoComplete="current-password"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}
