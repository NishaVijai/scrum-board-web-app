const API_BASE = import.meta.env.VITE_API_URL || '';
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE}/api/ScrumBoard`);
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return await response.json();
};

export const createCard = async (card: { title: string }) => {
  const response = await fetch(`${API_BASE}/api/ScrumBoard/Create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  if (!response.ok) {
    throw new Error("Failed to create card");
  }
  return await response.json();
};