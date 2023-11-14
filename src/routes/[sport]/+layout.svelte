<script lang="ts">
  import { page } from '$app/stores'
  import { query } from '$lib/stores.js'
  import { onMount } from 'svelte'

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

  let weekContainer: HTMLDivElement
  let conferenceContainer: HTMLDivElement

  onMount(() => {
    if (weekContainer) {
      let selectedWeek =
        document.querySelector<HTMLAnchorElement>('.selected-week')
      weekContainer.scrollTo({
        left: selectedWeek?.offsetLeft! - document.body.clientWidth / 2,
        behavior: 'smooth',
      })
    }
    if (conferenceContainer) {
      let selectedConference = document.querySelector<HTMLAnchorElement>(
        '.selected-conference'
      )
      conferenceContainer.scrollTo({
        left: selectedConference?.offsetLeft! - document.body.clientWidth / 2,
        behavior: 'smooth',
      })
    }
  })
</script>

<div
  class="flex items-center w-full gap-4 p-2 mt-10 overflow-x-auto week-container snap-x snap-mandatory"
  bind:this={weekContainer}
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
  <div class="flex flex-col items-center w-full mt-6">
    <div
      class="relative flex w-full gap-4 p-2 overflow-x-auto conference-container snap-x"
      bind:this={conferenceContainer}
    >
      {#each conferences as conference}
        <a
          href={query({ key: 'c', value: conference.trim() }).value()}
          class="z-0 whitespace-nowrap snap-center"
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
