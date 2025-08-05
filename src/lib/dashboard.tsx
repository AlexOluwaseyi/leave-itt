import {
  getActiveUsersCount,
  getInactiveUsersCount,
  getTotalUsersCount,
} from "./users";

export async function getDashboardStats() {
  const totalMembers = await getTotalUsersCount();
  const activeMembers = await getActiveUsersCount();
  const inactiveMembers = await getInactiveUsersCount();

  // Mock values for leave days
  const totalLeaveDays = "N/A"; // This should be calculated based on your business logic
  const bookedLeaveDays = "N/A"; // This should be calculated based on your business logic
  const remainingLeaveDays = "N/A"; // This should be calculated based on your business logic

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    totalLeaveDays,
    bookedLeaveDays,
    remainingLeaveDays,
  };
}
