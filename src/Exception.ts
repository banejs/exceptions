import IException from './types/IException';
import IExceptionData from './types/IExceptionData';
import IExceptionJSON from './types/IExceptionJSON';

/**
 * Exception is a neutral class extend the Error object.
 *
 * @author Anton Drobot
 */
export default class Exception extends Error implements IException {
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
    public data: IExceptionData;

    /**
     * Stack trace.
     */
    public stack?: string;

    public constructor(message?: string, code: string = 'E_INTERNAL_ERROR', status: number = 500, data: IExceptionData = {}) {
        // Because default value for argument didn't work if argument value is empty string.
        super(message || 'Internal error');

        this.message = message || 'Internal error';
        this.code = code;
        this.status = status;
        this.data = data;
        this.stack = (new Error(message)).stack;

        // Set the prototype explicitly.
        // @see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Reflect.setPrototypeOf(this, Exception.prototype);
    }

    public toJSON(): IExceptionJSON {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            status: this.status,
            data: this.data
        };
    }
}
