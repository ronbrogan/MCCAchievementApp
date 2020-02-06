using System;
using System.Linq;

namespace MccAchievementApp.Api.ViewModels
{
    public class AchievementViewModel
    {
        // Display timestamps for ease of use, lop off milliseconds with /1000*1000
        private static string GetTimeProgressionString(int current, int target)
        {
            return $"{TimeSpan.FromMilliseconds(current / 1000 * 1000)} / {TimeSpan.FromMilliseconds(target / 1000 * 1000)}";
        }

        public AchievementViewModel(Achievement achievement)
        {
            this.Id = achievement.Id;
            this.Name = achievement.Name;
            this.ProgressState = achievement.ProgressState.ToString();

            var aggedRequirements = achievement.Progression.Requirements.Aggregate(new { Current = 0, Target = 0 }, (a, r) => new
            {
                Current = a.Current + (int.TryParse(r.Current, out var cur) ? cur : 0),
                Target = a.Target + (int.TryParse(r.Target, out var tar) ? tar : 0)
            });

            if (achievement.Description.Contains("par time"))
            {
                this.Progressions = achievement.Progression.Requirements.Select(r => 
                    GetTimeProgressionString((int.TryParse(r.Current, out var cur) ? cur : -1), (int.TryParse(r.Target, out var tar) ? tar : -1))).ToArray();
                this.ProgressionSummary = GetTimeProgressionString(aggedRequirements.Current, aggedRequirements.Target);
            }
            else
            {
                this.Progressions = achievement.Progression.Requirements.Select(r => $"{r.Current} / {r.Target}").ToArray();
                this.ProgressionSummary = $"{aggedRequirements.Current} / {aggedRequirements.Target}";
            }

            this.IsUnlocked = achievement.ProgressState == ProgressionState.Achieved;
            this.UnlockedAt = achievement.Progression.TimeUnlocked;
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public string ProgressState { get; set; }
        public string[] Progressions { get; set; }
        public string ProgressionSummary { get; set; }
        public bool IsUnlocked { get; set; }
        public DateTime UnlockedAt { get; set; }
    }
}
