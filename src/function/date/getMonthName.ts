const getMonthName = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return {
    month: month,
    monthYear: `${month} ${year}`
  }
};

export default getMonthName