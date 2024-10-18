import { ThemeType } from '@/types/userType'
import chroma from 'chroma-js'

export const setColorVariables = ({
  primary,
  secondary,
  thirdy,
  background,
  text_primary,
  text_secondary
}: ThemeType) => {
  const colorScale = (firstColor: string) => {
    return chroma.scale([firstColor, 'black']).colors(7)
  }

  // Setting Variable Primary Color
  document.body.style.setProperty('--color-primary-default', primary)
  document.body.style.setProperty('--color-primary-hover', colorScale(primary)[2])
  document.body.style.setProperty('--color-primary-text', text_primary)
  document.body.style.setProperty(
    '--color-primary-active',
    colorScale(text_primary)[2]
  )
  document.body.style.setProperty('--color-primary-disabled', colorScale(primary)[5])

  // Setting Variable Secondary Color
  document.body.style.setProperty('--color-secondary-default', secondary)
  document.body.style.setProperty(
    '--color-secondary-hover',
    colorScale(secondary)[2]
  )
  document.body.style.setProperty('--color-secondary-text', text_secondary)
  document.body.style.setProperty(
    '--color-secondary-active',
    colorScale(text_secondary)[2]
  )
  document.body.style.setProperty(
    '--color-secondary-disabled',
    colorScale(secondary)[5]
  )

  // Setting Variable Tertiary Color
  document.body.style.setProperty('--color-tertiary-default', thirdy)
  document.body.style.setProperty('--color-tertiary-hover', colorScale(thirdy)[2])
  document.body.style.setProperty('--color-tertiary-text', colorScale(thirdy)[1])
  document.body.style.setProperty('--color-tertiary-active', colorScale(thirdy)[4])
  document.body.style.setProperty('--color-tertiary-disabled', colorScale(thirdy)[5])

  // Setting Variable Background Color
  document.body.style.setProperty('--background', background)
}
