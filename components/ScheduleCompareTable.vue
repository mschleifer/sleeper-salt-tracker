<template>
  <div class="flex flex-col justify-items-center border border-primary-400 rounded-xl p-10 bg-surface-800 bg-tr"
    :class="{ hidden: !isLeagueSelected }">
    <div class="text-center">Win Differences for {{ props.name }}</div>
    <div class="text-center mt-4" :class="{ hidden: !loadingTeamData }">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div class="overflow-x-auto" :class="{ hidden: loadingTeamData }">
      <table>
        <thead>
          <tr>
            <th class="text-left sticky left-0 h-fit bg-surface-800">
              Your Team
              <i class="pi pi-arrow-right" style="font-size: .75rem"></i>
            </th>
            <th v-for="team in teamData" :key="team.roster_id" class="p-2">
              {{ team.user_info.display_name }}
            </th>
          </tr>
          <tr>
            <th class="text-left sticky left-0 h-fit bg-surface-800">
              Playing as
              <i class="pi pi-arrow-down" style="font-size: .75rem"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teamRow in teamData" :key="teamRow.roster_id">
            <td class="p-2 border-r-2 border-surface-600 sticky left-0 h-fit bg-surface-800">{{
              teamRow.user_info.display_name }}</td>
            <td v-for="teamCol in teamData" :key="teamCol.roster_id"
              class="p-2 text-center border-r-2 border-surface-600 last:border-0 text-white" :class="{
                'bg-rose-600': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference < -3,
                'bg-rose-500': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === -3,
                'bg-rose-400': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === -2,
                'bg-rose-300': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === -1,
                'bg-green-600': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference > 3,
                'bg-green-500': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === 3,
                'bg-green-400': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === 2,
                'bg-green-300': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === 1,
                'bg-gray-500': teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference === 0
              }">
              {{ teamCol.weeklyComparisons.find(c => c.roster_id === teamRow.roster_id)?.winDifference ?? '-' }}
            </td>
          </tr>
          <tr>
            <td class="p-2 sticky left-0 h-fit bg-surface-800">
              <div class="border-t-2 border-surface-600 mb-2"></div>
              Avg. Difference
            </td>
            <td v-for="teamCol in teamData" :key="teamCol.roster_id" class="text-center p-2">
              <div class="border-t-2 border-surface-600 mb-2"></div>
              {{ parseFloat(teamCol.avgWinDifference) > 0 ? "+" : "" }}{{ parseFloat(teamCol.avgWinDifference).toFixed(2)
              }}
            </td>
          </tr>
          <tr>
            <td class="p-2 sticky left-0 h-fit bg-surface-800">
              Projected Record
            </td>
            <td v-for="teamCol in teamData" :key="teamCol.roster_id" class="text-center p-2">
              {{ teamCol.medianWins }} - {{ teamCol.wins + teamCol.losses + teamCol.ties - teamCol.medianWins }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="flex flex-col justify-items-center border border-primary-400 rounded-xl p-10 bg-surface-800 bg-tr"
    :class="{ hidden: !isLeagueSelected }">
    <div class="text-center">Projected Standings</div>
    <div class="text-center mt-4" :class="{ hidden: !loadingTeamData }">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
    </div>
    <div class="overflow-x-auto flex flex-col ">
      <table>
        <tbody>
          <tr v-for="(teamRow, index) in projectedStandings" :key="teamRow.roster_id"
            class="[&:nth-child(6)]:border-b-2 [&:nth-child(6)]:border-primary-400">
            <td class="p-2 text-white text-center">
              {{ index + 1 }}
            </td>
            <td class="p-2 text-center text-white">
              {{ teamRow.user_info.display_name }}
            </td>
            <td class="p-2 text-center text-white whitespace-nowrap">
              {{ teamRow.medianWins }}-{{ teamRow.wins + teamRow.losses + teamRow.ties - teamRow.medianWins }}
              <span class="text-xs whitespace-nowrap" style="font-size: .5rem;">
                (<i class="pi" :class="{
                  'pi-arrow-up text-green-600': teamRow.medianWins - teamRow.wins > 0,
                  'pi-arrow-down text-rose-600': teamRow.medianWins - teamRow.wins < 0,
                }"></i>
                {{ teamRow.wins }}-{{ teamRow.wins + teamRow.losses + teamRow.ties - teamRow.wins }}
                )
              </span>
            </td>
            <td class="p-2 text-center text-white">
              {{ teamRow.points }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script setup>
import SleeperApi from '../services/SleeperApiService.js';

const props = defineProps({
  league_id: String,
  name: String
})

const selectedLeague = useSelectedLeague();
const teamData = ref([]); // Initialize an empty array to store user data
const loadingTeamData = ref(false);

const isLeagueSelected = computed(() => {
  return selectedLeague.value && selectedLeague.value.league_id;
})

const projectedStandings = computed(() => {
  return teamData.value.sort((a, b) => b.medianWins - a.medianWins || b.points - a.points);
})

watch(() => props.league_id, async (newId, oldId) => {
  loadingTeamData.value = true;
  await loadTableData(newId);
  loadingTeamData.value = false;
})

async function loadTableData(leagueId) {
  try {
    const currentWeek = await SleeperApi.getWeekNumber();
    const playoffStartWeek = selectedLeague.value.settings.playoff_week_start;
    const lastWeekToCompare = Math.min(currentWeek, playoffStartWeek - 1)

    console.log(`Current NFL Week: ${currentWeek}`);

    // Fetch rosters
    const rosters = await SleeperApi.getRosters(leagueId);

    // Fetch users
    const users = await SleeperApi.getUsers(leagueId);

    // Create a dictionary to map roster_id to owner_id
    const ownerMap = {};
    rosters.forEach(roster => {
      ownerMap[roster.roster_id] = roster.owner_id;
    });

    const userMap = {};
    users.forEach(user => {
      userMap[user.user_id] = user;
    });

    const teamList = [];

    for (let week = 1; week <= lastWeekToCompare; week++) {
      const matchups = await SleeperApi.getMatchupsForWeek(leagueId, week);

      matchups.forEach(matchup => {
        const rosterId = matchup.roster_id;
        const ownerId = ownerMap[rosterId];
        const userInfo = userMap[ownerId];

        // Get wins, losses, ties from the corresponding object in the roster list
        const rosterInfo = rosters.find(roster => roster.roster_id === rosterId);
        const wins = rosterInfo.settings.wins || 0;
        const losses = rosterInfo.settings.losses || 0;
        const ties = rosterInfo.settings.ties || 0;

        // Check if the rosterId already exists in teamList
        const existingEntry = teamList.find(entry => entry.roster_id === rosterId);

        if (existingEntry) {
          existingEntry.matchups.push({
            ...matchup,
            week,
          });
        } else {
          // If rosterId doesn't exist, create a new entry
          teamList.push({
            roster_id: rosterId,
            owner_id: ownerId,
            user_info: userInfo,
            matchups: [{
              ...matchup,
              week,
            }],
            weeklyComparisons: [], // Object to store weekly comparisons grouped by TeamB
            wins: wins,
            losses: losses,
            ties: ties,
            points: rosterInfo.settings.fpts + (rosterInfo.settings.fpts_decimal / 100)
          });
        }
      });
    }

    // Iterate through each team in teamList
    teamList.forEach(teamA => {
      // console.log(`Team ${teamA.roster_id} - ${teamA.user_info.display_name}`);
      // console.log(`  Wins: ${teamA.wins}, Losses: ${teamA.losses}, Ties: ${teamA.ties}`);

      // Iterate through each other TeamB
      teamList.forEach(teamB => {
        if (teamA !== teamB) {
          // console.log(`  vs. Team ${teamB.roster_id} - ${teamB.user_info.display_name}`);

          // Iterate through TeamB's matchups and compare TeamB's opponent's points to TeamA's points for that week
          teamB.matchups.forEach(matchupB => {
            const matchupId = matchupB.matchup_id;
            const opponentTeamC = teamList.find(opponentTeamC =>
              opponentTeamC !== teamB && // Ensure opponentTeamC is not the same as TeamB
              opponentTeamC.matchups.some(matchupC => matchupC.matchup_id === matchupId && matchupC.week === matchupB.week)
            );

            if (opponentTeamC) {
              const matchupC = opponentTeamC.matchups.find(matchupC => matchupC.matchup_id === matchupId && matchupC.week === matchupB.week);

              if (matchupC) {
                let result;
                if (opponentTeamC === teamA) {
                  // If opponentTeamC is the same as TeamA, directly compare TeamA and TeamB
                  result = teamA.matchups.find(m => m.week === matchupB.week).points > matchupB.points ? 'Win' : 'Loss';
                  // console.log(`    Week ${matchupB.week}: ${teamA.user_info.display_name} - ${teamA.matchups.find(m => m.week === matchupB.week).points} vs. ${teamB.user_info.display_name} - ${matchupB.points} (${result})`);

                  // Add the result to weeklyComparisons list
                  if (!teamA.weeklyComparisons.find(c => c.roster_id === teamB.roster_id)) {
                    teamA.weeklyComparisons.push({
                      roster_id: teamB.roster_id,
                      owner: teamB.user_info.display_name,
                      schedule: [],
                      totalWins: 0, // Total wins in the schedule
                      winDifference: 0, // Win difference (wins from weekly comparison - team's base wins)
                    });
                  }

                  teamA.weeklyComparisons.find(c => c.roster_id === teamB.roster_id).schedule.push({
                    week: matchupB.week,
                    opponent: teamB.user_info.display_name,
                    result: result,
                  });
                } else {
                  result = teamA.matchups.find(m => m.week === matchupB.week).points > matchupC.points ? 'Win' : 'Loss';
                  // console.log(`    Week ${matchupB.week}: ${teamA.user_info.display_name} - ${teamA.matchups.find(m => m.week === matchupB.week).points} vs. ${opponentTeamC.user_info.display_name} - ${matchupC.points} (${result})`);

                  // Add the result to weeklyComparisons list
                  if (!teamA.weeklyComparisons.find(c => c.roster_id === teamB.roster_id)) {
                    teamA.weeklyComparisons.push({
                      roster_id: teamB.roster_id,
                      owner: teamB.user_info.display_name,
                      schedule: [],
                      totalWins: 0, // Total wins in the schedule
                      winDifference: 0, // Win difference (wins from weekly comparison - team's base wins)
                    });
                  }

                  teamA.weeklyComparisons.find(c => c.roster_id === teamB.roster_id).schedule.push({
                    week: matchupB.week,
                    opponent: opponentTeamC.user_info.display_name,
                    result: result,
                  });
                }
              }
            }
          });
        }
      });

      // Sum the wins in the schedule for each weekly comparison and calculate win difference
      teamA.weeklyComparisons.forEach(weeklyComparison => {
        const totalWins = weeklyComparison.schedule.reduce((sum, match) => {
          return sum + (match.result === 'Win' ? 1 : 0);
        }, 0);
        weeklyComparison.totalWins = totalWins;

        // Calculate win difference
        weeklyComparison.winDifference = totalWins - teamA.wins;
      });

      // Compute average win difference across all other schedules
      teamA.avgWinDifference = teamA.weeklyComparisons.reduce((n, { winDifference }) => n + winDifference, 0) / teamA.weeklyComparisons.length;

      var sortedWinDiff = teamA.weeklyComparisons.map((item) => item.winDifference).sort((a, b) => a - b);
      var midWinDiff = Math.floor((sortedWinDiff.length - 1) / 2);
      var medianWinDiff = sortedWinDiff.length % 2 ? sortedWinDiff[midWinDiff] : (sortedWinDiff[midWinDiff] + sortedWinDiff[midWinDiff + 1]) / 2.0;

      teamA.medianWins = teamA.wins + medianWinDiff;

      console.log(''); // Separate teams for better readability
    });

    // console.log(teamList)
    teamData.value = teamList;
  } catch (error) {
    console.error('Error:', error);
  }
}

</script>