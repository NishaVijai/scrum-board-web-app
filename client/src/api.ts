const API_BASE = import.meta.env.VITE_API_URL || '';
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE}/api/ScrumBoard`);
  if (!response.ok) {
    throw new Error("API call failed");
  }
  return await response.json();
};
