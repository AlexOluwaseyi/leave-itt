import prisma from "@/lib/prisma";
import { MockTeams } from "@/mock";

// Transform MockTeams to match the expected structure
const transformedMockTeams = MockTeams.map((team) => ({
  id: team.id,
  alias: team.alias,
  manager: null, // Use the actual manager data from MockTeams
  members: team.members || [],
  managerId: team.managerId,
}));

export async function getTeams() {
  try {
    const teams = await prisma.team.findMany({
      select: {
        id: true,
        alias: true,
        manager: true,
        members: {
          select: {
            id: true,
            username: true,
            role: true,
            status: true,
          },
        },
      },
    });

    teams.push(...transformedMockTeams);

    return teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw new Error("Failed to fetch teams");
  }
}

export async function getTeamById(id: string) {
  try {
    const team = await prisma.team.findUnique({
      where: { id },
      select: {
        id: true,
        alias: true,
        manager: true,
        members: {
          select: {
            id: true,
            username: true,
            role: true,
            status: true,
          },
        },
      },
    });
    return team ? [team] : [];
  } catch (error) {
    console.error("Error fetching team by ID:", error);
    throw new Error("Failed to fetch team by ID");
  }
}

export async function getTeamByManagerId(id: string) {
  try {
    const team = await prisma.team.findMany({
      where: { managerId: id },
      select: {
        id: true,
        alias: true,
        manager: true,
        members: {
          select: {
            id: true,
            username: true,
            role: true,
            status: true,
          },
        },
      },
    });

    // team.push(...transformedMockTeams.filter((team) => team.managerId === id));

    return team;
  } catch (error) {
    console.error("Error fetching team by ID:", error);
    throw new Error("Failed to fetch team by ID");
  }
}

export async function addTeam(data: { alias: string }) {
  try {
    const { alias } = data;
    const team = await prisma.team.create({
      data: {
        alias,
      },
    });
    return team;
  } catch (error) {
    console.error("Error creating team:", error);
    throw new Error("Failed to create team");
  }
}

export async function updateTeam(
  id: string,
  data: { alias?: string; managerId?: string }
) {
  try {
    const team = await prisma.team.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
    return team;
  } catch (error) {
    console.error("Error updating team:", error);
    throw new Error("Failed to update team");
  }
}
