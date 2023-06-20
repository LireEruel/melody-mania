export interface Music {
  _id: string
  music_name: string
  singer: string
  tags: undefined | Array<string>
  lyrics: undefined | Array<string>
  play_url: string
}
