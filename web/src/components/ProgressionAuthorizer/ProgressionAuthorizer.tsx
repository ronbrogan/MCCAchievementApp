import React from 'react';
import MccApi from '../../services/MccApi';
import MccConfig from '../../MccConfig';

interface ProgressionAuthorizerState
{
    loggedIn: boolean,
    gamertag: string
}

interface ProgressionAuthorizerProps
{
    onAuthorized: () => void | null,
    api: MccApi
}

export default class ProgressionAuthorizer extends React.Component<ProgressionAuthorizerProps, ProgressionAuthorizerState, any>
{
    private oauthUrl: string = "https://login.live.com/oauth20_authorize.srf?client_id=000000004037470C&response_type=token&scope=Xboxlive.signin&redirect_uri=" + MccConfig.OauthUrl;

    public constructor(props: any)
    {
        super(props);
        this.state = {loggedIn: this.props.api.isAuthorized(), gamertag: this.props.api.gamertag()};
        this.props.api.useOauthForReauth(this.loginToXboxLive);
    }

    private loginToXboxLive = async (event?: any) =>
    {
        // didn't come from user click, can't popup
        if(event === undefined)
        {
            window.location.href = this.oauthUrl;
            return;
        }

        let w = window.open(this.oauthUrl, undefined, "height=400,width=400,status=yes,toolbar=no,menubar=no,location=no") as Window;

        w.onload = async () => {
            var url = w.location.toString();

            var params = new URLSearchParams(url.substr(url.indexOf("#") + 1));

            let token = params.get("access_token");

            if(token !== null)
            {
                w.close();
            }
            else
            {
                w.document.clear();
                w.document.write("<h1>Error authenticating, close this window and try again</h1>");
                return;
            }

            await this.props.api.authorize(token);
            this.setState({loggedIn: this.props.api.isAuthorized(), gamertag: this.props.api.gamertag()});
            this.props.onAuthorized();
        }
    }

    private signOut = () => 
    {
        this.props.api.signOut();
    }

    render()
    {
        if(!this.state.loggedIn) {
            return (
                <p><button onClick={this.loginToXboxLive}>Login to Xbox Live to view your progression</button></p>
            )
        }

        return (
            <div>
                <button onClick={this.signOut}>Sign Out</button>
                <p>Logged in as {this.state.gamertag}</p>
            </div>  
        );
    }
}