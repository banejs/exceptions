import Exception from '../Exception';
import IException from '../types/IException';
import IExceptionData from '../types/IExceptionData';

interface ICustomExceptionData {
    foo: string;
}

interface ICustomException<T = ICustomExceptionData> extends IException<T> {}

class CustomException<T = ICustomExceptionData> extends Exception<T> implements ICustomException<T> {
    public name: string = 'CustomException';

    public constructor(message?: string, code: string = 'E_CUSTOM_EXCEPTION', status: number = 503, data?: T) {
        super(message || 'Custom exception message', code, status, data);

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, CustomException.prototype);
    }
}

describe('Exception', (): void => {
    describe('#constructor(message, code, status, data)', (): void => {
        test('should create instance of an Error and Exception', (): void => {
            const e: IException = new Exception();

            expect(e).toBeInstanceOf(Error);
            expect(e).toBeInstanceOf(Exception);
        });

        test('should create instance with default parameters', (): void => {
            const e: IException = new Exception();

            expect(e.message).toBe('Internal error');
            expect(e.name).toBe('Exception');
            expect(e.code).toBe('E_INTERNAL_ERROR');
            expect(e.status).toBe(500);
            expect(e.data).toStrictEqual({});
            expect(typeof e.stack).toBe('string');
        });

        test('should create instance with user-defined parameters', (): void => {
            const data: { foo: string } = { foo: 'bar' };
            const e: IException = new Exception('Not Found', 'E_NOT_FOUND', 404, data);

            expect(e.message).toBe('Not Found');
            expect(e.name).toBe('Exception');
            expect(e.code).toBe('E_NOT_FOUND');
            expect(e.status).toBe(404);
            expect(e.data).toStrictEqual(data);
            expect(typeof e.stack).toBe('string');
        });

        test('should create instance with circular dependencies in data', (): void => {
            const data: IExceptionData = { b: 1, a: 0 };
            data.data = data;
            const e: IException = new Exception('Circular data', 'E_CIRCULAR_DATA', 500, data);

            expect(e.message).toBe('Circular data');
            expect(e.name).toBe('Exception');
            expect(e.code).toBe('E_CIRCULAR_DATA');
            expect(e.status).toBe(500);
            expect(e.data).toStrictEqual({ b: 1, a: 0, data: '[Circular]' });
            expect(typeof e.stack).toBe('string');
        });
    });

    describe('#toJSON()', (): void => {
        test('should return object with default parameters', (): void => {
            const e: IException = new Exception();

            expect(e.toJSON()).toEqual({
                name: 'Exception',
                message: 'Internal error',
                code: 'E_INTERNAL_ERROR',
                status: 500,
                data: {}
            });
        });

        test('should return object with user-defined parameters', (): void => {
            const data: { foo: string } = { foo: 'bar' };
            const e: IException = new Exception('Not Found', 'E_NOT_FOUND', 404, data);

            expect(e.toJSON()).toEqual({
                name: 'Exception',
                message: 'Not Found',
                code: 'E_NOT_FOUND',
                status: 404,
                data
            });
        });
    });

    describe('Error class does not have `captureStackTrace` method', (): void => {
        // @ts-ignore Ignore typescript error "Property 'captureStackTrace' does not exist on type 'Error'.
        let captureStackTrace: Error['captureStackTrace'] | undefined;

        beforeAll((): void => {
            captureStackTrace = Error.captureStackTrace;
            // @ts-ignore
            // tslint:disable-next-line
            delete Error.captureStackTrace;
        });

        afterAll((): void => {
            Error.captureStackTrace = captureStackTrace;
        });

        test('should capture stack trace', (): void => {
            const e: IException = new Exception();

            expect(typeof e.stack).toBe('string');
        });
    });

    describe('Custom exception', (): void => {
        test('data should equal to custom data interface', (): void => {
            const data: ICustomExceptionData = { foo: 'bar' };
            const e: ICustomException = new CustomException('Custom exception message', 'E_CUSTOM_EXCEPTION', 499, data);

            expect(e.toJSON()).toEqual({
                name: 'CustomException',
                message: 'Custom exception message',
                code: 'E_CUSTOM_EXCEPTION',
                status: 499,
                data
            });
        });
    });
});
