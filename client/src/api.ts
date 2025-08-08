const API_BASE = import.meta.env.VITE_API_URL || '';

export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE}/api/ScrumBoard/GetAll`);
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

export const updateCard = async (card: { id: string; title?: string; column?: string; description?: string }) => {
  const response = await fetch(`${API_BASE}/api/ScrumBoard/Update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Id: card.id,
      Title: card.title,
      Column: card.column,
      Description: card.description
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to update card');
  }
  return await response.json();
};

export const deleteCard = async (cardId: string) => {
  const response = await fetch(`${API_BASE}/api/ScrumBoard?id=${cardId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete card');
  }
  return await response.json();
};

// // Update list order (backend implementation needed)
// export const updateListOrder = async (fromIndex: number, toIndex: number) => {
//   return Promise.resolve();
// };
