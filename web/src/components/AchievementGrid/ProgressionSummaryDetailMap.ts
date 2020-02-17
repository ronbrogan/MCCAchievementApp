
let maps = {
    "Halo1Levels": [
        "Pillar of Autumn",
        "Halo",
        "Truth and Reconcilliation",
        "The Silent Cartographer",
        "Assault on the Control Room",
        "343 Guilty Spark",
        "The Library",
        "Two Betrayals",
        "Keyes",
        "The Maw",
    ],
    "Halo2Levels": [
        "Cairo Station",
        "Outskirts",
        "Metropolis",
        "The Arbiter",
        "The Oracle",
        "Delta Halo",
        "Regret",
        "Sacred Icon",
        "Quarantine Zone",
        "Gravemind",
        "Uprising",
        "High Charity",
        "The Great Journey"
    ],
    "Halo3Levels": [
        "Sierra 117",
        "Crow's Nest",
        "Tsavo Highway",
        "The Storm",
        "Floodgate",
        "The Ark",
        "The Covenant",
        "Cortana",
        "Halo"
    ],
}

let ProgressionSummaryDetailMap: {[key: string] : string[]}  = {
    "173": maps["Halo1Levels"],
    "184": maps["Halo1Levels"],
    "195": maps["Halo1Levels"],
    "210": maps["Halo1Levels"],
    "211": maps["Halo1Levels"],
    "212": maps["Halo1Levels"],
    "241": maps["Halo1Levels"],

    "293": maps["Halo2Levels"],
    "307": maps["Halo2Levels"],
    "347": maps["Halo2Levels"],
    "348": maps["Halo2Levels"],
    "349": maps["Halo2Levels"],
    "606": maps["Halo2Levels"],
    "738": maps["Halo2Levels"],

    "424": maps["Halo3Levels"],
    "434": maps["Halo3Levels"],
    "454": maps["Halo3Levels"],
    "455": maps["Halo3Levels"],
    "456": maps["Halo3Levels"],
}

export default ProgressionSummaryDetailMap;