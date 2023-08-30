type Status =
  'PENDING' |
  'WAITING' |
  'BLOCKED' |
  'ACTIVE'

export const RelationsStatus: {
  PENDING: Status
  WAITING: Status
  BLOCKED: Status
  ACTIVE: Status
} = {
  PENDING: 'PENDING',
  WAITING: 'WAITING',
  BLOCKED: 'BLOCKED',
  ACTIVE: 'ACTIVE'
}
