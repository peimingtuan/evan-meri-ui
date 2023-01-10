export { default as InputNumber } from './src/InputNumber'

import { withInstall, SFCWithInstall } from '../utils/with-intall'
import InputNumber from './src/InputNumber'
export const MInputNumber: SFCWithInstall<typeof InputNumber> = withInstall(InputNumber)
export default InputNumber;

export * from './src/InputNumber'