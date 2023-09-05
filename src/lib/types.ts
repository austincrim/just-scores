export type NcaaFBEvent = {
  bowl: null
  important: boolean
  location: string
  season_week: string
  stadium: string
  total_quarters: number
  colours: Colours
  conference_names: string[]
  has_play_by_play_records: boolean
  stubhub_url: null
  week: number
  home_ranking: null
  away_ranking: null
  id: number
  event_status: string
  game_date: string
  game_type: string
  game_description: null
  tba: boolean
  updated_at: string
  bet_works_id: null
  betradar_id: string
  top_match: null
  status: string
  api_uri: string
  resource_uri: string
  away_team: Team
  home_team: Team
  red_zone: boolean
  top_25_rankings: Colours
  display_fpi: boolean
  league: League
  event_details: EventDetail[]
  tv_listings_by_country_code: TvListingsByCountryCode
  has_team_twitter_handles: boolean
  standings: Standings
  box_score: BoxScore
  odd: Odd
  subscribable_alerts: SubscribableAlert[]
}

export type NcaaBBEvent = {
  important: boolean
  location: string
  stadium: string
  away_conference: string
  home_conference: string
  colours: Colours
  conference_names: string[]
  has_play_by_play_records: boolean
  stubhub_url: null
  if_necessary: boolean
  away_ranking: number
  home_ranking: number
  id: number
  event_status: string
  game_date: string
  game_type: string
  game_description: null
  tba: boolean
  updated_at: string
  bet_works_id: null
  betradar_id: string
  top_match: null
  status: string
  api_uri: string
  resource_uri: string
  away_team: Team
  home_team: Team
  top_25_rankings: Top25_Rankings
  league: League
  event_details: EventDetail[]
  tv_listings_by_country_code: TvListingsByCountryCode
  has_team_twitter_handles: boolean
  box_score: BoxScore
  odd: Odd
  subscribable_alerts: SubscribableAlert[]
  slot: null
  tournament_name: null
}

export type Team = {
  colour_1: string
  colour_2: string
  division: string
  full_name: string
  name: string
  search_name: string
  location: string
  short_name: string
  conference: string
  has_injuries: boolean
  has_rosters: boolean
  has_extra_info: boolean
  updated_at: string
  subscription_count: number
  id: number
  abbreviation: string
  medium_name: string
  api_uri: string
  resource_uri: string
  logos: Logos
  subscribable_alerts: SubscribableAlert[]
  subscribable_alert_text: string
}

export type Logos = {
  large: string
  small: string
  w72xh72: string
  tiny: string
  facing: null
}

export type SubscribableAlert = {
  key: string
  display: string
  default: boolean
}

export type BoxScore = {
  id: number
  has_statistics: boolean
  progress: Progress
  updated_at: string
  api_uri: string
  score: Score
}

export type Progress = {
  clock_label: string
  string: string
  status: string
  event_status: string
  segment: null
  segment_string: null
  segment_description: null
  clock: string
  overtime: boolean
}

export type Score = {
  home: ScoreAway
  away: ScoreAway
  tie_game: boolean
}

export type ScoreAway = {
  score: number
}

export type Colours = {
  away: string
  home: string
}

export type EventDetail = {
  label: string
  content: string
  identifier: string
}

export type League = {
  id: number
  daily_rollover_offset: number
  daily_rollover_time: string
  default_section: string
  full_name: string
  medium_name: string
  season_type: string
  short_name: string
  slug: string
  sport_name: string
  updated_at: string
  subscription_count: number
  sex: string
  localizations: Localizations
  api_uri: string
  resource_uri: string
}

export type Localizations = {}

export type Odd = {
  away_odd: string
  home_odd: string
  id: number
  line: string
  over_under: string
  api_uri: string
}

export type Standings = {
  away: StandingsAway
  home: StandingsAway
}

export type StandingsAway = {
  streak: string
  conference: string
  conference_abbreviation: string
  conference_seed: number
  division: null
  last_ten_games_record: string
  place: number
  short_record: string
  conference_rank: number
  division_rank: null
  division_seed: null
  formatted_rank: string
  short_away_record: string
  short_home_record: string
  api_uri: string
  conference_ranking: number
  division_ranking: number
}

export type Top25_Rankings = {
  home: number
  away: number
}

export type TvListingsByCountryCode = {
  us: Me[]
}

export type Me = {
  short_name: string
  long_name: string
}

export type NcaaBBEventStats = {
  referees: null
  home_timeouts_left: null
  away_timeouts_left: null
  id: number
  has_statistics: boolean
  progress: Progress
  updated_at: string
  event: Event
  api_uri: string
  line_scores: LineScores
  score: Score
  share_url: string
  team_records: MatchupRecords
  attendance: null
  total_segments: number
  last_play: LastPlay
}

export type Event = {
  location: string
  stadium: string
  away_conference: string
  home_conference: string
  colours: Colours
  conference_names: string[]
  has_play_by_play_records: boolean
  stubhub_url: null
  if_necessary: boolean
  away_ranking: null
  home_ranking: number
  id: number
  event_status: string
  game_date: string
  game_type: string
  game_description: string
  tba: boolean
  updated_at: string
  bet_works_id: null
  betradar_id: string
  top_match: null
  status: string
  api_uri: string
  resource_uri: string
  away_team: Team
  home_team: Team
  top_25_rankings: Top25_Rankings
  league: League
  preview: string
  preview_data: PreviewData
  event_details: EventDetail[]
  tv_listings_by_country_code: TvListingsByCountryCode
  has_team_twitter_handles: boolean
  standings: Standings
}

export type PreviewData = {
  abstract: string
  headline: string
}

export type LastPlay = {
  description: string
  id: number
  minutes: number
  progress: Progress
  seconds: number
  segment: number
  api_uri: string
  event: string
  team: string
}

export type LineScores = {
  home: AwayElement[]
  away: AwayElement[]
}

export type AwayElement = {
  team_fouls: null
  id: number
  score: number
  segment: number
  segment_string: string
  updated_at: string
  api_uri: string
}

export type MatchupRecords = {
  home: TeamRecords
  away: TeamRecords
}

export type TeamRecords = {
  assists: number
  biggest_lead: number
  blocked_shots: number
  defensive_3_seconds: null
  dunks: null
  ejections_coach: null
  ejections_player: number
  fast_break_points: number
  field_goals_attempted: number
  field_goals_made: number
  flagrant_fouls: number
  free_throws_attempted: number
  free_throws_made: number
  hooks: null
  id: number
  illegal_defense: null
  jumpshots: null
  layups: null
  minutes: number
  personal_fouls: number
  personal_fouls_disqualifications: number
  points: number
  points_in_paint: number
  points_off_turnovers: number
  rebounds_dead_ball: null
  rebounds_defensive: number
  rebounds_offensive: number
  rebounds_team: number
  rebounds_team_def: null
  rebounds_team_off: null
  rebounds_total: number
  second_change_points: number
  steals: number
  team_offensive_rebounds: null
  team_defensive_rebounds: null
  technical_fouls_bench: null
  technical_fouls_coach: number
  technical_fouls_player: number
  technical_fouls_team: null
  three_point_field_goals_attempted: number
  three_point_field_goals_made: number
  tipins: null
  turnovers: number
  turnovers_team: number
  updated_at: string
  api_uri: string
  field_goals_percentage: string
  free_throws_percentage: string
  three_point_field_goals_percentage: string
}
