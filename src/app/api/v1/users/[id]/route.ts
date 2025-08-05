import { NextRequest, NextResponse } from "next/server";
import { getUserById, updateUser, deactivateUser, reactivateUser, deleteUser } from "@/lib/users";


export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "User ID not provided." },
        { status: 400 }
      );
    }

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { message: `User with ID ${id} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "User found", user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}

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

    const { name, username, role, status, teamId, managerId } = body;

    if (status) {
      if (status === "INACTIVE") {
        const deactivatedUser = await deactivateUser(id);
        return NextResponse.json(
          { message: "User deactivated successfully", user: deactivatedUser },
          { status: 200 }
        );
      } else if (status === "ACTIVE") {
        const activatedUser = await reactivateUser(id);
        return NextResponse.json({ message: "User reactivated successfully", user: activatedUser }, { status: 200 });
      }
    }

    // You'll need to import updateUser from your users lib
    const updatedUser = await updateUser(id, {
      name,
      username,
      role,
      teamId,
      managerId,
    });

    return NextResponse.json(
      { message: "User updated successfully", updatedUser },
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

export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json(
        { message: `User with ID ${id} not found.` },
        { status: 404 }
      );
    }

    // Assuming you have a deleteUser function in your users lib
    const deletedUser = await deleteUser(id);

    return NextResponse.json(
      { message: "User deleted successfully", user: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: `${error}` },
      { status: 500 }
    );
  }
}