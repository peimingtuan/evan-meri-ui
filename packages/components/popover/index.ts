import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Popover from "./src/Popover";

export const MPopover: SFCWithInstall<typeof Popover> = withInstall(Popover);
export default MPopover;

export * from './src/popover-types';
