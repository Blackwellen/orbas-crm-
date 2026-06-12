import { create } from "zustand"

export type ChatBubbleTab = "inbox" | "team" | "ai" | "notifications" | "actions"

export interface Workspace {
  id: string
  name: string
  slug: string
  plan: string
  logoUrl?: string
}

interface AppState {
  currentWorkspace: Workspace | null
  currentApp: string
  sidebarCollapsed: boolean
  chatBubbleOpen: boolean
  chatBubbleTab: ChatBubbleTab

  setWorkspace: (workspace: Workspace | null) => void
  setCurrentApp: (app: string) => void
  toggleSidebar: () => void
  openChatBubble: () => void
  closeChatBubble: () => void
  setChatBubbleTab: (tab: ChatBubbleTab) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentWorkspace: null,
  currentApp: "home",
  sidebarCollapsed: false,
  chatBubbleOpen: false,
  chatBubbleTab: "inbox",

  setWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  setCurrentApp: (app) => set({ currentApp: app }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  openChatBubble: () => set({ chatBubbleOpen: true }),
  closeChatBubble: () => set({ chatBubbleOpen: false }),
  setChatBubbleTab: (tab) => set({ chatBubbleTab: tab }),
}))
