


interface XboxAuthResponse
{
    token: string,
    gamertag: string,
    expiration: Date
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
    private apiBase = "https://mccachievement.app/api/";
    private authStorageKey = "MccAuthInfo";

    private authInfo: XboxAuthResponse = {} as XboxAuthResponse;

    constructor()
    {
        if(process.env.NODE_ENV !== "production")
        {
            this.apiBase = "http://mccachievement.app/api/";
        }

        var json = window.localStorage.getItem(this.authStorageKey);

        if(json !== null)
        {
            this.authInfo = JSON.parse(json);
        }
    }

    public isAuthorized(): boolean 
    {
        return !!this.authInfo.token;
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

    async getAchievements() : Promise<AchievementProgression[]> 
    {
        if(!this.isAuthorized())
        {
            throw new Error("No auth present");
        }

        const url = this.apiBase + "GetAchievements";
        let resp = await fetch(url, { headers: {"Authorization": "Bearer " + this.authInfo.token, "Content-Type": "application/json"}});

        if(resp.ok === false)
        {
            throw new Error("Error getting achievements: " + resp.status);
        }

        return await resp.json() as AchievementProgression[];
    }
}