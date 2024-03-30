export async function getinventory() {
  const response = await fetch("/api/get");

  return await response.json();
}
