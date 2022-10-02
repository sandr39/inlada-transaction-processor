# inlada-transaction-processor

Usage:

```typescript
import { ITransactionService, transactionProcessor } from 'inlada-transaction-processor';

const myNewTransactionHandler: ITransactionService = {
  onStart: uid => {},
  onSuccess: uid => {},
  onFail: uid => {},
}

transactionProcessor.registerTransactionService(myNewTransactionHandler);
```

Methods of `myNewTransactionHandler` will be called on start event processing, on success and of fail result, with event uid. (see inladajs package)
