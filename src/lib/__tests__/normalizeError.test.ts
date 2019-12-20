import ExceptionInterface from '../../ExceptionInterface';

import normalizeError from '../normalizeError';
import Exception from '../../Exception';

describe('normalizeError', () => {
    test('normalized error is instance of Exception', () => {
        const error1: Error = new Error();
        const error2: ExceptionInterface = new Exception();
        const error3: {} = {};

        expect(normalizeError(error1)).toBeInstanceOf(Exception);
        expect(normalizeError(error2)).toBeInstanceOf(Exception);
        expect(normalizeError(error3)).toBeInstanceOf(Exception);
    });

    test('normalized error has correct value with undefined message', () => {
        const error: Error = new Error();

        expect(normalizeError(error).message).toBe('Internal error');
        expect(normalizeError(error).status).toBe(500);
        expect(normalizeError(error).code).toBe('E_INTERNAL_ERROR');
        expect(normalizeError(error).data).toEqual({});
    });

    test('normalized error has correct value with message', () => {
        const error: Error = new Error('Some message');

        expect(normalizeError(error).message).toBe('Some message');
        expect(normalizeError(error).status).toBe(500);
        expect(normalizeError(error).code).toBe('E_INTERNAL_ERROR');
        expect(normalizeError(error).data).toEqual({});
    });
});