import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NcaaBBEvent, NcaaFBEvent } from '$lib/types'

export async function load({ params, fetch, setHeaders }) {
  let res = await fetch(
    `${PUBLIC_SCORE_API_URL}/${params.sport}/schedule?conference=${
      params.conference ?? 'Top%2025'
    }&utc_offset=-21600`
  )

  if (!res.ok) console.error(await res.text())

  let events = await res.json()
  let gamesRes = await fetch(
    `${PUBLIC_SCORE_API_URL}/${
      params.sport
    }/events?id.in=${events.current_group.event_ids.join(',')}`
  )

  let games: typeof params.sport extends 'ncaab'
    ? NcaaBBEvent[]
    : NcaaFBEvent[] = await gamesRes.json()

  setHeaders({
    'Cache-Control': 's-maxage=10',
  })

  return {
    games: games.sort(
      (a, b) =>
        new Date(a.game_date).valueOf() - new Date(b.game_date).valueOf()
    ),
  }
}
