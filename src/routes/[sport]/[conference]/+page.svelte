<script lang="ts">
  import { onMount } from 'svelte'
  import { beforeNavigate, invalidateAll } from '$app/navigation'
  import { navigating } from '$app/stores'
  import GamePreview from './GamePreview.svelte'

  export let data

  let invalidating: undefined | Promise<void>
  onMount(() => {
    let interval: number | undefined
    interval = setInterval(() => {
      invalidating = invalidateAll()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  })

  beforeNavigate(async () => {
    if (invalidating) await invalidating
  })
</script>

<ol
  class="flex flex-col w-full max-w-4xl gap-6 px-12 mx-auto"
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

<style>
  .active::before {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    background: theme('colors.emerald.800');
    border-radius: 100%;
    box-shadow: theme('boxShadow.sm');
    left: -20px;
    top: calc(50% - 5px);
  }
</style>
