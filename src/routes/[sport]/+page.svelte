<script lang="ts">
  import { navigating } from '$app/stores'
  import GamePreview from '$lib/components/GamePreview.svelte'
  import { page } from '$app/stores'

  export let data

  $: regularSeasonWeeks = data.events.current_season.filter(
    (w) => !w.guid.includes('preseason')
  )
  $: currentWeek = data.events.current_season.find(
    (w) =>
      new Date(w.start_date) < new Date() && new Date(w.end_date) >= new Date()
  )
</script>

<div class="flex items-center w-full gap-6 py-2 mt-10 overflow-x-auto snap-x">
  {#each regularSeasonWeeks as week}
    <a
      href="?w={week.id}"
      class:current-week={currentWeek?.id === week.id}
      class:selected-week={week.id === $page.url.searchParams.get('w')}
      class="whitespace-nowrap snap-center"
    >
      {week.label}
    </a>
  {/each}
</div>

{#if !data.leagues}
  <ol
    class="flex flex-col w-full gap-10 px-12 mx-auto mt-8"
    class:opacity-75={$navigating}
  >
    {#each data.games as game, i}
      {@const currentGameDate = new Date(game.game_date).toLocaleDateString()}
      {@const previousGameDate = new Date(
        data.games[i - 1]?.game_date
      ).toLocaleDateString()}

      {#if i === 0 || currentGameDate !== previousGameDate}
        <span class="mt-4 -mb-4 font-bold">{currentGameDate}</span>
      {/if}
      <li
        class:active={game.status === 'in_progress'}
        class="relative flex flex-col gap-2"
      >
        <GamePreview {game} />
      </li>
    {/each}
  </ol>
{/if}

<style>
  .active::before {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    background: theme('colors.green.600');
    border-radius: 100%;
    box-shadow: theme('boxShadow.sm');
    left: -20px;
    top: calc(50% - 5px);
  }

  .selected-week {
    font-weight: theme('fontWeight.semibold');
  }
  .current-week {
    color: theme('colors.amber.800');
    font-weight: theme('fontWeight.bold');
  }
</style>
