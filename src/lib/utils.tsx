// Convert DD-MM-YYYY to a valid Date object
export const parseDate = (dateString: string) => {
  if (!dateString) return new Date();

  // Check if it's in DD-MM-YYYY format
  if (dateString.includes("-") && dateString.split("-").length === 3) {
    const [day, month, year] = dateString.split("-");
    // Create date in MM-DD-YYYY format for JavaScript Date constructor
    return new Date(`${month}-${day}-${year}`);
  }

  // Fallback to original date parsing
  return new Date(dateString);
};
