export const useUsername = () => useState<string>('username', () => '')
export const useSelectedLeague = () => useState('selectedLeague', () => ({
    league_id: null,
    name: null,
    settings: { playoff_start_week: null }
}))