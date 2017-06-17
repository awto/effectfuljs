function a() {
  loo: for(let i = init();check() === true;upd())
    for(let j = initJ();checkJ() === true;updJ())
      if (i === j) continue; else continue loo;
}
