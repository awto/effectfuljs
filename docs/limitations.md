## Known major limitations
 * ES6 supper just replaced with `Object.getPrototypeOf(...)` and `call`, 
   this is enough for most applications. If it is not, transpile classes with babel 
   before effectful pass. No plans to fix this for now. No plans to implement.
 * In parameter's threading mode closure captured variables are always handled by reference. 
   Compiler tries to handle only
   variables by value. All mutating operation like `Array.prototype.push` or object's 
   field setting are still visible in other control threads. Closure capturing variables
   semantically are nothing but object's field. So they are references now too.
   But there are short term plans to track even mutating updates soon.
 * setters/getters and constructors cannot be effectful now, may be changed in near future
   after effectful's object referrences are implemented
 * eval/Function construction from string doesn't work, no plans to implement it.
 * configurations with state handling don't support `arguments` object aliasing 
   (chainging its element - changes parameter value).
   This may be implemented in future.
