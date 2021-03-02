import safeStringify from 'fast-safe-stringify';

import IException from './types/IException';
import IExceptionData from './types/IExceptionData';
import IExceptionJSON from './types/IExceptionJSON';

/**
 * Exception is a neutral class extend the Error object.
 *
 * @author Anton Drobot
 */
export default class Exception<T extends IExceptionData = IExceptionData> extends Error implements IException<T> {
    /**
     * Error name.
     */
    public name: string = 'Exception';

    /**
     * A human-readable description of the error.
     */
    public message: string;

    /**
     * Error unique code.
     */
    public code: string;

    /**
     * Error status.
     */
    public status: number;

    /**
     * Custom fields of error.
     */
    public data: T;

    /**
     * Stack trace.
     */
    public stack?: string;

    // @ts-ignore Here "T" is extending of IExceptionData, and the default value for "data" ({}) is always correct.
    public constructor(message?: string, code: string = 'E_INTERNAL_ERROR', status: number = 500, data: T = {}) {
        // Because default value for argument didn't work if argument value is empty string.
        super(message || 'Internal error');

        this.message = message || 'Internal error';
        this.code = code;
        this.status = status;
        this.data = JSON.parse(safeStringify(data));
        this.stack = (new Error(message)).stack;

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, Exception.prototype);
    }

    public toJSON(): IExceptionJSON<T> {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            status: this.status,
            data: this.data
        };
    }
}
