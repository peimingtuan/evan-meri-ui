import { SFCWithInstall, withInstall } from "../utils/with-intall";
import Tips from "./src/Tips";

export const MTips: SFCWithInstall<typeof Tips> = withInstall(Tips);
export default MTips;

// export * from './src/popover-types';
