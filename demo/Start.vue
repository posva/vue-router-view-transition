<template>
  <section>
    <p>
      Let's try out this demo! Because we are restoring the scroll position, we
      first need to scroll a bit!. So scroll down a little bit
    </p>

    <p class="scroll-indicator">
      ⇣ Scroll Down ⇣
    </p>

    <div :style="explanationStyle" class="explanation">
      <p v-html="explanation"></p>

      <br />
      <br />

      Go ahead, change the mode <a href="#top">up there</a> and try again 👇
    </div>

    <p>
      Now that you scrolled so far,
      <router-link to="/middle">let's go somewhere else</router-link>
    </p>
  </section>
</template>

<script>
export default {
  data: function() {
    return {
      didBack: false
    };
  },

  beforeRouteEnter: function(to, from, next) {
    next(function(vm) {
      if (from.path === "/middle") {
        vm.didBack = true;
      }
    });
  },

  watch: {
    "$parent.mode": function() {
      this.didBack = false;
    }
  },

  computed: {
    explanation: function() {
      if (this.$parent.mode === "") {
        return `You used the <b>default</b> mode, which means both <i>leaving</i> and <i>entering</i> transitions trigger at the same time. Because of this, restoring the scroll position right away works correctly:
        <pre>
function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
} 
        </pre>

        But that's not always the case, why don't you try out <i>Out-in</i>?
        `;
      }
    },
    explanationStyle: function() {
      return {
        visibility: this.didBack ? "visible" : "hidden"
      };
    }
  }
};
</script>

<style scoped>
.explanation {
  border-radius: 1em;
  padding: 0 2em 1em;
  border: 1px solid #dfdede;
  background-color: #effefe;
  overflow: hidden;
}

.explanation >>> pre {
  max-width: 100%;
  overflow: scroll;
}
</style>
