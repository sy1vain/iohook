const path = require('path')
const readPkgUp = require('read-pkg-up')

async function build(){
	try{
		let pkg = await readPkgUp({cwd:path.resolve(__dirname, '..')})
		pkg = pkg.packageJson || pkg.pkg
		let iohook = pkg.iohook
		if(!Array.isArray(iohook)) iohook = [iohook]
		buildAll(iohook)
	}catch(e){
		buildAll()
	}
}
build()

async function buildAll(targets=[{}]){
	const {BuildSystem} = require('cmake-js')
	
	for(const target of targets){
		const bs = new BuildSystem(target)
		await bs.reconfigure()
		await bs.build()
	}
}
