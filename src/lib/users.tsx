import prisma from "@/lib/prisma";
import { MockUsers } from "@/mock";
import { Users, CreateUserData } from "@/types";
import bcrypt from "bcryptjs";
import { auth } from "~/auth.config";

// Transform MockUsers to match the expected structure
const transformedMockUsers = MockUsers.map((mockUser) => ({
  id: mockUser.id,
  name: mockUser.name,
  username: mockUser.username,
  role: mockUser.role as "ADMIN" | "MANAGER" | "MEMBER",
  status: mockUser.status as "ACTIVE" | "INACTIVE",
  teamId: mockUser.teamId,
  managerId: mockUser.managerId as string,
  team: mockUser.team?.alias ? { alias: mockUser.team.alias } : null,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

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

    users.push(...transformedMockUsers);

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Failed to fetch users");
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

    teamMembers.push(
      ...transformedMockUsers.filter((user) => user.managerId === id)
    );

    return teamMembers;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to fetch team members");
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
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function updateUserPassword(userId: string, newPassword: string) {
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
    console.log("Error updating user password", error);
    throw new Error("Failed to update user password");
  }
}

export async function deactivateUser(userId: string) {
  try {
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
    console.error("Error deactivating user:", error);
    throw new Error("Failed to deactivate user");
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
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
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
    console.error("Error reactivating user:", error);
    throw new Error("Failed to reactivate user");
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
    console.error("Error fetching user by ID:", error);
    throw new Error("Failed to fetch user");
  }
}

export async function getTotalUsersCount() {
  try {
    const totalUsersCount = await prisma.user.count();
    return totalUsersCount;
  } catch (error) {
    console.error("Error fetching total users count:", error);
    throw new Error("Failed to fetch total users count");
  }
}

export async function getActiveUsersCount() {
  try {
    const activeUsersCount = await prisma.user.count({
      where: { status: "ACTIVE" },
    });
    return activeUsersCount;
  } catch (error) {
    console.error("Error fetching active users count:", error);
    throw new Error("Failed to fetch active users count");
  }
}

export async function getInactiveUsersCount() {
  try {
    const inactiveUsersCount = await prisma.user.count({
      where: { status: "INACTIVE" },
    });
    return inactiveUsersCount;
  } catch (error) {
    console.error("Error fetching inactive users count:", error);
    throw new Error("Failed to fetch inactive users count");
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
    console.error("Error fetching user by username:", error);
    throw new Error("Failed to fetch user");
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

    // Check for required fields
    if (
      !userData.name ||
      !userData.username ||
      !userData.password ||
      !userData.role
    ) {
      throw new Error("Missing required fields");
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
        if (!userData.managerId) {
          throw new Error("Manager ID is required for creating a member.");
        }
        // Check if teamId exists
        const manager = await prisma.user.findUnique({
          where: { id: userData.managerId },
          select: {
            id: true,
            teamId: true,
          },
        });
        if (!manager) {
          throw new Error("Manager does not exist. Create one first.");
        }
        userData.teamId = manager.teamId as string;
      }
      if (userData.role === "ADMIN") {
      }
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
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
}

export async function importBulkUsers(csvData: string) {
  try {
    const usersArray = csvData.split("\n").map((line) => {
      const [name, username, password, role, status, teamId, managerId] =
        line.split(",");

      return {
        name: name.trim(),
        username: username.trim(),
        password: password.trim(),
        role: role.trim().toUpperCase() as "ADMIN" | "MANAGER" | "MEMBER",
        status: status.trim().toUpperCase() as "ACTIVE" | "INACTIVE",
        teamId: teamId?.trim() || undefined,
        managerId: managerId?.trim() || undefined,
      };
    });

    const salt = await bcrypt.genSalt(10);

    // Run all create operations in a single transaction
    const createdUsers = await prisma.$transaction(async (prisma) => {
      const results = [];
      for (const userData of usersArray) {
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        const user = await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            teamId: userData.teamId as string,
            managerId: userData.managerId as string,
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
      return results;
    });

    return createdUsers;
  } catch (error) {
    console.error("❌ Transaction failed, no users created:", error);
    throw new Error("Bulk user import failed. All changes rolled back.");
  }
}
