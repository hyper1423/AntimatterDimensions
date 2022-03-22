import { GameDatabase } from "./game-database.js";

GameDatabase.speedrunMilestones = [
  {
    id: 1,
    key: "firstBoost",
    name: "First Dimboost",
    description: "Get your first Dimboost",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.DIMBOOST_AFTER,
  },
  {
    id: 2,
    key: "firstGalaxy",
    name: "First Galaxy",
    description: "Get your first Galaxy",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.GALAXY_RESET_AFTER,
  },
  {
    id: 3,
    key: "firstInfinity",
    name: "First Infinity",
    description: "Complete your first Infinity",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
  },
  {
    id: 4,
    key: "completeC9",
    name: "Tickspeed Challenge",
    description: "Complete the Tickspeed Autobuyer Challenge",
    checkRequirement: () => NormalChallenge(9).isCompleted,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
  },
  {
    id: 5,
    key: "completeAllNC",
    name: "All Normal Challenges",
    description: "Complete all Normal Challenges",
    checkRequirement: () => NormalChallenges.all.countWhere(c => !c.isCompleted) === 0,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
  },
  {
    id: 6,
    key: "breakInfinity",
    name: "Break Infinity",
    description: "Break Infinity for the first time",
    checkRequirement: () => player.break,
    checkEvent: GAME_EVENT.BREAK_INFINITY,
  },
  {
    id: 7,
    key: "upgrade5e11IP",
    get name() { return `${format(5e11)} IP Upgrade`; },
    description: () => `Purchase the ${formatPercents(0.5)} stronger Galaxies upgrade`,
    checkRequirement: () => true,
    // This is checked within BreakInfinityUpgrade.onPurchased
  },
  {
    id: 8,
    key: "completeIC5",
    name: "Infinity Challenge 5",
    description: "Complete Infinity Challenge 5",
    checkRequirement: () => InfinityChallenge(5).isCompleted,
    checkEvent: GAME_EVENT.BIG_CRUNCH_AFTER,
  },
  {
    id: 9,
    key: "unlockReplicanti",
    name: "Replicanti",
    description: "Unlock Replicanti",
    checkRequirement: () => player.replicanti.unl,
    checkEvent: GAME_EVENT.REPLICANTI_TICK_AFTER,
  },
  {
    id: 10,
    key: "firstEternity",
    name: "First Eternity",
    description: "Complete your first Eternity",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
  },
  {
    id: 11,
    key: "allEternityMilestones",
    name: "All Eternity Milestones",
    description: "Unlock all Eternity Milestones",
    checkRequirement: () => EternityMilestones.all.every(m => m.isReached),
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
  },
  {
    id: 12,
    key: "completeFirstEC",
    name: "First Eternity Challenge",
    description: "Complete any tier of an Eternity Challenge",
    checkRequirement: () => EternityChallenges.completions > 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
  },
  {
    id: 13,
    key: "completeEC10",
    name: "Eternity Challenge 10",
    description: "Complete Eternity Challenge 10 for the first time",
    checkRequirement: () => EternityChallenge(10).completions > 0,
    checkEvent: GAME_EVENT.ETERNITY_RESET_AFTER,
  },
  {
    id: 14,
    key: "firstDilation",
    name: "First Dilated Eternity",
    description: "Complete a Dilated Eternity for the first time",
    checkRequirement: () => player.dilation.active,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
  },
  {
    id: 15,
    key: "upgradeTTgen",
    name: "Time Theorem Generation",
    description: "Purchase the Time Theorem Generation Dilation Upgrade",
    checkRequirement: () => true,
    // This is checked within DilationUpgradeState.onPurchased
  },
  {
    id: 16,
    key: "firstReality",
    name: "First Reality",
    description: "Complete your first Reality",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 17,
    key: "upgradeBlackHole",
    name: "Black Hole",
    description: "Unlock the Black Hole",
    checkRequirement: () => true,
    // This is called directly within BlackHoles.unlock
  },
  {
    id: 18,
    key: "allRealityUpgrades",
    name: "All Reality Upgrades",
    description: "Purchase all Reality Upgrades",
    checkRequirement: () => RealityUpgrades.allBought,
    checkEvent: GAME_EVENT.REALITY_UPGRADE_BOUGHT,
  },
  {
    id: 19,
    key: "completeTeresaReality",
    name: "Teresa's Reality",
    description: "Complete Teresa's Reality",
    checkRequirement: () => Teresa.isRunning,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 20,
    key: "completeEffarigReality",
    name: "Effarig's Reality",
    description: "Complete all tiers of Effarig's Reality",
    checkRequirement: () => Effarig.currentStage === EFFARIG_STAGES.COMPLETED,
    checkEvent: GAME_EVENT.REALITY_RESET_AFTER,
  },
  {
    id: 21,
    key: "completeEnslavedReality",
    name: "The Enslaved Ones' Reality",
    description: "Complete The Enslaved Ones' Reality",
    checkRequirement: () => Enslaved.isRunning,
    checkEvent: GAME_EVENT.REALITY_RESET_BEFORE,
  },
  {
    id: 22,
    key: "complete36VAchievement",
    name: "All basic V-Achievements",
    description: () => `Complete ${formatInt(36)} V-Achievements`,
    checkRequirement: () => true,
    // In order to avoid unnecessary overhead, this is checked within V.checkForUnlocks instead of every tick
  },
  {
    id: 23,
    key: "completeRaMemories",
    name: "Regain Ra's Memories",
    description: "Regain all of Ra's Celestial Memories",
    checkRequirement: () => Ra.totalPetLevel >= Ra.maxTotalPetLevel,
    checkEvent: GAME_EVENT.GAME_TICK_AFTER,
  },
  {
    id: 24,
    key: "completeFullDestabilize",
    name: "Full Destabilization",
    description: "Disable all Dimensions within Lai'tela's Reality",
    checkRequirement: () => Laitela.isFullyDestabilized,
    // Destabilization isn't a reality reset because it shortcuts gameLoop; this is checked in laitelaRealityTick
  },
  {
    // TODO: At the time of implementing speedrun mode, full game completion is still unimplemented - update this entry
    id: 25,
    key: "completeFullGame",
    name: "Game Completed!",
    description: "Complete the entire game",
    checkRequirement: () => true,
    checkEvent: GAME_EVENT.ACHIEVEMENT_EVENT_OTHER,
  },
];
