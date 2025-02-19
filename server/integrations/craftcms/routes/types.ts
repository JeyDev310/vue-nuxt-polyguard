export interface RetourRedirect {
  from: string
  to: string
  status: number
  force: boolean
  matchType: 'exactmatch' | 'regexmatch'
}
