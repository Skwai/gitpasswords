import Vue from 'vue'

const hub = new Vue()
export default hub

export const showModal = (component: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    hub.$on('confirm', (args: any) => {
      hub.$off('confirm')
      hideModal()
      resolve(args)
    })
    hub.$on('close', (args: any) => {
      hub.$off('close')
      hideModal()
      reject(args)
    })
    hub.$emit('showModal', component)
  })
}

export const hideModal = () => {
  hub.$emit('hideModal')
}
