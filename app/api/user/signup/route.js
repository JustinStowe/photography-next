import { NextResponse } from "next/server";
import { connect } from "@/lib/mongoose";
import User from "@/models/user";

import { createJWT } from "@/utilities/auth";

export default async function signIn(req, res) {
  if (req.method !== "POST") {
    return NextResponse.error(new Error("Method not allowed"), { status: 405 });
  }
  try {
    const { db } = await connect();
    const { email } = req.body;
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.error(
        new Error("User with this email already exists")
      );
    } else {
      const user = await User.create(req.body);
      const token = createJWT(user);
      return NextResponse.redirect("/", {
        status: 201,
        data: { user: user, token: token },
      });
    }
  } catch (error) {}
}
