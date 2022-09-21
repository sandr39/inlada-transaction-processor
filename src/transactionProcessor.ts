import { PriorityList } from './priorityList';
import { ITransactionFn, ITransactionProcessor, ITransactionService } from "./intefaces";

const storage = {
  massActions: {
    $success: new PriorityList<ITransactionFn>(),
    $fail: new PriorityList<ITransactionFn>(),
    $start: new PriorityList<ITransactionFn>(),
  },
  services: {},
};

const registerTransactionService = (serviceToAdd: ITransactionService, priority?: number) => {
  if (serviceToAdd.onSuccess) {
    storage.massActions.$success.add(priority, serviceToAdd.onSuccess);
  }
  if (serviceToAdd.onFail) {
    storage.massActions.$fail.add(priority, serviceToAdd.onFail);
  }
  if (serviceToAdd.onStart) {
    storage.massActions.$start.add(priority, serviceToAdd.onStart);
  }
};

const mass = async (fnList: PriorityList<ITransactionFn>, uid: string) => fnList
  .get()
  .reduce((acc, f = () => Promise.resolve()) => acc.then(() => f(uid)), Promise.resolve())
  .catch(err => {
    // logger.error(err.stack)
  });

const onStart = (uid: string) => mass(storage.massActions.$start, uid);
const onSuccess = (uid: string) => mass(storage.massActions.$start, uid);
const onFail = (uid: string) => mass(storage.massActions.$fail, uid);

export const transactionProcessor: ITransactionProcessor = {
  registerTransactionService,
  begin: onStart,
  commit: onSuccess,
  rollback: onFail,
};
