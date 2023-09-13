export type AuthorizationCodeRequestInfoProps = {
    authorization_endpoint: string;
    client_id: string;
    redirect_uri: string;
    requested_scopes?: string[];
};
export type AuthorizationCodeRequestInfoReturn = {
    url: string;
    state: string;
    code_verifier: string;
};
export declare function exchangeCodeForAccessToken({ query_params, }: {
    query_params: URLSearchParams;
}): undefined;
export type Config = {
    origin: string;
    client_id: string;
    redirect_uri: string;
    authorization_endpoint: string;
    token_endpoint: string;
    requested_scopes: string[];
};
export declare function authorize(config: Config): Promise<void>;
export declare function registerOAuth2Worker(): Promise<void>;
