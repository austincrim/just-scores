<script lang="ts">
  import { beforeNavigate, invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
  import type { PageData } from './$types'

  export let data: PageData

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

<main class="w-full max-w-xl">
  <div class="flex items-center gap-4 text-xl">
    <div class="text-3xl flex flex-col gap-12 w-full px-8">
      <div class="flex justify-between">
        <span class="font-bold">{data.game.away_team.name}</span>
        {#if data.game.status !== 'pre_game'}
          <span class="tabular-nums">
            {data.game.box_score.score.away.score}
          </span>
        {/if}
      </div>
      <div class="flex justify-between">
        <span class="font-bold">{data.game.home_team.name}</span>
        {#if data.game.status !== 'pre_game'}
          <span class="tabular-nums">
            {data.game.box_score.score.home.score}
          </span>
        {/if}
      </div>
    </div>
    <span class="font-mono">
      {data.game.box_score.progress.string}
    </span>
  </div>
  <div class="flex justify-center mt-10">
    {data.stats.last_play.description}
  </div>
</main>
