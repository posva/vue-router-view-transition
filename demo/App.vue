<template>
  <main id="app" :data-mode="mode">
    <fieldset>
      <legend>Transition <code>mode</code></legend>
      <div class="radio-group">
        <label :class="mode === '' && 'active'">
          <input type="radio" v-model="mode" value="" /> Default
        </label>
        <label :class="mode === 'out-in' && 'active'">
          <input type="radio" v-model="mode" value="out-in" /> Out-in
        </label>
        <label :class="mode === 'in-out' && 'active'">
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

<style scoped>
main {
  position: relative;
  left: 0;
  /* overflow: visible; */
}

label {
  color: var(--dark);
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 20px;
}

legend {
  display: inline-block;
  margin: 0;
  padding: 0;
}

fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

input[type="radio"] {
  position: absolute;
  visibility: hidden;
  display: none;
}

label.active {
  color: var(--light);
  /* background: var(--dark); */
  background-image: linear-gradient(60deg, #0fa74e 0%, #3490dc 100%);
}

label:last-child {
  margin-right: -1px;
}

.radio-group {
  border: solid 2px var(--dark);
  user-select: none;
  /* background-image: linear-gradient(60deg, #0fa74e 0%, #3490dc 100%); */
  display: inline-block;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
}

@media screen and (max-width: 768px) {
  .radio-group {
    display: block;
    margin: 20px auto;
    max-width: 200px;
  }
  label {
    display: block;
    text-align: center;
  }
}
</style>

