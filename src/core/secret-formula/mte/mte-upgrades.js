import { DC } from "../../constants";

export const mteUpgrades = {
    testMTE: {
        id: "testMTE",
        cost: 1,
        description: "Moong Tang E.",
        effect: -3000,
        formatEffect: value => `${format(value, 2, 2)}`
    },
    breakEternity: {
        id: "breakEternity",
        cost: 1,
        description: "BREAK ETERNITY",
    }
}