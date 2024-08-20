const formatDate = (date: string) => {
  // change from yyyy-mm-dd => dd/mm/yyyy
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

export default formatDate