<script lang="ts">
  import { onMount } from 'svelte'
  import { invalidateAll } from '$app/navigation'
  import { navigating } from '$app/stores'
  import GamePreview from './GamePreview.svelte'
  import type { PageData } from './$types'

  export let data: PageData
  onMount(() => {
    let interval = setInterval(() => {
      invalidateAll()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<ol class="grid gap-6 w-full px-12 max-w-2xl" class:opacity-50={$navigating}>
  {#each data.games as game, i}
    {@const currentGameDate = new Date(game.game_date).toLocaleDateString()}
    {@const previousGameDate = new Date(
      data.games[i - 1]?.game_date
    ).toLocaleDateString()}

    {#if i === 0 || currentGameDate !== previousGameDate}
      <span class="font-bold mt-4">{currentGameDate}</span>
    {/if}
    <li
      class:active={game.status === 'in_progress'}
      class="flex flex-col gap-2 relative"
    >
      <GamePreview {game} />
    </li>
  {/each}
</ol>

<style>
  .active::before {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    background: theme('colors.emerald.400');
    border-radius: 100%;
    box-shadow: theme('boxShadow.sm');
    left: -20px;
    top: calc(50% - 5px);
  }
</style>
