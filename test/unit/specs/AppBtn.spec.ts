// <reference path='../../../node_modules/@types/jest/index.d.ts' />
import { mount } from 'vue-test-utils'
import AppBtn from '../../../src/components/AppBtn.vue'

describe('AppBtn.vue', () => {
  it('renders a button', () => {
    const label = 'Example label'
    const wrapper = mount(AppBtn, {
      slots: {
        default: label
      }
    })
    expect(wrapper.text()).toBe(label)
    expect(wrapper.element.innerHTML).toBe('button')
  })
})
