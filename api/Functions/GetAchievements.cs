using MccAchievementApp.Api.Auth;
using MccAchievementApp.Api.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MccAchievementApp.Api.Functions
{
    public static class GetAchievements
    {
        private const string AuthHeader = "Authorization";
        private const string AuthHeaderScheme = "Bearer ";

        [FunctionName("GetAchievements")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            if(req.Headers.TryGetValue(AuthHeader, out var authHeaders) == false)
            {
                return new UnauthorizedResult();
            }

            XboxUserAuthInfo authInfo = null;

            foreach(var header in authHeaders)
            {
                if (header.StartsWith(AuthHeaderScheme) == false)
                    continue;

                var token = header.Substring(AuthHeaderScheme.Length);

                try
                {
                    var json = Crypto.Decrypt(token);
                    authInfo = JsonSerializer.Deserialize<XboxUserAuthInfo>(json);
                }
                catch(Exception e)
                {
                    log.LogError(e, "Failure parsing Authorization header");
                    return new UnauthorizedResult();
                }
            }

            if(authInfo == null)
            {
                return new UnauthorizedResult();
            }

			var client = new HttpClient();
			var xbox = new XboxApiClient(client);

            var achievements = new List<Achievement>();

            string continuationToken = null;
            do
            {
                var resp = await xbox.GetAchievementsAsync(authInfo, continuationToken);
                achievements.AddRange(resp.Achievements);
                continuationToken = resp.PagingInfo.ContinuationToken;
            } while (continuationToken != null);

            var vms = achievements.Select(a => new AchievementViewModel(a));

            return new OkObjectResult(vms);
        }
    }

}
