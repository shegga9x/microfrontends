import { create, StateCreator } from 'zustand';

interface AppState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const store: StateCreator<AppState> = (set) => ({
  count: 0,
  increment: () => set((state) => ({ ...state, count: state.count + 1 })),
  decrement: () => set((state) => ({ ...state, count: state.count - 1 })),
});

export const useAppStore = create<AppState>(store);

// Export auth store
export * from './auth';