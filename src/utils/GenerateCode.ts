import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
import { v4 as uuidv4 } from 'uuid'

const generateQRCode = async (
  text: string,
  lineColor: string,
  backgroundColor: string
): Promise<string> => {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      margin: 1,
      color: {
        dark: lineColor,
        light: backgroundColor
      }
    })
    return dataUrl
  } catch (err) {
    console.error(err)
    return ''
  }
}

const generateHash = (length: number = 31): string => {
  const array = new Uint8Array(length / 2)
  window.crypto.getRandomValues(array)
  return Array.from(array, (byte) => ('0' + byte.toString(16)).slice(-2))
    .join('')
    .slice(0, length)
}

const generateBarcode = (text: string): string => {
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, text, {
    format: 'CODE128',
    background: 'transparent',
    lineColor: '#F3F3F3'
  })
  return canvas.toDataURL('image/png')
}

const generatePixKey = (): string => {
  return uuidv4()
}

export { generateBarcode, generateHash, generateQRCode, generatePixKey }
