import { withInstall, SFCWithInstall } from '../utils/with-intall'
import DatePicker from './src/DatePicker'
export const MDatePicker: SFCWithInstall<typeof DatePicker> = withInstall(DatePicker)
export default MDatePicker;

export * from './src/DatePicker'