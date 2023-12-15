export default {
    // Function to make API requests
    async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    },

    async getSeasonNumber() {
        const stateUrl = 'https://api.sleeper.app/v1/state/nfl';
        const stateData = await this.fetchData(stateUrl);
        return stateData.season;
    },

    async getUserDetails(username) {
        const apiUrl = `https://api.sleeper.app/v1/user/${username}/`;
        const userDetails = await this.fetchData(apiUrl);
        return userDetails;
    },

    async getLeaguesForUser(userId) {
        const seasonNumber = await this.getSeasonNumber();
        const apiUrl = `https://api.sleeper.app/v1/user/${userId}/leagues/nfl/${seasonNumber}`;
        const leagues = await this.fetchData(apiUrl);

        return leagues;
    },

    // Function to get rosters for the league
    async getRosters(leagueId) {
        const apiUrl = `https://api.sleeper.app/v1/league/${leagueId}/rosters`;
        return await this.fetchData(apiUrl);
    },

    // Function to get users for the league
    async getUsers(leagueId) {
        const apiUrl = `https://api.sleeper.app/v1/league/${leagueId}/users`;
        return await this.fetchData(apiUrl);
    },

    // Get the current week number using display_week
    async getWeekNumber() {
        const stateUrl = 'https://api.sleeper.app/v1/state/nfl';
        const stateData = await this.fetchData(stateUrl);
        return stateData.display_week;
    },
    // Function to get matchups for a specific week
    async getMatchupsForWeek(leagueId, week) {
        const apiUrl = `https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`;
        const matchups = await this.fetchData(apiUrl);

        // Add week information to each matchup
        return matchups.map(matchup => ({
            ...matchup,
            week,
        }));
    }
};