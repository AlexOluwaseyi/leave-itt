import prisma from "@/lib/prisma";
import { Users, CreateUserData } from "@/types";
import bcrypt from "bcryptjs";
import { auth } from "~/auth.config";

export async function getUsers() {
  try {
    // Get all users from db using prisma
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: {
            alias: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch users"
    );
  }
}

export async function getUserbyTeam(id: string) {
  try {
    if (!id) {
      throw new Error("ID (team or manager) not provided.");
    }

    const teamMembers = await prisma.user.findMany({
      where: { managerId: id },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: { alias: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    return teamMembers;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch team members"
    );
  }
}

export async function updateUser(userId: string, userData: Partial<Users>) {
  try {
    // Find user if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }
    // If password is being updated, hash it
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(userData.name && { name: userData.name }),
        ...(userData.username && { username: userData.username }),
        ...(userData.role && { role: userData.role }),
        ...(userData.status && { status: userData.status }),
        ...(userData.password && { password: userData.password }),
        ...(userData.teamId !== undefined && { teamId: userData.teamId }),
        ...(userData.managerId !== undefined && {
          managerId: userData.managerId,
        }),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: {
            alias: true,
          },
        },
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update user"
    );
  }
}

export async function updateUserPassword(
  userId: string,
  oldPassword: string,
  newPassword: string
) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // find user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found.");
    }

    // Check current password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect.");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword, updatedAt: new Date() },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: {
            alias: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return updatedUser;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to update user password"
    );
  }
}

export async function deactivateUser(userId: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error("No user session found.");
    }

    const { id } = session.user;

    if (id === userId) {
      throw new Error("You cannot deactivate your own account.");
    }

    const deactivatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: "INACTIVE", updatedAt: new Date() },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return deactivatedUser;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to deactivate user"
    );
  }
}

export async function deleteUser(userId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return deletedUser;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete user"
    );
  }
}

export async function reactivateUser(userId: string) {
  try {
    const activatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status: "ACTIVE", updatedAt: new Date() },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return activatedUser;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to reactivate user"
    );
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: {
            alias: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch user"
    );
  }
}

export async function getTotalUsersCount() {
  try {
    const totalUsersCount = await prisma.user.count();
    return totalUsersCount;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch total users count"
    );
  }
}

export async function getActiveUsersCount() {
  try {
    const activeUsersCount = await prisma.user.count({
      where: { status: "ACTIVE" },
    });
    return activeUsersCount;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch active users count"
    );
  }
}

export async function getInactiveUsersCount() {
  try {
    const inactiveUsersCount = await prisma.user.count({
      where: { status: "INACTIVE" },
    });
    return inactiveUsersCount;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to fetch inactive users count"
    );
  }
}

// For sign-in and authentication
export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: {
            alias: true,
          },
        },
        createdAt: true,
        updatedAt: true,
        password: true, // Included for authentication
      },
    });
    return user;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch user"
    );
  }
}

// Add users - single user or multiple users from CSV
export async function addUser(userData: CreateUserData) {
  try {
    // Get manager ID from session
    const session = await auth();

    if (!session || !session.user) {
      throw new Error("No user session found.");
    }

    const { id, role } = session.user;

    if (!id || !role) {
      throw new Error("User not authenticated or role not found.");
    }

    // If signed in user is a member, not manager or admin
    if (role === "MEMBER") {
      throw new Error("User not authorized to add users.");
    }

    // If the user is a manager, set teamId and managerId
    if (role === "MANAGER") {
      // Check if manager is trying to create an ADMIN user
      if (userData.role !== "MEMBER") {
        throw new Error("Unauthorized: Managers can only create members.");
      }

      // Get teamId for current manager ID
      const team = await prisma.team.findFirst({
        where: { managerId: id },
        select: {
          id: true,
        },
      });

      // If team is not found, throw an error
      if (!team) {
        throw new Error("Team not found, contact an administrator.");
      }

      // Set teamId and managerId for the new user
      userData.teamId = team.id;
      userData.managerId = id; // Set managerId to current manager's ID
    }

    // if user is an ADMIN
    if (role === "ADMIN") {
      // if userData.role is MANAGER, check for team or create one
      if (userData.role === "MANAGER") {
        // Check if teamId is provided, if not, create a new team
        if (!userData.teamId) {
          throw new Error("Team ID is required for creating a manager.");
        }
        // Check if teamId exists
        const teamExists = await prisma.team.findUnique({
          where: { id: userData.teamId },
        });
        if (!teamExists) {
          throw new Error("Team does not exist. Create one first.");
        }
      }
      if (userData.role === "MEMBER") {
        // Check if teamId is provided
        if (!userData.teamId) {
          throw new Error("Manager ID is required for creating a member.");
        }
        // Check if teamId exists
        const team = await prisma.team.findUnique({
          where: { id: userData.teamId },
        });
        if (!team) {
          throw new Error("Team does not exist. Create one first.");
        }
        userData.teamId = team.id as string;
        userData.managerId = team.managerId as string; // Set managerId from team
      }
      if (userData.role === "ADMIN") {
      }
    }

    // Check for required fields
    if (
      !userData.name ||
      !userData.username ||
      !userData.password ||
      !userData.role
    ) {
      throw new Error("Missing required fields");
    }

    // Check if user already exists
    const existingUser = await getUserByUsername(userData.username);

    if (existingUser) {
      throw new Error("User with this username already exists.");
    }

    const salt = await bcrypt.genSalt(10);
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        password: await bcrypt.hash(userData.password, salt),
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        status: true,
        teamId: true,
        managerId: true,
        team: {
          select: {
            alias: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    // Update managerId on team if user is a manager
    if (userData.role === "MANAGER" && userData.teamId) {
      await prisma.team.update({
        where: { id: userData.teamId },
        data: { managerId: newUser.id, updatedAt: new Date() },
      });
    }

    return newUser;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to add user"
    );
  }
}

export async function importBulkUsers(
  csvData: string,
  role: string,
  teamId: string
) {
  try {
    const usersArray = csvData.split("\n").map((line) => {
      const [name, username, password] = line.split(",");

      return {
        name: name.trim(),
        username: username.trim(),
        password: password.trim(),
        role: role.trim().toUpperCase() as "ADMIN" | "MANAGER" | "MEMBER",
        teamId: teamId?.trim() || undefined,
        // managerId: managerId?.trim() || undefined,
      };
    });

    // get managerId by teamId
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      select: { managerId: true },
    });

    if (!team) {
      throw new Error("Team not found for the provided team ID.");
    }
    const managerId = team.managerId;

    const salt = await bcrypt.genSalt(10);

    // Run all create operations in a single transaction
    const createdUsers = await prisma.$transaction(async (prisma) => {
      const results = [];
      for (const userData of usersArray) {
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        console.log(userData);
        const user = await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            teamId: userData.teamId as string,
            managerId: managerId as string,
          },
          select: {
            id: true,
            name: true,
            username: true,
            role: true,
            status: true,
            teamId: true,
            managerId: true,
            team: {
              select: {
                alias: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        });
        results.push(user);
      }
      console.log(results);
      return results;
    });

    return createdUsers;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Bulk user import failed. All changes rolled back."
    );
  }
}
