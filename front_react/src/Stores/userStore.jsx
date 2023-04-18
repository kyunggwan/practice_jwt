import create from "zustand";

const userStore = create((set) => ({
  user: null,
  setUser: (user) => {
    set((state) => ({ ...state, user }));
  },
  removeUser: () => {
    set((state) => ({ ...state, user: null }));
  },
}));

export default userStore;
