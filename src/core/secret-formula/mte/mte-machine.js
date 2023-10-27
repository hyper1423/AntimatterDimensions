import { DC } from "../../constants";

export const FUNCTION_TYPE = {
  INEQUALITY: "INEQUALITY", // NEQ
  MORPHISM: "MORPHISM", // MOP
};

export const functions = [
  {
    name: "Limitation of Spacetime",
    id: 1,
    cost: 1,
    requirement: "MTE the multiverse.",
    checkRequirement: () => player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    lockEvent: "gain a Replicanti Galaxy",
    description: "Replicanti speed is multiplied based on Replicanti Galaxies",
    effect: () => 1 + Replicanti.galaxies.total / 50,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Effortless Destruction",
    id: 6,
    cost: 15,
    requirement: "Complete your first manual Eternity without using Replicanti Galaxies",
    // Note that while noRG resets on eternity, the reality-level check will be false after the first eternity.
    // The noRG variable is eternity-level as it's also used for an achievement check
    hasFailed: () => !(player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities),
    checkRequirement: () => player.requirementChecks.eternity.noRG && player.requirementChecks.reality.noEternities,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    lockEvent: "gain a Replicanti Galaxy",
    description: "Replicanti speed is multiplied based on Replicanti Galaxies",
    effect: () => 1 + Replicanti.galaxies.total / 50,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Innumerably Construct",
    id: 7,
    cost: 15,
    requirement: "Complete your first Infinity with at most 1 Antimatter Galaxy",
    hasFailed: () => !(player.galaxies <= 1 && player.requirementChecks.reality.noInfinities),
    checkRequirement: () => player.galaxies <= 1 && player.requirementChecks.reality.noInfinities,
    checkEvent: GAME_EVENT.BIG_CRUNCH_BEFORE,
    canLock: true,
    lockEvent: "gain another Antimatter Galaxy",
    description: "Infinity gain is boosted from Antimatter Galaxy count",
    effect: () => 1 + player.galaxies / 30,
    formatEffect: value => formatX(value, 2, 2)
  },
  {
    name: "Paradoxically Attain",
    id: 8,
    cost: 15,
    requirement: "Manually Eternity without any automatic Achievements",
    hasFailed: () => player.reality.gainedAutoAchievements,
    checkRequirement: () => !player.reality.gainedAutoAchievements,
    checkEvent: GAME_EVENT.ETERNITY_RESET_BEFORE,
    canLock: true,
    // We don't have lockEvent because the modal can never show up for this upgrade
    description: "Tachyon Particle gain is boosted based on Achievement multiplier",
    effect: () => Math.sqrt(Achievements.power),
    formatEffect: value => formatX(value, 2, 2)
  },
];