<template>
  <button :style="cssVars">
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'button',
    },
    color: {
      type: String,
      default: 'gray',
    },
  },
  data() {
    return {
      btnText: this.text,
    };
  },
  computed: {
    cssVars() {
      return {
        '--bg-color': this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background: none;
  width: 95px;
  text-align: center !important;
  vertical-align: middle !important;
  display: inline-block !important;
  border: 2px solid;
  font: inherit;
  line-height: 1;
  margin: 0.5em;
  padding: 1em 1em;
}
button:hover,
button:focus {
  box-shadow: inset 8em 0 0 0 var(--bg-color);
}
button {
  color: var(--bg-color);
  transition: 0.25s;

  &:hover,
  &:focus {
    border-color: var(--bg-color);
    color: #fff;
    cursor: pointer;
    span {
      color: #fff;
    }
  }
}
span {
  text-align: center;
  color: var(--bg-color);
}
</style>
