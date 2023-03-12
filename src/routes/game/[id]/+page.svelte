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

<nav class="self-start px-8 pb-12">
  <a href="/">&larr; Back</a>
</nav>
<main class="w-full max-w-2xl">
  <div class="flex items-center gap-6 text-xl">
    <div class="text-4xl flex flex-col gap-6 w-full px-12">
      <div class="flex justify-between items-center">
        <span class="font-bold flex items-center gap-2">
          <img
            src={data.game.away_team.logos.small}
            alt="{data.game.away_team.name} logo"
            class="h-16 w-16 object-cover"
          />
          {data.game.away_team.name}
        </span>
        {#if data.game.status !== 'pre_game'}
          <span class="tabular-nums">
            {data.game.box_score.score.away.score}
          </span>
        {/if}
      </div>
      <div class="flex justify-between items-center">
        <span class="font-bold flex items-center gap-2">
          <img
            src={data.game.home_team.logos.small}
            alt="{data.game.home_team.name} logo"
            class="h-16 w-16 object-cover"
          />
          {data.game.home_team.name}
        </span>
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
  <div class="flex justify-center mt-16 text-sm">
    {data.stats.last_play.description}
  </div>
</main>
