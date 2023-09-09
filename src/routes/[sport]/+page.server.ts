import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NFLEvent, NcaaBBEvent, NcaaFBEvent } from '$lib/types'
import { error, redirect } from '@sveltejs/kit'

export async function load({ params, fetch, setHeaders, parent }) {
  const { leagues } = await parent()
  if (leagues && leagues.length > 0) {
    throw redirect(301, `${params.sport}/Top 25`)
  }

  let res = await fetch(
    `${PUBLIC_SCORE_API_URL}/${params.sport}/schedule?utc_offset=-21600`
  )

  if (!res.ok) {
    let message = await res.json()
    throw error(res.status, message)
  }

  let events = await res.json()
  let gamesRes = await fetch(
    `${PUBLIC_SCORE_API_URL}/${
      params.sport
    }/events?id.in=${events.current_group.event_ids.join(',')}`
  )

  let games: NFLEvent[] = await gamesRes.json()
  console.log(games[0].stadium)
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
