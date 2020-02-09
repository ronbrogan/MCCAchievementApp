import MccConfig from "../MccConfig"


interface XboxAuthResponse
{
    token: string,
    gamertag: string,
    expiration: string
}

interface AchievementProgression
{
    Id : string,
    Name  : string,
    ProgressState : string,
    Progressions: string[],
    ProgressionSummary : string,
    IsUnlocked : boolean,
    UnlockedAt : string
}

export default class MccApi
{
    private apiBase = MccConfig.ApiBase;
    private authStorageKey = "MccAuthInfo";
    private tempOauthKey = "MccTemporaryOauth";

    private oauthCallback: () => void;
    private authInfo: XboxAuthResponse = {} as XboxAuthResponse;

    constructor()
    {
        var json = window.localStorage.getItem(this.authStorageKey);

        if(json !== null)
        {
            this.authInfo = JSON.parse(json);
        }

        this.oauthCallback = () => {return;};
    }

    public isAuthorized(): boolean 
    {
        return !!this.authInfo.token;
    }

    public gamertag() : string
    {
        return this.authInfo.gamertag;
    }

    public async checkForRedirectedOauth() : Promise<void> {
        var tempOauth = window.localStorage.getItem(this.tempOauthKey);

        if(tempOauth)
        {
            this.authInfo = {} as XboxAuthResponse;
            window.localStorage.removeItem(this.tempOauthKey);
            await this.authorize(tempOauth);
        }
    }

    public useOauthForReauth(callback: ()=> void) : void {
        this.oauthCallback = callback;
    }

    async authorize(oauthToken: string) : Promise<void>
    {
        const url = this.apiBase + "GetXboxLiveAuth";
        let resp = await fetch(url, { method: "post", body: oauthToken});
        this.authInfo = await resp.json();
        
        //Store for refresh
        window.localStorage.setItem(this.authStorageKey, JSON.stringify(this.authInfo));
    }

    public signOut = () =>
    {
        window.localStorage.removeItem(this.authStorageKey);
        window.location.reload();
    }

    async getAchievements(i?: number) : Promise<AchievementProgression[]> 
    {
        i = i || 0;
        if(!this.isAuthorized())
        {
            throw new Error("No auth present");
        }

        const url = this.apiBase + "GetAchievements";
        let resp = await fetch(url, { headers: {"Authorization": "Bearer " + this.authInfo.token, "Content-Type": "application/json"}});

        if(resp.ok === false)
        {
            if(new Date(this.authInfo.expiration) < new Date())
            {
                console.warn("Failure getting achievements, likely due to expired tokens. Relogging in...");
                this.oauthCallback();
                return [];
            }
            else
            {
                console.warn("Unknown error, retrying");
                if(i < 3)
                {
                    return await this.getAchievements(++i);
                }
                else
                {
                    console.error("Could not load achievements after reties, logging out");
                    this.signOut();
                }
            }
        }

        return await resp.json() as AchievementProgression[];
    }
}