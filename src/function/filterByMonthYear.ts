const filterByMonthYear = (data: any, month: string, year: number) => {
  return data.filter((item: any) => {
    const [time, date] = item.created_at.split(', ');
    const [day, monthFilter, yearFilter] = date.split('/');
    const getThis = monthFilter === String(month).padStart(2, '0') && yearFilter === String(year);
    return getThis
  });
}

export default filterByMonthYear