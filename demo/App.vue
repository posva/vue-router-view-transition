<template>
  <main id="app">
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
    <transition :name="transition" :mode="mode">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  data: function() {
    return {
      mode: ""
    };
  },

  computed: {
    transition: function() {
      return "slide-left";
    }
  }
};
</script>

<style scoped>
label {
  color: var(--dark);
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 20px;
  /* background-color: white; */
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

label + label {
  border-left: solid var(--light);
}
.radio-group {
  border: solid 3px var(--dark);
  user-select: none;
  /* background-image: linear-gradient(60deg, #0fa74e 0%, #3490dc 100%); */
  display: inline-block;
  margin: 20px;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
}
</style>

