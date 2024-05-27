import QRCode from 'qrcode'

export const generateQRCode = async (
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
