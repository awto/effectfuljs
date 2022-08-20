asyncErr();

async function asyncErr() {
	console.log("async line 1");
	await new Promise(rs => setTimeout(() => rs()));
	console.log("async line 2");
    try {
	  throw new Error("Err");
	  console.log("async line 3");
    } catch(e) {
        console.log("catch ", e);
    }
    console.log("async line 4");
    console.foobar("err");
    console.log("async line 5");
}
