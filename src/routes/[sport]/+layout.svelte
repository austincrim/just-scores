<script lang="ts">
  import { page } from "$app/stores"

  let { data, children } = $props()

  const power5 = ["ACC", "Big 12", "Big Ten", "Pac-12", "SEC"]
  let conferences = $derived(
    data.leagues
      ? data.leagues
          .flatMap((l) => l.conferences)
          .sort((a) => {
            if (power5.includes(a)) return -1
            return 0
          })
      : []
  )
  let regularSeasonWeeks = $derived(
    data.events?.current_season?.filter(
      (w: any) => !w.guid.includes("preseason")
    ) ?? []
  )
  let currentWeek = $derived(
    data.events?.current_season?.find(
      (w: any) =>
        new Date(w.start_date) < new Date() &&
        new Date(w.end_date) >= new Date()
    )
  )

  let selectedConference = $derived($page.url.searchParams.get("c") ?? "Top 25")
  let selectedWeek = $derived(
    $page.url.searchParams.get("w") ??
      currentWeek?.id ??
      data.events?.current_season[0]
  )

  let weekContainer = $state<HTMLDivElement>()
  let conferenceContainer = $state<HTMLDivElement>()

  $effect(() => {
    if (weekContainer && $page.url) {
      let currentWeek =
        document.querySelector<HTMLAnchorElement>(".current-week")
      weekContainer.scrollTo({
        left: currentWeek?.offsetLeft! - document.body.clientWidth / 2
      })
    }
    if (conferenceContainer) {
      let selectedConference = document.querySelector<HTMLAnchorElement>(
        ".selected-conference"
      )
      conferenceContainer.scrollTo({
        left: selectedConference?.offsetLeft! - document.body.clientWidth / 2
      })
    }
  })
</script>

<div
  class="flex items-center w-full gap-4 p-2 mt-4 overflow-x-auto week-container snap-x snap-mandatory"
  bind:this={weekContainer}
>
  {#each regularSeasonWeeks as week}
    <a
      href={conferences.length > 0
        ? `?c=${selectedConference}&w=${week.id}`
        : `?w=${week.id}`}
      class:current-week={currentWeek?.id === week.id}
      class:selected-week={week.id === $page.url.searchParams.get("w")}
      class="whitespace-nowrap snap-center"
    >
      {week.label}
    </a>
  {/each}
</div>

{#if conferences}
  <div class="flex flex-col items-center w-full mt-3">
    <div
      class="relative flex w-full gap-4 p-2 overflow-x-auto conference-container snap-x"
      bind:this={conferenceContainer}
    >
      {#each conferences as conference}
        <a
          href="?c={conference.trim()}&w={selectedWeek}"
          class="z-0 whitespace-nowrap snap-center"
          class:selected-conference={$page.url.searchParams.get("c") ===
            conference}
        >
          {conference}
        </a>
      {/each}
    </div>
  </div>
{/if}

{@render children()}

<style>
  .selected-conference {
    color: var(--color-amber-800);
    font-weight: bold;
  }
  .current-week {
    color: var(--color-amber-800);
    font-weight: 500;
  }
  .selected-week {
    font-weight: bold;
  }
</style>
