using System;

namespace MccAchievementApp.Api
{
    public class Achievement
    {
        public string Id { get; set; }
        public string ServiceConfigId { get; set; }
        public string Name { get; set; }
        public Titleassociation[] TitleAssociations { get; set; }
        public ProgressionState ProgressState { get; set; }
        public Progression Progression { get; set; }
        public Mediaasset[] MediaAssets { get; set; }
        public string[] Platforms { get; set; }
        public bool IsSecret { get; set; }
        public string Description { get; set; }
        public string LockedDescription { get; set; }
        public string ProductId { get; set; }
        public string AchievementType { get; set; }
        public string ParticipationType { get; set; }
        public object TimeWindow { get; set; }
        public Reward[] Rewards { get; set; }
        public string EstimatedTime { get; set; }
        public string Deeplink { get; set; }
        public bool IsRevoked { get; set; }
        public Rarity Rarity { get; set; }
    }

    public class Progression
    {
        public Requirement[] Requirements { get; set; }
        public DateTime TimeUnlocked { get; set; }
    }

    public class Requirement
    {
        public string Id { get; set; }
        public string Current { get; set; }
        public string Target { get; set; }
        public string OperationType { get; set; }
        public string ValueType { get; set; }
        public string RuleParticipationType { get; set; }
    }

    public class Rarity
    {
        public string CurrentCategory { get; set; }
        public float CurrentPercentage { get; set; }
    }

    public class Titleassociation
    {
        public string Name { get; set; }
        public int Id { get; set; }
    }

    public class Mediaasset
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }
    }

    public class Reward
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Value { get; set; }
        public string Type { get; set; }
        public string MediaAsset { get; set; }
        public string ValueType { get; set; }
    }

    public enum ProgressionState
    {
        NotStarted,
        Achieved,
        InProgress
    }
}