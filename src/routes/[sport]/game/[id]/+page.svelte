<script lang="ts">
  import { beforeNavigate, invalidateAll } from '$app/navigation'
  import { onMount } from 'svelte'
  import FootballScore from './FootballScore.svelte'
  import type { NFLEvent, NcaaBBEvent, NcaaFBEvent } from '$lib/types'
    import BasketballScore from './BasketballScore.svelte'

  export let data

  function isFootballEvent(
    game: typeof data.game
  ): game is NcaaFBEvent | NFLEvent {
    return game.api_uri.includes('nfl') || game.api_uri.includes('ncaaf')
  }

  function isBasketballEvent(
    game: typeof data.game
  ): game is NcaaBBEvent {
    return game.api_uri.includes('ncaab')
  }

  let invalidating: undefined | Promise<void>
  onMount(() => {
    let interval: number | undefined
    interval = setInterval(() => {
      invalidating = invalidateAll()
    }, 10000)

    return () => {
      clearInterval(interval)
    }
  })

  beforeNavigate(async () => {
    if (invalidating) await invalidating
  })
</script>

{#snippet teamLine(line)}
  <div class="flex items-center justify-between">
    <span class="flex items-center justify-between gap-2 font-bold">
      <img
        src={line.team.logos.small}
        alt="{line.team.name} logo"
        class="object-cover w-12 h-12"
      />
      {#if line.ranking}
        <span class="text-sm">{line.ranking}</span>
      {/if}
      <span
        class:text-amber-700={isFootballEvent(data.game) &&
          data.game.box_score?.team_in_possession?.name ===
            line.team.name}
        class="text-2xl"
      >
        {line.team.name}
      </span>
    </span>
    {#if line && line.score}
      <span class="text-3xl tabular-nums">
        {line.score}
      </span>
    {/if}
  </div>
{/snippet}

<main class="px-4 mx-auto mt-14">
  <div class="flex items-center gap-12 text-xl">
    <div class="flex flex-col w-full gap-8">
      {@render teamLine({team: data.game.away_team, score: data.game.box_score?.score?.away?.score, ranking: data.game.away_ranking})}
      {@render teamLine({team: data.game.home_team, score: data.game.box_score?.score?.home?.score, ranking: data.game.home_ranking})}
    </div>
    <div class="flex flex-col items-center gap-1 text-center">
      {#if data.game.status !== 'pre_game'}
        <span class="font-mono min-w-fit whitespace-nowrap">
          {data.game.box_score.progress.string}
        </span>
      {:else}
        <span class="whitespace-nowrap">
          {new Date(data.game.game_date).toLocaleTimeString(undefined, {
            timeStyle: 'short',
          })}
        </span>
      {/if}
      {#if data.game.tv_listings_by_country_code?.us}
        <span class="text-base text-center">
          {data.game.tv_listings_by_country_code.us[0].long_name}
        </span>
      {/if}
    </div>
  </div>
  <section>
    {#if isFootballEvent(data.game)}
      <FootballScore game={data.game} />
    {/if}
    {#if isBasketballEvent(data.game)}
      <BasketballScore game={data.game} stats={data.stats} />
    {/if}
  </section>
</main>
