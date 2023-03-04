<script lang="ts">
  import type { NcaaBBEvent } from '$lib/types'
  import TeamLine from './TeamLine.svelte'

  export let game: NcaaBBEvent
</script>

<a data-sveltekit-preload-data href={`/game/${String(game.id)}`}>
  <div
    class="flex gap-4 justify-between items-center border p-4 rounded-md shadow-sm"
  >
    <div class="flex flex-col flex-1 gap-1">
      <TeamLine
        team={{
          ...game.away_team,
          ranking: game.away_ranking,
          score: game.box_score.score.away.score
        }}
      />
      <TeamLine
        team={{
          ...game.home_team,
          ranking: game.home_ranking,
          score: game.box_score.score.home.score
        }}
      />
    </div>
    <div class="flex justify-center w-[10ch]">
      {#if game.status !== 'pre_game'}
        <span>{game.box_score.progress.string}</span>
      {:else}
        <span>
          {new Date(game.game_date).toLocaleTimeString(undefined, {
            timeStyle: 'short'
          })}
        </span>
      {/if}
    </div>
  </div>
</a>
