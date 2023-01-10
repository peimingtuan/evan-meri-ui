import { withInstall, SFCWithInstall } from '../utils/with-intall'
import Search from './src/Search'
export const MSearch: SFCWithInstall<typeof Search> = withInstall(Search)
export default MSearch;

export * from './src/Search'