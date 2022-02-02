const jwt = require("jsonwebtoken")

// --( MODELS )--
const User = require("../models/user")
const Employer = require("../models/employer")
const Candidate = require("../models/candidate")

module.exports = async (req, res, next) => {
	const auth_header = req.headers.authorization
	const token = auth_header && auth_header.split(" ")[1]

	// If there is no token, return an error
	if (!token) return res.json({
		...global.jsonBag,
		error: {
			message: "Sorry, no token sent!",
			data: null
		},
		data: null
	})


	// If token is found, get user.id from JWT and
	// find user"s proper info from DB
	try {
		let user_payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET)

		let found_user = await User.findById(user_payload.id, [
			"_id",
			"role",
			"fullname",
			"email",
			"avatar",
			"createdAt"
		]).lean()

		// If there is no user, return an error
		if (!found_user) return res.json({
			...global.jsonBag,
			error: {
				message: "Sorry, no user found!",
				data: null
			},
			data: null
		})

		found_user.name = { first: `${found_user.fullname.split(" ")[0]}`, last: `${found_user.fullname.split(" ")[1]}` }

		let user_profile = found_user.role == "employer"
			? await Employer.findOne({ user_id: found_user._id }).lean()
			: await Candidate.findOne({ user_id: found_user._id }).lean()

		const profile = { ...user_profile }
		req.user = { ...found_user, profile }

	} catch (err) {
		return res.json({
			...global.jsonBag,
			error: {
				message: err.message,
				data: { ...err }
			},
			data: null
		})
	}
	next()
}