import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, password } = await req.json();

    try {
        if (email === "" || password === "") {
            return NextResponse.json({ message: "Email i lozinka su obavezni" }, { status: 400 });
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        });
        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 });
    }
}