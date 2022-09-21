export type ITransactionFn = (uid: string) => Promise<void>;

export interface ITransactionService {
  onStart?: ITransactionFn,
  onSuccess?: ITransactionFn,
  onFail?: ITransactionFn,
}

export interface ITransactionProcessor {
  registerTransactionService: (serviceToAdd: ITransactionService, priority?: number) => void,
  begin: ITransactionFn,
  commit: ITransactionFn,
  rollback: ITransactionFn,
}
