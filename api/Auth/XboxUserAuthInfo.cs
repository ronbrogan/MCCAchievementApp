using System;

namespace MccAchievementApp.Api.Auth
{
    public class XboxUserAuthInfo
	{
		public string AuthToken { get; set; }
		public string Xuid { get; set; }
		public string Gamertag { get; set; }
		public DateTime Expiration { get; set; }
	}

}
