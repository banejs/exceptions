import IException from '../../types/IException';

import Exception from '../../Exception';
import normalizeError from '../normalizeError';

describe('normalizeError', (): void => {
    test('normalized error is instance of Exception', (): void => {
        const error1: Error = new Error();
        const error2: IException = new Exception();
        const error3: {} = {};

        expect(normalizeError(error1)).toBeInstanceOf(Exception);
        expect(normalizeError(error2)).toBeInstanceOf(Exception);
        expect(normalizeError(error3)).toBeInstanceOf(Exception);
    });

    test('normalized error has correct value with undefined message', (): void => {
        const error: Error = new Error();

        expect(normalizeError(error).message).toBe('Internal error');
        expect(normalizeError(error).status).toBe(500);
        expect(normalizeError(error).code).toBe('E_INTERNAL_ERROR');
        expect(normalizeError(error).data).toEqual({});
    });

    test('normalized error has correct value with message', (): void => {
        const error: Error = new Error('Some message');

        expect(normalizeError(error).message).toBe('Some message');
        expect(normalizeError(error).status).toBe(500);
        expect(normalizeError(error).code).toBe('E_INTERNAL_ERROR');
        expect(normalizeError(error).data).toEqual({});
    });
});
