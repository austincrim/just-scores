<script lang="ts">
  import { page } from '$app/stores'
  import { query } from '$lib/stores.js'

  export let data

  const power5 = ['ACC', 'Big 12', 'Big Ten', 'PAC-12', 'SEC']
  $: conferences =
    data.leagues &&
    data.leagues
      .flatMap((l) => l.conferences)
      .sort((a) => {
        if (power5.includes(a)) return -1
        return 0
      })
  $: regularSeasonWeeks = data.events.current_season.filter(
    (w: any) => !w.guid.includes('preseason')
  )
  $: currentWeek = data.events.current_season.find(
    (w: any) =>
      new Date(w.start_date) < new Date() && new Date(w.end_date) >= new Date()
  )
</script>

<div
  class="flex items-center w-full gap-6 py-2 mt-10 overflow-x-auto week-container snap-x"
>
  {#each regularSeasonWeeks as week}
    <a
      href={query({ key: 'w', value: week.id }).value()}
      class:current-week={currentWeek?.id === week.id}
      class:selected-week={week.id === $page.url.searchParams.get('w')}
      class="whitespace-nowrap snap-center"
    >
      {week.label}
    </a>
  {/each}
</div>

{#if conferences}
  <div class="flex flex-col items-center w-full gap-4 mt-8">
    <div
      class="relative flex w-full py-4 overflow-x-auto conference-container snap-x snap-mandatory"
    >
      {#each conferences as conference}
        <a
          href={query({ key: 'c', value: conference.trim() }).value()}
          class="z-0 px-4 whitespace-nowrap snap-start"
          class:selected-conference={$page.url.searchParams.get('c') ===
            conference}
        >
          {conference}
        </a>
      {/each}
    </div>
  </div>
{/if}

<slot />

<style>
  .selected-conference {
    color: theme('colors.amber.800');
    font-weight: theme('fontWeight.bold');
  }
  .selected-week {
    font-weight: theme('fontWeight.semibold');
  }
  .current-week {
    color: theme('colors.amber.800');
    font-weight: theme('fontWeight.bold');
  }
</style>
