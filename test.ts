import Command from "./nifty-cmd"

var quickRun = async()=>{
	var cmd = new Command("npm")
	var result = await cmd.run()
	console.log(result.stdout)
}

var longRun = async()=>{
	var cmd = new Command("sort", {
		onStdErr: (data)=>{
			process.stdout.write(data)
		},
		onStdOut: (data)=>{
			process.stdout.write(data)
		}
	})
	var running = cmd.run()
	cmd.writeToStdin("1\n3\n2")
	cmd.writeToStdin(null)
}

var longRunLog = async()=>{
	var cmd = new Command("sort", {log: true})
	var running = cmd.run()
	cmd.writeToStdin("1\n3\n2")
	cmd.writeToStdin(null)
}

var kill = async()=>{
	var cmd = new Command("node", {
		onStdErr: (data)=>{
			process.stdout.write(data)
		},
		onStdOut: (data)=>{
			process.stdout.write(data)
		}
	})
	var running = cmd.run()
	cmd.kill()
}

var errRed = async()=>{
	var cmd = new Command("sort -fdskfjsdjfksdjflksdjklf", {log: true})
	var running = cmd.run()
	cmd.writeToStdin("1\n3\n2")
	cmd.writeToStdin(null)
}

var main = async()=>{
	await quickRun()
	await longRun()
	await longRunLog()
	await kill()
	await errRed()
}
main()

