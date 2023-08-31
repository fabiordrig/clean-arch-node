export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Result = undefined | {
    id: string
    name?: string
  }

  export type Params = {
    email: string
  }
}

export interface CreateFacebookAccountRepository {
  createFromFacebook: (params: CreateFacebookAccountRepository.Params) => Promise<CreateFacebookAccountRepository.Result>
}

export namespace CreateFacebookAccountRepository {
  export type Result = {
    id: string
    name?: string
  }

  export type Params = {
    email: string
    name: string
    facebookId: string
  }
}
