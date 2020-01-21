import IExceptionData from './IExceptionData';
import IExceptionJSON from './IExceptionJSON';

interface IException extends Error {
    /**
     * Error name.
     */
    name: string;

    /**
     * A human-readable description of the error.
     */
    message: string;

    /**
     * Error unique code.
     */
    code: string;

    /**
     * Error status.
     */
    status: number;

    /**
     * Custom fields of error.
     */
    data: IExceptionData;

    /**
     * Stack trace.
     */
    stack?: string;

    /**
     * Returns a JSON representing the specified error.
     */
    toJSON(): IExceptionJSON;
}

interface IExceptionConstructor {
    new(message?: string, code?: string, status?: number, data?: IExceptionData): IException;
}

declare const IException: IExceptionConstructor;

export default IException;
