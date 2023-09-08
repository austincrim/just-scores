import { PUBLIC_SCORE_API_URL } from '$env/static/public'
import { error } from '@sveltejs/kit'

type League = {
  name: string | undefined
  conferences: string[]
}

export async function load({ fetch, params }) {
  const res = await fetch(
    `${PUBLIC_SCORE_API_URL}/${params.sport}/events/conferences`
  )

  if (!res.ok) {
    if (res.status === 404) {
      return { leagues: null }
    } else {
      throw error(res.status, await res.json())
    }
  }

  let leagues: League[] = await res.json()
  return {
    leagues,
  }
}
