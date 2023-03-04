<script lang="ts">
  import { navigating } from '$app/stores'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<ol class="flex flex-col gap-4" class:opacity-50={$navigating}>
  {#each data.games.sort((a, b) => new Date(a.game_date).valueOf() - new Date(b.game_date).valueOf()) as game, i}
    {@const currentGameDate = new Date(game.game_date).toLocaleDateString()}
    {@const previousGameDate = new Date(
      data.games[i - 1]?.game_date
    ).toLocaleDateString()}

    <li class="flex flex-col gap-2">
      {#if i === 0 || currentGameDate !== previousGameDate}
        <span class="font-bold mt-4">{currentGameDate}</span>
      {/if}
      <div class="flex gap-16 justify-between items-center">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-1">
            {#if game.away_ranking}
              <span class="text-xs font-bold">{game.away_ranking}</span>
            {/if}
            {game.away_team.name}
          </div>
          <div class="flex items-center gap-1">
            {#if game.home_ranking}
              <span class="text-xs font-bold">{game.home_ranking}</span>
            {/if}
            {game.home_team.name}
          </div>
        </div>
        {#if game.status !== 'pre_game'}
          <div class="flex flex-col items-end">
            <span>{game.box_score.progress.string}</span>
            <span class="font-bold">
              {game.box_score.score.away.score} - {game.box_score.score.home
                .score}
            </span>
          </div>
        {:else}
          <span>
            {new Date(game.game_date).toLocaleTimeString(undefined, {
              timeStyle: 'short'
            })}
          </span>
        {/if}
      </div>
    </li>
  {/each}
</ol>
