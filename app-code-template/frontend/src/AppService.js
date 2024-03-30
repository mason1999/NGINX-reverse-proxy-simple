export async function getInventory() {
  const response = await fetch("/api/get");
  const data = await response.json();
  return data.current_inventory;
}
