
<template>
  <section>
    {{$route.meta.title}}
  </section>
</template>

<script>
export default {
  label: '',

  name: 'testMenu',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },
  created() {
    console.log(this.$route)
  },

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
</style>
