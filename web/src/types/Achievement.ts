export default interface Achievement 
{
    id: string,
    name: string,
    progressState: string,
    progressions: string[],
    progressionSummary: string,
    isUnlocked: boolean,
    unlockedAt: string,

    Category: string,
    Subcategory: string,
    ProgressionTarget: string
}