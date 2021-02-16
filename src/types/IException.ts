import IExceptionData from './IExceptionData';
import IExceptionJSON from './IExceptionJSON';

interface IException<T extends IExceptionData = IExceptionData> extends Error {
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
    data: T;

    /**
     * Stack trace.
     */
    stack?: string;

    /**
     * Returns a JSON representing the specified error.
     */
    toJSON(): IExceptionJSON<T>;
}

export default IException;
