import M from "@effectful/core";
import {block, block as opts} from "@effectful/core";

M.option({combineOps:true,
          scopeContext:true,
          scopePrefix:true,
          contextState:false,
          topLevel:false,
          contextMethodOps:true,
          cleanupFrameVars:false,
          par:true,
          keepLastPure:true,
          defunct:true,
          storeCont:"$state",
          storeHandler:"$run",
          reuseTempVars:true,
          blockDirsFunc: "block"
         })

async function a() {
  await s_1
  {
    M.block("par")
    await p_1
    await p_2
  }
}

async function b() {
  await s_1
  {
    opts("par")
    await p_1
    await p_2
  }
}

async function c() {
  await s_1
  {
    block("par")
    await p_1
    await p_2
  }
}

async function d() {
  await s_1
  {
    "par"
    await p_1
    await p_2
  }
}
