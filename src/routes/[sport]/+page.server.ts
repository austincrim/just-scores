import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NFLEvent, NcaaFBEvent, NcaaBBEvent } from '$lib/types'

export async function load({ params, fetch, setHeaders, parent, url }) {
  const { events } = await parent()

  const weekId = url.searchParams.get('w')
  const weekToFetch = weekId
    ? events.current_season.find((w: any) => w.id === weekId)
    : events.current_group

  if (!weekToFetch?.event_ids || weekToFetch?.event_ids.length === 0) {
    return {
      games: [],
    }
  }
  let gamesRes = await fetch(
    `${PUBLIC_SCORE_API_URL}/${
      params.sport
    }/events?id.in=${weekToFetch.event_ids.join(',')}`
  )

  let games: NFLEvent[] | NcaaBBEvent[] | NcaaFBEvent[] = await gamesRes.json()
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
