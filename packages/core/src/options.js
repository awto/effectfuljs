import { enableIf } from "./kit";

export const ifDirectives = enableIf(i => i.$ns && i.opts.directives !== false);
export const ifLoose = enableIf(i => i.opts.loose);
export const ifDefunct = enableIf(i => i.opts.defunct);
