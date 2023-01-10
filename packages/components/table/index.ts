import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Table from './src/Table'
export const MTable: SFCWithInstall<typeof Table> = withInstall(Table)
export default MTable;

export * from './src/Table'