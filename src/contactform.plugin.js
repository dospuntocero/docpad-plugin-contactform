var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = function(BasePlugin) {
  var ContactFormPlugin;
  return ContactFormPlugin = (function(_super) {

    __extends(ContactFormPlugin, _super);

    function ContactFormPlugin() {
      return ContactFormPlugin.__super__.constructor.apply(this, arguments);
    }

    ContactFormPlugin.prototype.name = 'contactform';

    ContactFormPlugin.prototype.config = {
      postUrl: '/contactform',
      blockHtml: "<section class=\"contactform\">\n	<form action=\"/contactform\" method=\"POST\">\n		<label>Name: <input type=\"author\" name=\"name\" /></label>\n		<label>Email: <input type=\"email\" name=\"email\" /></label>\n		<label>Comment: <textarea name=\"comment\"></textarea></label>\n		<input type=\"submit\" value=\"send\" />\n	</form>\n</section>".replace(/^\s+|\n\s*|\s+$/g, '')
    };

    ContactFormPlugin.prototype.extendTemplateData = function(_arg) {
      var config, docpad, templateData;
      templateData = _arg.templateData;
      docpad = this.docpad, config = this.config;
      templateData.getContactForm = function() {
        this.referencesOthers();
        return config.blockHtml;
      };
      return this;
    };

    ContactFormPlugin.prototype.serverExtend = function(opts) {
      var config, docpad, server;
      server = opts.server;
      docpad = this.docpad, config = this.config;
      server.post(config.postUrl, function(req, res, next) {
        var postmark;
        postmark = require("postmark")("234234");
        return postmark.send({
          From: req.body.email,
          To: "fa@mail.cl",
          Subject: req.body.name,
          TextBody: req.body.comment
        });
      });
      return this;
    };

    return ContactFormPlugin;

  })(BasePlugin);
};
