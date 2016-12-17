# About

This repo contains code samples, reference material (Stackoverflow links, etc), and tips/info related to common web development problems or tasks.

License info is at the end of this readme.

# Useful Tools
Regexes:
- Create, test, and generate code: https://regex101.com/

CSS - colors:
- CSS Gradient creator: http://www.colorzilla.com/gradient-editor/

JSON:
- Validate and format: http://jsonlint.com/
- Validate and format: http://bnest.co/tools/json-validate.php

# Reference material

#### Box model and sizing
* http://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

#### Events
* https://css-tricks.com/dangers-stopping-event-propagation/

#### Positioning
* https://css-tricks.com/handling-z-index/

# iframes: How do I...
###### Run javascript or interact with the html content in an iFrame (on a different domain)
The answer is that you cannot. The reason is security. Imagine if I had a web page that secretly had an iFrame in the background which launched your bank's login page. If I could interact with that page using JS from the parent, I could attempt to login as you with any saved credentials that your browser populates.

Also, some sites include the "X-Frame-Options: SAMEORIGIN" response header which means you cannot load their content in an iframe at all.

# CSS: How do I...

###### Center text vertically
Reference: http://stackoverflow.com/questions/2939914/vertically-align-text-in-a-div

Summary: There are 3 ways:
* If your div is a fixed height, 100px for example, set `line-height: 100px` and then add `vertical-align: middle`
* Use table layout. You need to add a parent div with `display: table` and the content div should have `display: table-cell`. See linked example for exact CSS.
* Use flex box layout

###### Center text (or any inline element) horizontally
Use `text-align: center`, which only applies to inline element positioning inside of its parent element

###### Center a div horizontally
Use `margin: 0 auto` and set a width on your div. 0 can be changed to whatever the top/bottom margin needs to be, `auto` is what does the centering.

# License

Any code or documentation here is free for your use, both commercial and non-commercial. Attribution is appreciated but not required. The content here is provided 'as-is'. If you do use anything here, you agree not to hold me liable for anything, including but not limited to problems resulting from existing bugs in the code.

An example (voluntary) attribution comment is below. I also love hearing back from people if any of this helps so that I know to keep adding more to it.

```
// This code is free to reuse. Thanks to: github.com/digitalowlnyc.
```
