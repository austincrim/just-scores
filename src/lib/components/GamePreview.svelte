<script lang="ts">
  import { page } from '$app/stores'
  import type { NFLEvent, NcaaBBEvent, NcaaFBEvent } from '$lib/types'
  import TeamLine from './TeamLine.svelte'

  export let game: NcaaBBEvent | NcaaFBEvent | NFLEvent
</script>

<a
  class="!no-underline"
  class:active={game.status === 'in_progress'}
  data-sveltekit-preload-data
  href={`/${$page.params.sport}/game/${game.id}`}
>
  <div class="flex items-center justify-between gap-4 p-4 border shadow-brutal">
    <div class="flex flex-col flex-1 gap-4">
      <TeamLine team={game.away_team} type="away" {game} />
      <TeamLine team={game.home_team} type="home" {game} />
    </div>
    <div class="flex flex-col items-center gap-1 w-[10ch]">
      {#if game.status !== 'pre_game'}
        <span>{game.box_score?.progress.string}</span>
      {:else}
        <span>
          {new Date(game.game_date).toLocaleTimeString(undefined, {
            timeStyle: 'short',
          })}
        </span>
      {/if}
      {#if game.tv_listings_by_country_code?.us}
        <span class="text-sm text-center text-gray-700">
          {game.tv_listings_by_country_code['us'][0].long_name}
        </span>
      {/if}
    </div>
  </div>
</a>

<style>
  .active::before {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    background: theme('colors.amber.800');
    border-radius: 100%;
    box-shadow: theme('boxShadow.sm');
    left: -20px;
    top: calc(50% - 5px);
  }

  .shadow-brutal {
    box-shadow: 5px 5px 0px theme('colors.zinc.900');
  }
</style>
