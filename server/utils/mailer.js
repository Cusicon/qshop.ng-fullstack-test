const nodemailer = require("nodemailer")
const path = require("path")
const ejs = require("ejs")

async function sendMail(config, obj, replacements) {
	let mailTransporter = nodemailer.createTransport({
		host: process.env.NODE_ENV === "development" ? process.env.MAILTRAP_HOST : "employed.ng",
		port: process.env.NODE_ENV === "development" ? process.env.MAILTRAP_PORT : 465,
		auth: process.env.NODE_ENV === "development" ? {
			user: process.env.MAILTRAP_USER,
			pass: process.env.MAILTRAP_PASS
		} : { ...config.auth },
	})

	obj = { ...obj, from: config.fromEmail }

	let htmlFilePath = path.join(__dirname, `../public/${obj.html}`)
	let htmlFile = await ejs.renderFile(htmlFilePath, replacements)

	obj.html = htmlFile

	return mailTransporter.sendMail(obj)
}

// Support Mail
async function sendSupportMail(obj, replacements) {
	let sendingEmail = "support@employed.ng",
		fromEmail = `Employed.ng - Support <${sendingEmail}>`;

	let configObj = {
		fromEmail,
		auth: {
			user: sendingEmail,
			pass: `${process.env.EMAILPASS}`
		}
	};

	return await sendMail(configObj, obj, replacements)
}

// No-Reply Mail
async function sendNoReplyMail(obj, replacements) {
	let sendingEmail = "no-reply@employed.ng",
		fromEmail = `Employed.ng <${sendingEmail}>`;

	let configObj = {
		fromEmail,
		auth: {
			user: sendingEmail,
			pass: `${process.env.EMAILPASS}`
		}
	};

	return await sendMail(configObj, obj, replacements)
}

// Info Mail
async function sendInfoMail(obj, replacements) {
	let sendingEmail = "info@employed.ng",
		fromEmail = `Employed.ng <${sendingEmail}>`;

	let configObj = {
		fromEmail,
		auth: {
			user: sendingEmail,
			pass: `${process.env.EMAILPASS}`
		}
	};

	return await sendMail(configObj, obj, replacements)
}

module.exports = {
	sendSupportMail,
	sendNoReplyMail,
	sendInfoMail
}