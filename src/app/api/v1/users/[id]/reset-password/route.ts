import { NextRequest, NextResponse } from "next/server";
import { updateUserPassword } from "@/lib/users";

export async function PUT(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { message: "Data not sent in request." },
        { status: 400 }
      );
    }

    const { oldPassword, newPassword } = body;

    if (!oldPassword && !newPassword) {
      return NextResponse.json(
        { message: "Old password and new password are required." },
        { status: 400 }
      );
    }

    const updatedUser = await updateUserPassword(id, oldPassword, newPassword);
    return NextResponse.json(
      { message: "Password updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}

