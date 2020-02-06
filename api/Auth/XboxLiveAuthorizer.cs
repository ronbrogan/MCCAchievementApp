using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MccAchievementApp.Api.Auth
{
	public class XboxLiveAuthorizer
	{
		private HttpClient client;

		public XboxLiveAuthorizer(HttpClient client)
		{
			this.client = client;
		}

		public async Task<XboxUserAuthInfo> GetAuthInfoAsync(string userToken)
		{
			var userAuth = await GetUserAuthWithUserToken(userToken);

			return await GetXstsAuth(userAuth);
		}

		private async Task<string> GetUserAuthWithUserToken(string userToken)
		{
			var url = "https://user.auth.xboxlive.com/user/authenticate";

			var body = new
			{
				RelyingParty = "http://auth.xboxlive.com",
				TokenType = "JWT",
				Properties = new
				{
					AuthMethod = "RPS",
					SiteName = "user.auth.xboxlive.com",
					RpsTicket = $"d={userToken}&p=",
				}
			};

			var bodyString = JsonSerializer.Serialize(body);
			var resp = await client.PostAsync(url, new StringContent(bodyString, Encoding.UTF8, "application/json"));

			if (resp.IsSuccessStatusCode == false)
			{
				throw new Exception("Error getting user auth");
			}

			var content = await resp.Content.ReadAsStringAsync();

			var auth = JsonSerializer.Deserialize<AuthResponse>(content);

			return auth.Token;
		}

		private async Task<XboxUserAuthInfo> GetXstsAuth(string jwt)
		{
			var url = "https://xsts.auth.xboxlive.com/xsts/authorize";

			var body = new
			{
				RelyingParty = "http://xboxlive.com",
				TokenType = "JWT",
				Properties = new
				{
					UserTokens = new[] { jwt },
					SandboxId = "RETAIL"
				}
			};

			var bodyString = JsonSerializer.Serialize(body);
			var resp = await client.PostAsync(url, new StringContent(bodyString, Encoding.UTF8, "application/json"));

			if (resp.IsSuccessStatusCode == false)
			{
				throw new Exception("Error getting xsts auth");
			}

			var content = await resp.Content.ReadAsStringAsync();

			var auth = JsonSerializer.Deserialize<AuthResponse>(content);

			var claims = auth.DisplayClaims.xui.FirstOrDefault();

			if (claims == null)
			{
				throw new Exception("Unable to get claims from auth");
			}

			var authHeader = $"x={claims.uhs};{auth.Token}";

			return new XboxUserAuthInfo
			{
				AuthToken = authHeader,
				Gamertag = claims.gtg,
				Xuid = claims.xid,
				Expiration = auth.NotAfter
			};
		}

		private class AuthResponse
		{
			public DateTime IssueInstant { get; set; }
			public DateTime NotAfter { get; set; }
			public string Token { get; set; }
			public Displayclaims DisplayClaims { get; set; }
		}

		private class Displayclaims
		{
			public Xui[] xui { get; set; }
		}

		private class Xui
		{
			public string gtg { get; set; }
			public string xid { get; set; }
			public string uhs { get; set; }
			public string agg { get; set; }
			public string usr { get; set; }
			public string utr { get; set; }
			public string prv { get; set; }
		}
	}

}
