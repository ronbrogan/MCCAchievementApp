using System;
using System.Collections.Generic;
using System.Text;

namespace MccAchievementApp.Api.ViewModels
{
    public class AuthResultViewModel
    {
        public string Token { get; set; }
        public string Gamertag { get; set; }
        public DateTime Expiration { get; set; }
    }
}
