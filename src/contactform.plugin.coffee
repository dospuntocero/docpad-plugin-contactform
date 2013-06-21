# Export
module.exports = (BasePlugin) ->
	# Define
	class ContactFormPlugin extends BasePlugin
		# Name
		name: 'contactform'

		# Config
		config:
			postUrl: '/contactform'
			postmarkAPI: '<your postmark api here>'
			toEmail: '<your email here>'
			successMessage: 'success! email was sent'
			blockHtml: """
				<section class="contactform">
					<form action="/contactform" method="POST">
						<label>Name: <input type="author" name="name" /></label>
						<label>Email: <input type="email" name="email" /></label>
						<label>Comment: <textarea name="comment"></textarea></label>
						<input type="submit" value="send" />
					</form>
				</section>
				""".replace(/^\s+|\n\s*|\s+$/g,'')

		# Extend Template Data
		# Add our form to our template data
		extendTemplateData: ({templateData}) ->
			# Prepare
			{docpad,config} = @

			# getContactForm
			templateData.getContactForm = ->
				@referencesOthers()
				return config.blockHtml

			# Chain
			@



		# Server Extend
		# Add our handling for posting the comment
		serverExtend: (opts) ->
			# Prepare
			{server} = opts
			{docpad,config} = @
			
			# form Handling
			server.post config.postUrl, (req, res, next) ->
				postmark = require("postmark")(config.postmarkAPI)
				postmark.send
					From: req.body.email
					To: config.toEmail
					Subject: req.body.name
					TextBody: req.body.comment
				, (error, success) ->
					if error
						console.error "Unable to send via postmark: " + error.message
						return
					config.blockHtml = config.successMessage
			@