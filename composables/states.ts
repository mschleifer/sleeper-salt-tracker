export const useUsername = () => useState<string>('username', () => '')
export const useSelectedLeague = () => useState('selectedLeague', () => null)