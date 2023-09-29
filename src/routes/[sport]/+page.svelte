<script lang="ts">
  import { navigating } from '$app/stores'
  import GamePreview from '$lib/components/GamePreview.svelte'

  export let data
</script>

{#if !data.leagues}
  <ol
    class="flex flex-col w-full gap-6 px-12 mx-auto mt-16"
    class:opacity-50={$navigating}
  >
    {#each data.games as game, i}
      {@const currentGameDate = new Date(game.game_date).toLocaleDateString()}
      {@const previousGameDate = new Date(
        data.games[i - 1]?.game_date
      ).toLocaleDateString()}

      {#if i === 0 || currentGameDate !== previousGameDate}
        <span class="mt-4 font-bold">{currentGameDate}</span>
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
</style>
