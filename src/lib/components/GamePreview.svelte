<script lang="ts">
  import { page } from '$app/stores'
  import type { NFLEvent, NcaaBBEvent, NcaaFBEvent } from '$lib/types'
  import TeamLine from './TeamLine.svelte'

  export let game: NcaaBBEvent | NcaaFBEvent | NFLEvent
</script>

<a
  class="!no-underline text-lg relative active"
  data-sveltekit-preload-data
  href={`/${$page.params.sport}/game/${game.id}`}
>
  {#if game.status === 'in_progress'}
    <div class="absolute grid grid-cols-1 -translate-y-1/2 top-1/2 -left-5">
      <span
        class="w-3 h-3 rounded-full col-span-full row-span-full bg-emerald-500"
      ></span>
      <span
        class="w-3 h-3 rounded-full animate-ping [animation-duration:3s] col-span-full row-span-full bg-emerald-500"
      ></span>
    </div>
  {/if}
  <div class="flex items-center justify-between gap-6 p-4 border shadow-brutal">
    <div class="flex flex-col flex-1 gap-3">
      <TeamLine team={game.away_team} type="away" {game} />
      <TeamLine team={game.home_team} type="home" {game} />
    </div>
    <div class="flex flex-col items-center gap-1">
      {#if game.status !== 'pre_game'}
        <span class="w-[4ch]">{game.box_score?.progress.string}</span>
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
