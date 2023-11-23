<script lang="ts">
  import { navigating } from '$app/stores'
  import GamePreview from '$lib/components/GamePreview.svelte'

  export let data
</script>

<ol
  class="flex flex-col w-full max-w-lg gap-10 px-6 mx-auto md:px-12"
  class:opacity-75={$navigating}
>
  {#each data.games as game, i}
    {@const currentGameDate = new Date(game.game_date).toLocaleDateString()}
    {@const previousGameDate = new Date(
      data.games[i - 1]?.game_date,
    ).toLocaleDateString()}

    {#if i === 0 || currentGameDate !== previousGameDate}
      <span class="mt-4 -mb-4 font-bold">{currentGameDate}</span>
    {/if}
    <li
      class:active={game.status === 'in_progress'}
      class="relative flex flex-col w-full gap-2"
    >
      <GamePreview {game} />
    </li>
  {/each}
</ol>
