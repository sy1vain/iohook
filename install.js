const path = require('path')
const readPkgUp = require('read-pkg-up')

async function build(){
	try{
		let {packageJson: {iohook}} = await readPkgUp({cwd:path.resolve(__dirname, '..')})
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
