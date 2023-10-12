import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import { error } from '@sveltejs/kit'

type League = {
  name: string | undefined
  conferences: string[]
}

export async function load({ fetch, params }) {
  let [leaguesRes, scheduleRes] = await Promise.all([
    fetch(`${PUBLIC_SCORE_API_URL}/${params.sport}/events/conferences`),
    fetch(`${PUBLIC_SCORE_API_URL}/${params.sport}/schedule?utc_offset=-21600`),
  ])

  let leagues: League[] | null = null
  if (!leaguesRes.ok) {
    if (leaguesRes.status === 404) {
      leagues = null
    } else {
      let message = await leaguesRes.json()
      console.error(message)
      throw error(leaguesRes.status, message)
    }
  } else {
    leagues = await leaguesRes.json()
  }

  if (!scheduleRes.ok) {
    let message = await scheduleRes.json()
    console.error(message)
    throw error(scheduleRes.status, message)
  }

  let events = await scheduleRes.json()

  return {
    leagues,
    events,
  }
}
