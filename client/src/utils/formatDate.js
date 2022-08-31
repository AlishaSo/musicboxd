export const formatDate = dateString => {
  return new Date(dateString).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
}