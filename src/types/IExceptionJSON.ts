import IExceptionData from './IExceptionData';

export default interface IExceptionJSON<T extends IExceptionData = IExceptionData> {
    name: string;
    message: string;
    code: string;
    status: number;
    data: T;
}
