import { Currency } from "./currency";
import { DC } from "./constants";

export function requestMTE() {
  // Without the delay, this causes the saving (and its notification) to occur during the credits rollback
  // setTimeout(() => GameStorage.save(), 10000);
  beginProcessMTE();
}

export function beginProcessMTE() {
  EventHub.dispatch(GAME_EVENT.MTE_RESET_BEFORE);

  finishProcessMTE();
}

export function finishProcessMTE() {
  giveMTERewards();

  // The ending animation ends at 12.5, although the value continues to increase after that. We set it to a bit above
  // 12.5 when we start the rollback animation to hide some of the unavoidable lag from all the reset functions
  GameEnd.removeAdditionalEnd = true;
  GameEnd.additionalEnd = 15;

  GameEnd.creditsClosed = false;
  GameEnd.creditsEverClosed = false;
  player.isGameEnd = false;
  // We set this ASAP so that the AD tab is immediately recreated without END formatting, and any lag which could
  // happen is instead hidden by the overlay from the credits rollback
  player.celestials.pelle.doomed = false;

  GlyphAppearanceHandler.unlockSet();

  EventHub.dispatch(GAME_EVENT.MTE_RESET_AFTER);
}

export function giveMTERewards() {
  // mTE increases by 1 if the player beats pelle
  Currency.mTE.value = Currency.mTE.value.add(1);
  resetPreviousProgress();
}
export function resetPreviousProgress() {
  Currency.realityMachines.reset();
  Currency.imaginaryMachines.reset();
  
  player.sacrificed = DC.D0;

  // Because initializeChallengeCompletions has some code that completes normal challenges with 2 eternities,
  // and we haven't reset eternities yet (and I'm nervous about changing the order of this code),
  // add a flag to indicate that this is a reality reset.
  // initializeChallengeCompletions(true);

  Currency.infinities.reset();
  Currency.infinitiesBanked.reset();
  player.records.bestInfinity.time = 999999999999;
  player.records.bestInfinity.realTime = 999999999999;
  player.records.thisInfinity.time = 0;
  player.records.thisInfinity.lastBuyTime = 0;
  player.records.thisInfinity.realTime = 0;
  player.dimensionBoosts = 0;
  player.galaxies = 0;
  player.partInfinityPoint = 0;
  player.partInfinitied = 0;
  player.break = false;
  player.IPMultPurchases = 0;
  Currency.infinityPower.reset();
  Currency.timeShards.reset();
  Replicanti.reset(true);

  Currency.eternityPoints.reset();

  // This has to be reset before Currency.eternities to make the bumpLimit logic work correctly
  EternityUpgrade.epMult.reset();
  if (!PelleUpgrade.eternitiesNoReset.canBeApplied) Currency.eternities.reset();
  player.records.thisEternity.time = 0;
  player.records.thisEternity.realTime = 0;
  player.records.bestEternity.time = 999999999999;
  player.records.bestEternity.realTime = 999999999999;
  if (!PelleUpgrade.keepEternityUpgrades.canBeApplied) player.eternityUpgrades.clear();
  player.totalTickGained = 0;
  if (!PelleUpgrade.keepEternityChallenges.canBeApplied) player.eternityChalls = {};
  player.reality.unlockedEC = 0;
  player.reality.lastAutoEC = 0;
  player.challenge.eternity.current = 0;
  if (!PelleUpgrade.timeStudiesNoReset.canBeApplied) player.challenge.eternity.unlocked = 0;
  player.challenge.eternity.requirementBits = 0;
  player.respec = false;
  player.eterc8ids = 50;
  player.eterc8repl = 40;
  player.records.thisReality.time = 0;
  player.records.thisReality.realTime = 0;
  player.records.thisReality.maxReplicanti = DC.D0;
  if (!PelleUpgrade.timeStudiesNoReset.canBeApplied) Currency.timeTheorems.reset();
  player.celestials.v.STSpent = 0;
  if (!PelleUpgrade.timeStudiesNoReset.canBeApplied) {
    player.dilation.studies = [];
    player.dilation.active = false;
  }
  if (!PelleUpgrade.dilationUpgradesNoReset.canBeApplied) {
    player.dilation.upgrades.clear();
    player.dilation.rebuyables = {
      1: 0,
      2: 0,
      3: 0,
      11: 0,
      12: 0,
      13: 0
    };
  }
  if (!PelleUpgrade.tachyonParticlesNoReset.canBeApplied) {
    Currency.tachyonParticles.reset();
  }
  player.dilation.nextThreshold = DC.E3;
  player.dilation.baseTachyonGalaxies = 0;
  player.dilation.totalTachyonGalaxies = 0;
  Currency.dilatedTime.reset();
  player.records.thisInfinity.maxAM = DC.D0;
  player.records.thisEternity.maxAM = DC.D0;
  player.records.thisReality.maxDT = DC.D0;
  player.dilation.lastEP = DC.DM1;
  Currency.antimatter.reset();
  Enslaved.autoReleaseTick = 0;
  player.celestials.enslaved.hasSecretStudy = false;
  player.celestials.laitela.entropy = 0;

  playerInfinityUpgradesOnReset();
  resetInfinityRuns();
  resetEternityRuns();
  InfinityDimensions.fullReset();
  fullResetTimeDimensions();
  resetChallengeStuff();
  AntimatterDimensions.reset();
  secondSoftReset(false);
  player.celestials.ra.peakGamespeed = 1;

  InfinityDimensions.resetAmount();
  player.records.thisInfinity.bestIPmin = DC.D0;
  player.records.bestInfinity.bestIPminEternity = DC.D0;
  player.records.thisEternity.bestEPmin = DC.D0;
  player.records.thisEternity.bestInfinitiesPerMs = DC.D0;
  player.records.thisEternity.bestIPMsWithoutMaxAll = DC.D0;
  player.records.bestEternity.bestEPminReality = DC.D0;
  player.records.thisReality.bestEternitiesPerMs = DC.D0;
  player.records.thisReality.bestRSmin = DC.D0;
  player.records.thisReality.bestRSminVal = DC.D0;
  resetTimeDimensions();
  resetTickspeed();
  AchievementTimers.marathon2.reset();
  Currency.infinityPoints.reset();

  if (RealityUpgrade(10).isBought) applyRUPG10();
  else Tab.dimensions.antimatter.show();

  Lazy.invalidateAll();
  ECTimeStudyState.invalidateCachedRequirements();
  EventHub.dispatch(GAME_EVENT.REALITY_RESET_AFTER);

  if (TeresaUnlocks.startEU.canBeApplied) {
    for (const id of [1, 2, 3, 4, 5, 6]) player.eternityUpgrades.add(id);
  } else if (RealityUpgrade(14).isBought) {
    // Eternal flow will always give eternities after the first tick,
    // better to try apply EU1 immediately once at the start rather than on every tick
    applyEU1();
  }

  // if (!isReset) Ra.applyAlchemyReactions(realityRealTime);

  player.reality.gainedAutoAchievements = false;
  player.reality.hasCheckedFilter = false;

  // if (realityProps.restoreCelestialState || player.options.retryCelestial) restoreCelestialRuns(celestialRunState);

  if (Pelle.isDoomed && PelleUpgrade.keepAutobuyers.canBeApplied && Autobuyer.bigCrunch.hasMaxedInterval) {
    player.break = true;
  }
}

// Reset the game, but carry over some post-completion stats. We also call this when starting a speedrun, so make sure
// any stats which are updated due to completion happen in startNewGame() instead of in here
function restartWithCarryover() {
  /* const backUpOptions = JSON.stringify(player.options);
  // This can't be JSONed as it contains sets
  const secretUnlocks = player.secretUnlocks;
  const secretAchievements = JSON.stringify(player.secretAchievementBits);
  // We don't backup the whole player.reality.automator object because it contains "state",
  // which could lead to some edge cases where it starts when it shouldn't (ie before it's unlocked)
  // It's easier to do something like this to avoid it entirely.
  const automatorConstants = JSON.stringify(player.reality.automator.constants);
  const automatorConstantSort = JSON.stringify(player.reality.automator.constantSortOrder);
  const automatorScripts = JSON.stringify(player.reality.automator.scripts);
  const fullCompletions = player.records.fullGameCompletions;
  const fullTimePlayed = player.records.previousRunRealTime + player.records.realTimePlayed;
  const glyphCosmetics = JSON.stringify(player.reality.glyphs.cosmetics);
  const speedrunRecords = JSON.stringify(player.speedrun.previousRuns);
  const hasSpeedrun = player.speedrun.isUnlocked;
  Modal.hideAll();
  Quote.clearAll();
  GameStorage.hardReset();
  player.options = JSON.parse(backUpOptions);
  // We need to force this one to be true because otherwise the player will be unable to select their glyphs
  // until they can auto-reality
  player.options.confirmations.glyphSelection = true;
  player.secretUnlocks = secretUnlocks;
  player.secretAchievementBits = JSON.parse(secretAchievements);
  player.reality.automator.constants = JSON.parse(automatorConstants);
  player.reality.automator.constantSortOrder = JSON.parse(automatorConstantSort);
  player.reality.automator.scripts = JSON.parse(automatorScripts);
  player.records.fullGameCompletions = fullCompletions;
  player.records.previousRunRealTime = fullTimePlayed;
  ui.view.newUI = player.options.newUI;
  ui.view.news = player.options.news.enabled;
  player.reality.glyphs.cosmetics = JSON.parse(glyphCosmetics);
  player.speedrun.previousRuns = JSON.parse(speedrunRecords);
  player.speedrun.isUnlocked = hasSpeedrun;
  Themes.find(Theme.currentName()).set();
  Notations.all.find(n => n.name === player.options.notation).setAsCurrent();
  ADNotations.Settings.exponentCommas.min = 10 ** player.options.notationDigits.comma;
  ADNotations.Settings.exponentCommas.max = 10 ** player.options.notationDigits.notation;
  player.lastUpdate = Date.now(); */
}
