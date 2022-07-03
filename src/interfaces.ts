export interface iAuthenticator {
    authenticate( identifier: string, secret: string ): Promise<Boolean>
};