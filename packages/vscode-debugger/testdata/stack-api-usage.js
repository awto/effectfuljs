let error1 = {};
let error2 = {};

Error._edbg_short_file_names = true;

async function d() {
  await new Promise(rs => setTimeout(rs,10));
  Error.captureStackTrace(error1);
  Error.captureStackTrace(error2,d);
}

const c = new Function("d", "return d();")

async function b() {
  await Promise.all([
    new Promise(rs => setTimeout(rs,10)), 
    Promise.race([
      new Promise(()=>{}),
      eval("(function a() { return c(d); })")()])
    ])
}

function a() {
   b().then(() => {
    const savedPrep = Error.prepareStackTrace;
    Error.prepareStackTrace = function(error, frames)  {
        let id = 0;
        const stack = [];
        for(const i of frames) {
           ++id;
           stack.push(`
====================> ${id}
  getThis: ${i.getThis()},
  getTypeName: ${i.getTypeName()},
  getFunction: ${typeof i.getFunction()},
  getFunctionName: ${i.getFunctionName()},
  getMethodName: ${i.getMethodName()},
  getFileName: ${i.getFileName()},
  getLineNumber: ${i.getLineNumber()},
  getColumnNumber: ${i.getColumnNumber()},
  getEvalOrigin: ${i.getEvalOrigin()},
  isToplevel: ${i.isToplevel()},
  isEval: ${i.isEval()},
  isNative: ${i.isNative()},
  isConstructor: ${i.isConstructor()},
  isAsync: ${i.isAsync()},
  isPromiseAll: ${i.isPromiseAll()},
  isPromiseAny: $ {i.isPromiseAny()},
  getMethodName: ${i.getMethodName()},
  getPromiseIndex: ${i.getPromiseIndex()}`)
        }
        return stack.join("\n");
    }
    const ret = `${error1.stack}\n${error2.stack}\n`
    Error.prepareStackTrace = savedPrep;    
    debugger;
    console.log(ret);
	});
}

a();
