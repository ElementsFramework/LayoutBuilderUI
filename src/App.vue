<template>
  <div class="flex-container">
    <ui-element-picker class="element-picker" :uiElements="uiElements"></ui-element-picker>
    <draggable class="draggable main" :list="list" :options="dragOptions">
      <ui-element v-for="m in list" v-if="m !== undefined" :onRemove="removeUIElement" :key="m.id" :elementDefinition.sync="m"></ui-element>
    </draggable>
  </div>
</template>

<script>
  import VueFormGenerator from 'vue-form-generator'
  import EventBus from './event-bus'

  export default {
    name: 'app',
    data () {
      return {
        dragOptions: {
          group: 'ui-elements'
        },
        uiElements: [
          {
            name: 'Test 1',
            icon: '<i class="fa fa-camera"></i>'
          },
          {
            name: 'Test 2',
            icon: '<i class="fa fa-camera"></i>'
          }
        ],
        list: [
          {
            id: Math.random().toString(36).substring(2, 15),
            name: 'test1',
            icon: '<i class="fa fa-camera"></i>',
            content: `<div class="row" slot="content" v-if="elementDefinition.contentData">
          <div class="col-md-6">
            <draggable class="draggable" :options="dragOptions" container-id="col1"
                       :list="elementDefinition.contentData.col1">
              <ui-element v-for="l in elementDefinition.contentData.col1" v-if="l !== undefined" :onRemove="removeById" :key="l.id" :elementDefinition.sync="l">
              </ui-element>
            </draggable>
          </div>
          <div class="col-md-6">
            <draggable class="draggable" :options="dragOptions" container-id="col2"
                       :list="elementDefinition.contentData.col2">
              <ui-element v-for="l in elementDefinition.contentData.col2" v-if="l !== undefined" :onRemove="removeById" :key="l.id" :elementDefinition.sync="l">
              </ui-element>
            </draggable>
          </div>
        </div>`,
            contentData: {
              col1: [{
                id: Math.random().toString(36).substring(2, 15),
                name: 'test1 > col1',
                icon: '<i class="fa fa-camera"></i>'
              }],
              col2: [{
                id: Math.random().toString(36).substring(2, 15),
                name: 'test1 > col2',
                icon: '<i class="fa fa-camera"></i>'
              }]
            },
            settings: {
              content: {},
              definition: {
                fields: [{
                  type: 'input',
                  inputType: 'text',
                  label: 'ID',
                  model: 'id',
                  readonly: true,
                  featured: false,
                  disabled: true
                }, {
                  type: 'input',
                  inputType: 'text',
                  label: 'Name',
                  model: 'name',
                  readonly: false,
                  featured: true,
                  required: true,
                  disabled: false,
                  placeholder: 'User\'s name',
                  validator: VueFormGenerator.validators.string
                }, {
                  type: 'input',
                  inputType: 'password',
                  label: 'Password',
                  model: 'password',
                  min: 6,
                  required: true,
                  hint: 'Minimum 6 characters',
                  validator: VueFormGenerator.validators.string
                }, {
                  type: 'input',
                  inputType: 'number',
                  label: 'Age',
                  model: 'age',
                  min: 18,
                  validator: VueFormGenerator.validators.number
                }, {
                  type: 'input',
                  inputType: 'email',
                  label: 'E-mail',
                  model: 'email',
                  placeholder: 'User\'s e-mail address',
                  validator: VueFormGenerator.validators.email
                }, {
                  type: 'checklist',
                  label: 'Skills',
                  model: 'skills',
                  multi: true,
                  required: true,
                  multiSelect: true,
                  values: ['HTML5', 'Javascript', 'CSS3', 'CoffeeScript', 'AngularJS', 'ReactJS', 'VueJS']
                }, {
                  type: 'switch',
                  label: 'Status',
                  model: 'status',
                  multi: true,
                  readonly: false,
                  featured: false,
                  disabled: false,
                  default: true,
                  textOn: 'Active',
                  textOff: 'Inactive'
                }]
              }
            }
          },
          {
            id: Math.random().toString(36).substring(2, 15),
            name: 'test2',
            icon: '<i class="fa fa-camera"></i>'
          },
          {
            id: Math.random().toString(36).substring(2, 15),
            name: 'test3',
            icon: '<i class="fa fa-camera"></i>'
          },
          {
            id: Math.random().toString(36).substring(2, 15),
            name: 'test4',
            icon: '<i class="fa fa-camera"></i>'
          }
        ]
      }
    },
    methods: {
      removeUIElement (removedId, list = null) {
        if (list === null) {
          list = this.list
        }
        for (var key in list) {
          if (list.hasOwnProperty(key) === false) {
            continue
          }
          if (list[key].contentData !== undefined && list[key].contentData !== null) {
            for (var childAreaKey in list[key].contentData) {
              this.removeUIElement(removedId, list[key].contentData[childAreaKey])
            }
          }
          if (list[key].id === removedId) {
            delete list[key]
          }
        }

        this.list = list.filter(Object)
      }
    },
    created () {
      var self = this
      EventBus.$on("elementDeleted", function (elementId) {
        self.removeUIElement(elementId)
      })
    }
  }
</script>

<style>
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .flex-container {
    min-height: 100%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: box;
    -ms-flex-direction: row;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -ms-box-orient: horizontal;
    box-orient: horizontal;
  }

  .element-picker {
    background: #2c3e50;
    width: 250px;
    -ms-flex: 0 250px;
    -webkit-box-flex: 0;
    -moz-box-flex: 0;
    -ms-box-flex: 0;
    box-flex: 0;
  }

  .main {
    -ms-flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -ms-box-flex: 1;
    box-flex: 1;
  }

  div.draggable {
    border: 2px #dde4e8 dashed;
    border-radius: 5px;
    min-height: 100px;
  }
</style>