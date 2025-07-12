import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useRoomStore = create(persist((set) => ({
    username: '',
    roomId: '',
    RoomName: '',
    password: '',
    roomMembers: [],
    chat:[],
    addMessage: (msg) => set((state) => ({ chat: [...state.chat, msg] })),
    setusername: (username) => set({ username }),
    setpassword: (password) => set({ password }),
    setroomId: (roomId) => set({ roomId }),
    setRoomName: (RoomName) => set({ RoomName }),
    setroomMembers: (roomMembers) => set({ roomMembers }),
    reset: () => set({
        username: '',
        roomId: '',
        RoomName: '',
        password: '',
        roomMembers: [],
        chat: []
    })
}),
    {
        name: "termchat-store",
        storage: {
            getItem: (name) => {
                const value = sessionStorage.getItem(name);
                return value ? JSON.parse(value) : null;
            },
            setItem: (name, value) => {
                sessionStorage.setItem(name, JSON.stringify(value));
            },
            removeItem: (name) => sessionStorage.removeItem(name),
        }

    })
);