// csrfStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const PERSISTED_TOKEN_KEY = "uid";

type PersistedCsrfState = {
  [key: string]: string | null | undefined;
};

interface CsrfState {
  csrfToken: string | null;
  setToken: (token: string) => void;
  getToken: () => string | null;
}

export const useCsrfStore = create<CsrfState>()(
  persist(
    (set, get) => ({
      csrfToken: null,

      setToken: (newToken) => set({ csrfToken: newToken }),

      getToken: () => get().csrfToken,
    }),
    {
      name: "idmp-partner",
      storage: createJSONStorage(() => sessionStorage),

      partialize: (state) => ({
        [PERSISTED_TOKEN_KEY]: state.csrfToken,
      }),

      merge: (persistedState, currentState) => {
        const stateFromStorage = persistedState as PersistedCsrfState;

        return {
          ...currentState,
          csrfToken: stateFromStorage[PERSISTED_TOKEN_KEY] || null,
        };
      },
    }
  )
);

export const csrfStore = {
  getToken: () => useCsrfStore.getState().csrfToken,
  setToken: (token: string) => useCsrfStore.getState().setToken(token),
};
