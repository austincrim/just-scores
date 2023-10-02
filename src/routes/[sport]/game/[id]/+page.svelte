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

  console.log(data.stats)
</script>

<main class="px-4 mx-auto mt-24">
  <div class="flex items-center gap-12 text-xl">
    <div class="flex flex-col w-full gap-2">
      <div class="flex items-center justify-between">
        <span class="flex items-center justify-between gap-2 font-bold">
          <img
            src={data.game.away_team.logos.small}
            alt="{data.game.away_team.name} logo"
            class="object-cover w-12 h-12"
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
            class="object-cover w-12 h-12"
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
  <section>
    {#if data.stats?.box_score?.last_play.details}
      <div class="mt-12 text-sm">
        <h2 class="text-lg">Last Play</h2>
        <p class="mt-2">
          {data.stats?.box_score?.last_play.details}
        </p>
      </div>
    {/if}
    <div class="flex flex-col gap-6 mt-12 text-xs">
      {#if data.stats?.box_score?.scoring_summary}
        <h2 class="text-xl">Scoring Summary</h2>
        {#each data.stats?.box_score?.scoring_summary as summary}
          <span class="flex items-center gap-2">
            {#if summary.scorer?.headshots?.small}
              <img
                class="object-cover w-8 h-8 rounded-full"
                src={summary.scorer?.headshots?.small}
              />
            {:else}
              <div />
            {/if}
            <p>{summary.summary_text}</p>
          </span>
        {/each}
      {/if}
    </div>
  </section>
</main>
