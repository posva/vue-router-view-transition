<template>
  <p>
    That sliding felt good, why don't you give me another one by going back? 🙂
    <br />
    You can either
    <a @click.prevent="$router.back()" href="#" role="button">click here</a> or
    press the <i>back</i> button in your browser.
  </p>
</template>

<script>
export default {
  beforeRouteLeave: function(to, from, next) {
    this.$parent.leaving = true;
    if (this.$parent.mode === "in-out") this.$el.style.position = "absolute";
    next();
    // document.body.style.overflowX = "hidden";
    document.body.scrollLeft;
  }
};
</script>

<style lang="scss" scoped>
</style>
