import { NextResponse, NextRequest } from "next/server";
import { getTeams, addTeam, getTeamByManagerId } from "@/lib/teams";


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || "";
    const role = searchParams.get('role') || "";

    let teams;

    if (id && role === 'manager') {
      teams = await getTeamByManagerId(id);
    } else {
      teams = await getTeams(); // fallback to fetch all teams
    }

    return NextResponse.json({ teams, count: teams.length }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const { alias } = body;

    // Basic validation
    if (!alias) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const team = await addTeam({ alias });

    return NextResponse.json({ message: "Team created successfully.", team }, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
  }
}
