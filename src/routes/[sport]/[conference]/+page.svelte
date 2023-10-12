<script lang="ts">
  import { navigating } from '$app/stores'
  import GamePreview from '$lib/components/GamePreview.svelte'

  export let data
</script>

<ol
  class="flex flex-col w-full max-w-4xl gap-6 px-12 mx-auto"
  class:opacity-75={$navigating}
>
  {#each data.games as game, i}
    {@const currentGameDate = new Date(game.game_date).toLocaleDateString()}
    {@const previousGameDate = new Date(
      data.games[i - 1]?.game_date
    ).toLocaleDateString()}

    {#if i === 0 || currentGameDate !== previousGameDate}
      <span class="mt-4 font-bold">{currentGameDate}</span>
    {/if}
    <li class="relative flex flex-col gap-2">
      <GamePreview {game} />
    </li>
  {/each}
</ol>
