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
