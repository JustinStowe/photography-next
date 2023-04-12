import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { createJWT } from "@/utilities/auth";

export default async function login(req, res) {
  if (req.method !== "POST") {
    return NextResponse.error(new Error("Method not allowed"), { status: 405 });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return NextResponse.error(new Error("Email and password are required"), {
      status: 400,
    });
  }
  try {
    const { db } = await connect();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.error(new Error("invalid credentials"), {
        status: 401,
      });
    }
    const hashPassword = await bcrypt.hash(password, 6);
    const passwordMatch = await bcrypt.compare(
      hashPassword,
      existingUser.password
    );
    if (!passwordMatch) {
      return NextResponse.error(new Error("invalid credentials "), {
        status: 401,
      });
    }
    const token = createJWT(user);
    return NextResponse.redirect("/", {
      status: 302,
      data: { user: user, token: token },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
