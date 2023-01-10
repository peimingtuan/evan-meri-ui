import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Scrollbar from "./src/scrollbar";

export const MScrollbar: SFCWithInstall<typeof Scrollbar> = withInstall(Scrollbar);
export default MScrollbar;
export * from './src/scrollbar-type';