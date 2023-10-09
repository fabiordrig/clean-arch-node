type AccountData = {
  id?: string
  name?: string
}

type FacebookData = {
  id?: string
  name: string
  facebookId: string
  email: string
}

export class FacebookAccount {
  id?: string
  name: string
  email: string
  facebookId: string

  constructor(fbData: FacebookData, accountData?: AccountData) {
    this.id = accountData?.id
    this.name = accountData?.name ?? fbData.name
    this.email = fbData.email
    this.facebookId = fbData.facebookId
  }

  updateWithFacebook(facebookData: { name?: string, facebookId: string, email: string }): void {
    this.name = facebookData.name ?? this.name
    this.facebookId = facebookData.facebookId
    this.email = facebookData.email
  }
}
