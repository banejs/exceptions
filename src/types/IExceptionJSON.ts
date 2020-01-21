import IExceptionData from './IExceptionData';

export default interface IExceptionJSON {
    name: string;
    message: string;
    code: string;
    status: number;
    data: IExceptionData;
}
