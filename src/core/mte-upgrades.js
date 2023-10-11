import { GameMechanicState, SetPurchasableMechanicState } from "./game-mechanics";
import { DC } from "./constants";

class MTEUpgradeState extends SetPurchasableMechanicState {
  get currency() {
    return Currency.mTE;
  }

  get set() {
    return player.moongtang.upgrades;
  }
}

export const MTEUpgrade = mapGameDataToObject(
  GameDatabase.mte.upgrades,
  config => new MTEUpgradeState(config)
);