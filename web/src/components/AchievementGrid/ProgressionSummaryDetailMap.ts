
let maps = {
    "HaloReachLevels": [
        "Winter Contingency",
        "ONI: Sword Base",
        "Nightfall",
        "Tip of the Spear",
        "Long Night of Solace",
        "Exodus",
        "New Alexandria",
        "The Package",
        "The Pillar of Autumn"
    ],
    "HaloReachDatapads": [
        "Winter Contingency - Second Structure",
        "ONI: Sword Base - Atrium",
        "Nightfall - Cave",
        "Tip of the Spear - BXR Mining",
        "Long Night of Solace - Control Room",
        "Exodus - Jetpack Encounter",
        "New Alexandria - ONI HQ",
        "The Package - Cutscene Door",
        "The Pillar of Autumn - After Boneyard",
        "Legendary: Winter Contingency - SpecOps Elite",
        "Legendary: ONI: Sword Base - Cliffs behind Comms",
        "Legendary: Nightfall - Militia Encounter",
        "Legendary: Tip of the Spear - Second AA",
        "Legendary: Long Night of Solace - Before Stairs",
        "Legendary: Exodus - Vents Accross from Platform",
        "Legendary: New Alexandria - Behind/bottom",
        "Legendary: The Package - C Turret Cliff",
        "Legendary: The Pillar of Autumn - Boneyard Roof",
        "Legendary: Lone Wolf - Large Pipe"
    ],
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

    "910": maps["HaloReachLevels"],
    "911": maps["HaloReachLevels"],
    "912": maps["HaloReachLevels"],
    "913": maps["HaloReachLevels"],
    "914": maps["HaloReachLevels"],
    "924": maps["HaloReachLevels"],
    "934": maps["HaloReachLevels"],

    "973": maps["HaloReachDatapads"],
}

export default ProgressionSummaryDetailMap;