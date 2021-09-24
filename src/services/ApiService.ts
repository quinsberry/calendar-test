import { UserApi } from '../api/UserApi';
import { assertType } from '../utils/type-guards';

interface ApiMethodConfig<Options> {
    prediction: (value: any) => boolean;
    data: Options;
}

type Writeable<T extends { [x: string]: any }, K extends string> = {
    [P in K]: T[P];
}

type OmitPromise<T> = T extends Promise<infer U> ? U : never;
type ApiErrorsHandlerTypes = typeof UserApi;

export class ApiService {

    static user = ApiService.ApiErrorsHandler(UserApi);

    /**
     * Method that is used to handle the difference between expected and actual server response.
     * If difference was found it throws an error.
     */
    private static ApiErrorsHandler(apiMethods: { [Key in keyof ApiErrorsHandlerTypes]: ApiErrorsHandlerTypes[Key] }) {
        return (Object.entries(apiMethods) as [keyof ApiErrorsHandlerTypes, ApiErrorsHandlerTypes[keyof ApiErrorsHandlerTypes]][])
            .reduce((acc, [action, fn]) => {
                // @ts-ignore ts cannot match value of the object to its key here
                acc[action] = async ({ prediction, data }: ApiMethodConfig<Parameters<typeof fn>[0]>) => {
                    // @ts-ignore ts cannot match an appropriate data to current function
                    const response = await fn(data);
                    assertType<typeof response.data>(response.data, prediction, 'The received data from the server is different from the expected one');
                    return response;
                };
                return acc;
            }, {} as Writeable<{[key in keyof ApiErrorsHandlerTypes]: ({ prediction, data }: ApiMethodConfig<Parameters<ApiErrorsHandlerTypes[key]>[0]>)
                     => Promise<OmitPromise<ReturnType<ApiErrorsHandlerTypes[key]>>>}, keyof ApiErrorsHandlerTypes>
            );
    }
}
