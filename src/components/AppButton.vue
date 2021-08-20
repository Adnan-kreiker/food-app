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
    cursor: {
      type: String,
      default: 'pointer',
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
        cursor: this.cursor,
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
  cursor: var(--cursor);
}
button:hover,
button:focus {
  box-shadow: inset 8em 0 0 0 var(--bg-color);
  cursor: var(--cursor);
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
