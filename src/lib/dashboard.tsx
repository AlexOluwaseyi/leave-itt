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
  const totalLeaveDays = 60; // This should be calculated based on your business logic
  const bookedLeaveDays = 15; // This should be calculated based on your business logic
  const remainingLeaveDays = totalLeaveDays - bookedLeaveDays;

  return {
    totalMembers,
    activeMembers,
    inactiveMembers,
    totalLeaveDays,
    bookedLeaveDays,
    remainingLeaveDays,
  };
}
