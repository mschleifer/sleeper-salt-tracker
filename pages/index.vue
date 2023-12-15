<template>
  <div class="flex flex-col gap-2 text-primary-400">

    <LeagueFinder></LeagueFinder>

    <ScheduleCompareTable v-bind="selectedLeague"></ScheduleCompareTable>
  </div>
</template>
  
<script setup>
const selectedLeague = useSelectedLeague();
</script>
