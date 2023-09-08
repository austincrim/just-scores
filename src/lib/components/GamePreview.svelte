<script lang="ts">
  import { page } from '$app/stores'
  import type { NcaaBBEvent, NcaaFBEvent } from '$lib/types'
  import TeamLine from './TeamLine.svelte'

  export let game: NcaaBBEvent | NcaaFBEvent
</script>

<a
  class="!no-underline"
  data-sveltekit-preload-data
  href={`/${$page.params.sport}/game/${String(game.id)}`}
>
  <div class="flex items-center justify-between gap-4 p-4 border rounded-md">
    <div class="flex flex-col flex-1 gap-4">
      <TeamLine
        team={{
          ...game.away_team,
          ranking: game.away_ranking,
          score: game.box_score?.score.away.score,
        }}
      />
      <TeamLine
        team={{
          ...game.home_team,
          ranking: game.home_ranking,
          score: game.box_score?.score.home.score,
        }}
      />
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
        <span class="text-sm text-gray-700">
          {game.tv_listings_by_country_code['us'][0].long_name}
        </span>
      {/if}
    </div>
  </div>
</a>
