<template>
  <draggable @remove="listChanged"  :clone="clone" :list="uiElementsInternal" :options="dragOptions">
    <ui-element-thumbnail v-for="l in uiElementsInternal" :type="l.name" :key="l.name" :icon="l.icon" >
    </ui-element-thumbnail>
  </draggable>
</template>

<script>
export default {
  name: 'ui-element-picker',
  props: ['uiElements'],
  mounted () {
    for (var key in this.uiElements) {
      this.uiElements[key].id = Math.random().toString(36).substring(2, 15)
    }
  },
  data () {
    return {
      dragOptions: {
        group: {
          name: 'ui-elements',
          pull: 'clone',
          put: false
        }
      },
      uiElementsInternal: this.uiElements
    }
  },
  methods: {
    listChanged (event) {
      for (var key in this.uiElementsInternal) {
        this.uiElementsInternal[key].id = Math.random().toString(36).substring(2, 15)
      }
      this.uiElementsInternal = this.uiElementsInternal.filter(Object)
      console.log(this.uiElementsInternal)
    },
    clone: function (original) {
      var element = {}
      for (var key in original) {
        if (original.hasOwnProperty(key)) {
          element[key] = original[key]
        }
      }
      return element
    }
  }
}
</script>
