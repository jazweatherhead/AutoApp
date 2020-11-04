const { Transform } = require('stream')
const util = require('util')

const myTransform = new Transform ({
	transform(chunk, encoding, callback) {
		callback(null, chunk)
	},
	flush(callback) {
		const newLine = /\n/
		chunk.replace(newLine, '\n')
	}
})