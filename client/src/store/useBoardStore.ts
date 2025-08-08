import { create } from 'zustand';
import { type List } from '../types';
import { createCard, updateCard, deleteCard, fetchTasks } from '../api';
// import { createCard, updateCard, deleteCard, updateListOrder } from '../api';

interface BoardState {
  lists: List[];
  moveCard: (cardId: string, fromListId: string, toListId: string) => Promise<void>;
  addCard: (listId: string, title: string) => Promise<void>;
  removeCard: (listId: string, cardId: string) => Promise<void>;
  fetchAndSetTasks: () => Promise<void>;
  // moveList: (fromIndex: number, toIndex: number) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set) => ({
  lists: [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [],
    },
    {
      id: 'todo',
      title: 'To Do',
      cards: [],
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      cards: [],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [],
    },
  ],
  // Fetch tasks from backend and populate Backlog column
  fetchAndSetTasks: async () => {
    const tasks = await fetchTasks();
    set((state) => {
      const lists = state.lists.map((list) => {
        if (list.id === 'backlog') {
          // Map backend tasks to CardType
          return {
            ...list,
            cards: Array.isArray(tasks)
              ? tasks.map((task) => ({
                id: (task.id ?? task.Id ?? '').toString(),
                title: task.title ?? task.Title ?? '',
              }))
              : [],
          };
        }
        return list;
      });
      return { lists };
    });
  },

  moveCard: async (cardId, fromListId, toListId) => {
    await updateCard({ id: cardId, column: toListId });
    set((state) => {
      const fromList = state.lists.find((l) => l.id === fromListId);
      const toList = state.lists.find((l) => l.id === toListId);
      if (!fromList || !toList) return state;
      const card = fromList.cards.find((c) => c.id === cardId);
      if (!card) return state;
      fromList.cards = fromList.cards.filter((c) => c.id !== cardId);
      toList.cards.push(card);
      return { lists: [...state.lists] };
    });
  },

  addCard: async (listId, title) => {
    const created = await createCard({ title });
    set((state) => {
      const list = state.lists.find((l) => l.id === listId);
      if (!list) return state;
      const cardId = created.id ?? created.Id ?? Date.now().toString();
      list.cards.push({ id: cardId.toString(), title: created.title });
      return { lists: [...state.lists] };
    });
  },

  removeCard: async (listId, cardId) => {
    await deleteCard(cardId);
    set((state) => {
      const list = state.lists.find((l) => l.id === listId);
      if (!list) return state;
      list.cards = list.cards.filter((c) => c.id !== cardId);
      return { lists: [...state.lists] };
    });
  },

  // moveList: async (fromIndex, toIndex) => {
  //   await updateListOrder(fromIndex, toIndex);
  //   set((state) => {
  //     const updatedLists = Array.from(state.lists);
  //     const [movedList] = updatedLists.splice(fromIndex, 1);
  //     updatedLists.splice(toIndex, 0, movedList);
  //     return { lists: updatedLists };
  //   });
  // },
}));
