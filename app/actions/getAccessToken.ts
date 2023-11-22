import getSession from "./getSession";

export default async function getAccessToken(){
    const session = await getSession();
    return session?.tokens?.accessToken;
}

