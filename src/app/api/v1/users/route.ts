import { NextResponse, NextRequest } from "next/server";
import { getUsers, getUserbyTeam, addUser, importBulkUsers } from "@/lib/users";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || "";
    const role = searchParams.get('role') || "";

    let users;
    console.log("ID: ", id, "Role: ", role);

    if (id && role === 'manager') {
      users = await getUserbyTeam(id);
    } else {
      users = await getUsers(); // fallback to fetch all users
    }

    return NextResponse.json({ users, count: users.length }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    //Check content type: JSON or CSV
    const contentType = request.headers.get("content-type");

    // Handle bulk CSV import
    if (contentType?.includes("text/csv")) {
      const csvData = await request.text(); // raw text
      const createdUsers = await importBulkUsers(csvData);

      return NextResponse.json(
        { message: "Bulk import successful", users: createdUsers },
        { status: 201 }
      );
    }

    // Handle single user creation
    const body = await request.json();
    const { name, username, password, role, status, teamId, managerId } = body;

    // Basic validation
    if (!name || !username || !password || !role || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await addUser({
      name,
      username,
      password,
      role,
      status,
      teamId,
      managerId,
    });

    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}