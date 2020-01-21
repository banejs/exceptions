import IException from '../types/IException';

import Exception from '../Exception';

/**
 * Normalize error object by setting required parameters if they does not exists.
 */
export default function normalizeError(error: Error | IException | any): IException {
    if (!(error instanceof Exception)) {
        const normalizedError: IException = new Exception(error.message);

        if (error.stack) {
            normalizedError.stack = error.stack;
        }

        return normalizedError;
    }

    return error;
}
