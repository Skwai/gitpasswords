interface HTMLDialogElement extends HTMLElement {
  open: boolean
  returnValue: string
  close: () => void
  show: () => void
  showModal: () => void
}

declare var HTMLDialogElement: {
  prototype: HTMLDialogElement;
  new (): HTMLDialogElement;
}
