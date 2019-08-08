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

      Go ahead, change the mode <a href="#app">up there</a> and try again 👇
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
        vm.$parent.leaving = false;
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
      if (this.$parent.mode === "out-in") {
        return `You used the <b>out-in</b> mode, which means the <i>leaving</i> transition must finish before the <i>entering</i> one even starts. Because of this, when restoring the scroll position we must wait for the <i>entering</i> view to be visible. For that to work, we need to <b>wait</b>. If we are using <code>router-view-transition</code>, we can use the helper <code>waitForTransition</code> to create an adapted <code>scrollBehavior</code>:
        <pre>
import { waitForTransition } from 'vue-router-view-transition'

const scrollBehavior = waitForTransition((to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}) 
        </pre>

If we didin't use that helper, we would have stay at the same scroll level as we were before.
<br/>
        You can try out <i>In-out</i> but it doesn't look that great 🙃
        `;
      }
      const description = this.$parent.mode
        ? `which means <i>entering</i> happens before <i>leaving</i> and more specifically, right when the transition starts`
        : `which means both <i>leaving</i> and <i>entering</i> transitions trigger at the same time`;
      return `You used the <b>${this.$parent.mode ||
        "default"}</b> mode, ${description}. Because of this, restoring the scroll position right away works correctly:
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
    },
    explanationStyle: function() {
      return {
        visibility: this.didBack ? "visible" : "hidden"
      };
    }
  },
  beforeRouteLeave: function(to, from, next) {
    if (this.$parent.mode === "in-out") this.$el.style.position = "absolute";
    next();
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
