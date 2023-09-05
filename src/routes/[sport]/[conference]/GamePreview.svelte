<script lang="ts">
  import type { NcaaBBEvent, NcaaFBEvent } from '$lib/types'
  import TeamLine from './TeamLine.svelte'

  export let game: NcaaBBEvent | NcaaFBEvent
</script>

<a data-sveltekit-preload-data href={`/game/${String(game.id)}`}>
  <div class="flex gap-4 justify-between items-center p-4 rounded-md shadow-sm">
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
