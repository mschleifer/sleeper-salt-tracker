<template>
    <div class="flex flex-col justify-center text-primary-400 gap-2">
        <form @submit.prevent="updateUsername">
            <div class="flex flex-col gap-2 place-items-center border border-primary-400 rounded-xl p-10 bg-surface-800">
                <label for="username" class="text-2xl font-semibold text-center">Start with your username</label>
                <span class="relative">
                    <i class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-600" />
                    <i class="pi pi-spin pi-spinner absolute top-2/4 -mt-2 right-3 text-surface-600"
                        :style="{ display: searchingUsername ? 'inherit' : 'none' }" />
                    <InputText id="username" type="text" :value="username" placeholder="Search"
                        aria-describedby="username-help" class="pl-10" />
                </span>
                <Button label="Go" type="submit" />
            </div>
        </form>

        <!-- <Listbox v-model="selectedLeague" :options="leagueOptions" optionLabel="name" class="w-full md:w-14rem" /> -->

        <label v-for="league in leagueOptions" :key="league.league_id"
            class="text-center border border-primary-400 rounded-xl p-10"
            :class="{ 'bg-surface-800': selectedLeague.league_id !== league.league_id, 'bg-surface-600': selectedLeague.league_id === league.league_id }"
            :for="`rb_${league.league_id}`">
            <input type="radio" :id="`rb_${league.league_id}`" v-model="selectedLeague" :value="league"
                class="invisible absolute" />
            {{ league.name }}
        </label>

    </div>
</template>
    
<script setup>

import SleeperApi from '../services/SleeperApiService.js';

const username = useUsername();
const leagueOptions = ref([]);
const selectedLeague = useSelectedLeague();
const searchingUsername = ref(false);

watch(username, async (newName, oldName) => {
    searchingUsername.value = true;
    SleeperApi.getUserDetails(newName).then((userDetails) => {
        SleeperApi.getLeaguesForUser(userDetails.user_id).then((leagues) => { leagueOptions.value = leagues; searchingUsername.value = false;})
    });
})

async function updateUsername(submitEvent) {
    username.value = submitEvent.target.elements.username.value
}

</script>