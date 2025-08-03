import prisma from "@/lib/prisma";

export async function getTeams() {
  try {
    const teams = await prisma.team.findMany({
      select: {
        id: true,
        alias: true,
        manager: {
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
          },
        },
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

export async function deleteTeam(id: string) {
  try {
    const team = await prisma.team.delete({
      where: { id },
    });
    return team;
  } catch (error) {
    console.error("Error deleting team:", error);
    throw new Error("Failed to delete team");
  }
}
