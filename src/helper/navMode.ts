export type NavMode = 'push' | 'replace' | 'back' | 'hardBack' | null;

export const navMode: { current: NavMode } = { current: null };
