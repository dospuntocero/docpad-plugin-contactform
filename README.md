# Contact form Plugin for DocPad
Adds a simple contact form to [DocPad](https://docpad.org) using postmark


## Install

1. Install the Plugin

  ```
  npm install --save --force docpad-plugin-contactform
  ```

1. Output the contact form. You may have to change your document's extension (that you place this snippet inside) to `my-document.html.eco`.

  ```
  <%- @getContactForm() %>
  ```

## Configure

this needs to be addded to your docpad.coffee configuration file

    plugins:
      contactform:
          postmarkAPI: '<your API number here>'
          toEmail: '<your email here>'
    


## History
You can discover the history inside the `History.md` file


## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2013 [dospuntocero Ltd](http://dospuntocero.cl)
