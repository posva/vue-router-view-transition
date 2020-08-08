<template>
  <section>
    <p>
      Let's try out this demo! Because we are restoring the scroll position, we
      first need to scroll a bit! So scroll down a little bit.
    </p>

    <p class="scroll-indicator">
      ⇣ Scroll Down ⇣
    </p>

    <div :style="explanationStyle" class="explanation">
      <p v-html="explanation"></p>

      <br />
      <br />

      Go ahead, change the mode
      <a href="/" @click="scrollToTop">up there</a> and try again 👇
    </div>

    <p>
      Now that you scrolled so far,
      <router-link to="/middle">let's go somewhere else</router-link>
    </p>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  watch: {
    "$parent.mode"() {
      // @ts-ignore
      this.didBack = false;
    }
  }
})
export default class Start extends Vue {
  didBack = false;

  // @ts-ignore
  beforeRouteEnter(to, from, next) {
    // @ts-ignore
    next(vm => {
      if (from.path === "/middle") {
        vm.didBack = true;
        vm.$parent.leaving = false;
      }
    });
  }

  get explanation() {
    // @ts-ignore
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

If we didn't use that helper, we would have stayed at the same scroll level as we were before.
<br/>
        You can try out <i>In-out</i> but it doesn't look that great 🙃
        `;
    }
    // @ts-ignore
    const description = this.$parent.mode
      ? `which means <i>entering</i> happens before <i>leaving</i> and more specifically, right when the transition starts`
      : `which means both <i>leaving</i> and <i>entering</i> transitions trigger at the same time`;
    // @ts-ignore
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
  }

  get explanationStyle() {
    return {
      visibility: this.didBack ? "visible" : "hidden"
    };
  }

  // @ts-ignore
  beforeRouteLeave(to, from, next) {
    // @ts-ignore
    if (this.$parent.mode === "in-out") this.$el.style.position = "absolute";
    next();
  }

  scrollToTop(e: MouseEvent) {
    // don't redirect with control keys
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    // don't redirect when preventDefault called
    if (e.defaultPrevented) return;
    // don't redirect on right click
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    window.scrollTo(0, document.getElementById("app")!.offsetTop);
  }
}
</script>
