using MccAchievementApp.Api.Auth;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MccAchievementApp.Api
{
	public class XboxApiClient
    {
		private const string stub = "https://achievements.xboxlive.com/users/xuid({0})/achievements?titleId={1}&maxItems=1000&continuationToken={2}";
		private const string mccTitleId = "1144039928";
		private HttpClient httpClient;
		public JsonSerializerOptions jsonOptions;

		public XboxApiClient(HttpClient client)
		{
			httpClient = client;

			jsonOptions = new JsonSerializerOptions()
			{
				PropertyNameCaseInsensitive = true,
				AllowTrailingCommas = true,
				ReadCommentHandling = JsonCommentHandling.Skip,
				IgnoreNullValues = true
			};
			jsonOptions.Converters.Add(new JsonStringEnumConverter());
		}

		public async Task<ApiResponse<Achievement>> GetAchievementsAsync(XboxUserAuthInfo info, string continuationToken = null)
		{
			var url = string.Format(stub, info.Xuid, mccTitleId, continuationToken);

			var request = new HttpRequestMessage(HttpMethod.Get, url);
			request.Headers.Authorization = new AuthenticationHeaderValue("XBL3.0", info.AuthToken);
			request.Headers.Add("x-xbl-contract-version", "4");

			var response = await httpClient.SendAsync(request);

			var content = await response.Content.ReadAsStringAsync();

			return JsonSerializer.Deserialize<ApiResponse<Achievement>>(content, jsonOptions);
		}
	}

	public class ApiResponse<T>
	{
		public T[] Achievements { get; set; }

		public PagingInfo PagingInfo { get; set; }
	}

	public class PagingInfo
	{
		public string ContinuationToken { get; set; }
		public int TotalRecords { get; set; }
	}
}
