<script>
import MTEUpgradeButton from "./MTEUpgradeButton";

export default {
  name: "MTEWorldTab",
  components: {
    MTEUpgradeButton,
  },
  data() {
    return {
      isUnlocked: true
    };
  },
  computed: {
    grid() {
      return [ [ MTEUpgrade.testMTE, MTEUpgrade.breakEternity ] ];
    }
  },
  methods: {
    update() {
      this.isUnlocked = true;
    },
    btnClassObject(column) {
      return {
        "l-mte-world-grid__cell": true,
        "o-mte-world-btn--multiplier": column === 3
      };
    },
    timeDisplayShort(time) {
      return timeDisplayShort(time);
    }
  }
};
</script>

<template>
  <div class="l-mte-upgrades-grid">
    <div
      v-for="(row, i) in grid"
      :key="i"
      class="l-mte-upgrades-grid__row"
    >
      <MTEUpgradeButton
        v-for="upgrade in row"
        :key="upgrade.id"
        :upgrade="upgrade"
        class="l-mte-upgrades-grid__cell"
      />
    </div>
  </div>
</template>

<style scoped>
.l-mte-upgrades-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.l-mte-upgrades-grid__row {
  display: flex;
  flex-direction: row;
}

.l-mte-upgrades-grid__cell {
  margin: 0.5rem 0.8rem;
}
</style>
