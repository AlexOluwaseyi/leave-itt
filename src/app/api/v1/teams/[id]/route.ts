import { NextRequest, NextResponse } from "next/server";
import { getTeamById, updateTeam, deleteTeam } from "@/lib/teams";

export async function GET(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID is required." },
        { status: 400 }
      );
    }

    const team = await getTeamById(id);

    if (!team) {
      return NextResponse.json(
        { message: `Team with ID ${id} not found.` },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Team found", team }, { status: 200 });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { message: "Failed to fetch team" },
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

    const { alias, managerId } = body;

    if (!alias && !managerId) {
      return NextResponse.json(
        { message: "Alias or Manager ID is required." },
        { status: 400 }
      );
    }

    const updatedTeam = await updateTeam(id, { alias, managerId });

    return NextResponse.json(
      { message: "Team updated successfully", team: updatedTeam },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating team:", error);
    return NextResponse.json(
      { message: "Failed to update team" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID is required." },
        { status: 400 }
      );
    }

    const team = await deleteTeam(id);

    return NextResponse.json(
      { message: "Team deleted successfully", team },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { message: "Failed to delete team" },
      { status: 500 }
    );
  }
}