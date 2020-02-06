using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Security.Cryptography;
using MccAchievementApp.Api.Auth;
using System.Text.Json;
using System;
using MccAchievementApp.Api.ViewModels;

namespace MccAchievementApp.Api.Functions
{

    public static class GetXboxLiveAuth
    {
        [FunctionName("GetXboxLiveAuth")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Entering GetXboxLiveAuth");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            var client = new HttpClient();
            var xboxAuth = new XboxLiveAuthorizer(client);

            try
            {
                var info = await xboxAuth.GetAuthInfoAsync(requestBody);
                var infoJson = JsonSerializer.Serialize(info);
                var result = new AuthResultViewModel
                {
                    Token = Crypto.Encrypt(infoJson),
                    Gamertag = info.Gamertag,
                    Expiration = info.Expiration
                };
                return new OkObjectResult(result);
            }
            catch (Exception e)
            {
                log.LogError(e, "Exception during token retrieval");
                return new UnauthorizedResult();
            }
        }
    }
}
