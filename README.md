## Transaction Processor

### Usage

```typescript
import { transactionProcessor } from 'inlada-transaction-processor';
import { v4 } from 'uuid';

const processInTransaction = async () => {
  const uid = v4
  await transactionProcessor.begin(uid);
  const result = doSmth();
  if(success) {
    await transactionProcessor.commit(uid);
  } else {
    await transactionProcessor.rollback(uid);
  }

  return res;
}
```
or
```typescript
const processInTransaction = async () => {
  const uid = v4
  try {
    await transactionProcessor.begin(uid);
    const result = doSmth();
    await transactionProcessor.commit(uid);
    return res;
  } catch(ex) {
    await transactionProcessor.rollback(uid);
  }

  return res;
}
```
### Register service
```typescript
import { ITransactionService, transactionProcessor } from 'inlada-transaction-processor';

const myNewTransactionHandler: ITransactionService = {
  onStart: uid => { 
    // prepare data / start transaction 
  },
  onSuccess: uid => {
    // commit changes
  },
  onFail: uid => {
    // rollback changes
  },
}

transactionProcessor.registerTransactionService(myNewTransactionHandler, priority);
```

`priority` parameter determine order of calls - higher priority will be called first, equal priorities - (not guaranteed in the future, but now) in reverse order or registering;
