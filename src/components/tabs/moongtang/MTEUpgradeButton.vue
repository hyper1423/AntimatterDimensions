<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
  name: "MTEUpgradeButton",
  components: {
    DescriptionDisplay,
    EffectDisplay,
    CostDisplay,
  },
  props: {
    upgrade: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      canBeBought: false,
      isBought: false
    };
  },
  computed: {
    isBasedOnInfinities() {
      return /(18|27|36|45)Mult/u.test(this.upgrade.id) || this.upgrade.id === "infinitiedMult";
    },
    shiftDown() {
      return ui.view.shiftDown;
    },
    showChargedEffect() {
      return this.chargePossible && (this.isCharged || this.showingCharged || this.shiftDown);
    },
    config() {
      const config = this.upgrade.config;
      return this.showChargedEffect
        ? config.charged
        : config;
    },
    classObject() {
      return {
        "o-mte-upgrade-btn": true,
        "o-mte-upgrade-btn--bought": this.isBought,
        "o-mte-upgrade-btn--available": !this.isBought && this.canBeBought,
        "o-mte-upgrade-btn--unavailable": !this.isBought && !this.canBeBought,
      };
    },
    isImprovedByTS31() {
      return this.hasTS31 && this.isBasedOnInfinities && !this.showChargedEffect;
    }
  },
  methods: {
    update() {
      // Note that this component is used by both infinity upgrades and break infinity upgrades
      // (putting this comment here rather than at the top of the component since this function
      // seems more likely to be read).
      const upgrade = this.upgrade;
      this.isBought = upgrade.isBought || upgrade.isCapped;
      this.canBeBought = upgrade.canBeBought;
      // A bit hacky, but the offline passive IP upgrade (the one that doesn't work online)
      // should hide its effect value if offline progress is disabled, in order to be
      // consistent with the other offline progress upgrades which hide as well.
      // Also, the IP upgrade that works both online and offline should not
      // show 0 if its value is 0. This is a bit inconvenient because sometimes,
      // like after eternity, it can be bought but have value 0, but not showing the effect
      // in this case doesn't feel too bad. Other upgrades, including the cost scaling
      // rebuyables, should never hide their effect.
      this.isDisabled = upgrade.config.isDisabled && upgrade.config.isDisabled(upgrade.config.effect());
    }
  }
};
</script>

<template>
  <button
    :class="classObject"
    @click="upgrade.purchase()"
  >
    <span >
      <DescriptionDisplay
        :config="config"
      />
      <EffectDisplay
        br
        :config="config"
      />
    </span>
    <CostDisplay
      v-if="!isBought"
      br
      :config="config"
      name="mTE"
    />
    <slot />
  </button>
</template>

<style scoped>

</style>
