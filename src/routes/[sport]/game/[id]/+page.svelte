<script lang="ts">
  import { beforeNavigate, invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'

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

<main class="max-w-md mx-auto mt-24">
  <div class="flex items-center gap-6 text-xl">
    <div class="flex flex-col w-full gap-6 px-12 text-4xl">
      <div class="flex items-center justify-between">
        <span class="flex items-center gap-2 font-bold">
          <img
            src={data.game.away_team.logos.small}
            alt="{data.game.away_team.name} logo"
            class="object-cover w-16 h-16"
          />
          {data.game.away_team.name}
        </span>
        {#if data.game.status !== 'pre_game'}
          <span class="tabular-nums">
            {data.game.box_score.score.away.score}
          </span>
        {/if}
      </div>
      <div class="flex items-center justify-between">
        <span class="flex items-center gap-2 font-bold">
          <img
            src={data.game.home_team.logos.small}
            alt="{data.game.home_team.name} logo"
            class="object-cover w-16 h-16"
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
    {#if data.game.box_score}
      <span class="font-mono">
        {data.game.box_score.progress.string}
      </span>
    {/if}
  </div>
  {#if data.stats?.last_play?.description}
    <div class="flex justify-center mt-16 text-sm">
      {data.stats.last_play.description}
    </div>
  {/if}
</main>
