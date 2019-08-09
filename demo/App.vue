<template>
  <main id="app" :data-mode="mode">
    <fieldset>
      <legend>Transition <code>mode</code></legend>
      <div class="radio-group" role="group">
        <label :class="mode === '' && 'active'" tabindex="0">
          <input type="radio" v-model="mode" value="" /> Default
        </label>
        <label :class="mode === 'out-in' && 'active'" tabindex="0">
          <input type="radio" v-model="mode" value="out-in" /> Out-in
        </label>
        <label :class="mode === 'in-out' && 'active'" tabindex="0">
          <input type="radio" v-model="mode" value="in-out" /> In-out
        </label>
      </div>
    </fieldset>

    <router-view-transition :transition="transition" :mode="mode" />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { RouterViewTransition } from "../src";

@Component({
  components: { RouterViewTransition }
})
export default class App extends Vue {
  mode = "";
  leaving = false;

  get transition() {
    if (this.mode === "out-in") return "fade";
    return `slide-${this.leaving ? "right" : "left"}`;
  }
}
</script>
