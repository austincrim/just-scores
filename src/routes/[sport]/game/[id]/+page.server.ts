import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import type { NcaaBBEvent, NcaaBBEventStats, NcaaFBEvent } from '$lib/types'
import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
  let res = await fetch(
    `${PUBLIC_SCORE_API_URL}/${params.sport}/events/${params.id}`
  )

  if (!res.ok) {
    throw error(res.status)
  }
  let game: NcaaBBEvent | NcaaFBEvent = await res.json()

  let statsRes = await fetch(`${PUBLIC_SCORE_API_URL}${game.api_uri}`)
  if (!statsRes.ok) console.error(await statsRes.text())
  let stats: NcaaBBEventStats = await statsRes.json()

  return {
    game,
    stats,
  }
}
