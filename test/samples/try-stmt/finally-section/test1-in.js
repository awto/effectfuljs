function a() {
    try {
        if (eff("in body"))
            return;
    } finally {
        eff("in `finally`");
    }
    eff("after `finally`");
};

