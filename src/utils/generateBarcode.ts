import JsBarcode from 'jsbarcode'

export const generateBarcode = (text: string): string => {
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, text, {
    format: 'CODE128',
    background: 'transparent',
    lineColor: '#F3F3F3'
  })
  return canvas.toDataURL('image/png')
}
