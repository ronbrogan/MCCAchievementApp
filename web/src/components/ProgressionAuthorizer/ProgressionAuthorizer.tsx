import React from 'react';
import MccApi from '../../services/MccApi';

interface ProgressionAuthorizerState
{
    loggedIn: boolean
}

interface ProgressionAuthorizerProps
{
    onAuthorized: () => void | null,
    api: MccApi
}

export default class ProgressionAuthorizer extends React.Component<ProgressionAuthorizerProps, ProgressionAuthorizerState, any>
{
    private loggedIn: boolean = false;
    private oauthUrl: string = "https://login.live.com/oauth20_authorize.srf?client_id=000000004037470C&response_type=token&scope=Xboxlive.signin+Xboxlive.offline_access&redirect_uri=https://localhost.mccachievement.app/oauth";

    public constructor(props: any)
    {
        super(props);

        this.state = {loggedIn: this.props.api.isAuthorized()};
    }

    private loginToXboxLive = async () =>
    {
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
            this.setState({loggedIn: this.props.api.isAuthorized()});
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
                <p>Logged in to Xbox Live!</p>
                <button onClick={this.signOut}>Sign Out</button>
            </div>  
        );
    }
}