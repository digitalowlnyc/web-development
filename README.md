# Resources

#### Box model and sizing
* http://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively

#### Events
* https://css-tricks.com/dangers-stopping-event-propagation/

#### Positioning
* https://css-tricks.com/handling-z-index/

# CSS: How do I...

###### Center text vertically
Reference: http://stackoverflow.com/questions/2939914/vertically-align-text-in-a-div

Summary: There are 3 ways:
* If your div is a fixed height, 100px for example, set `line-height: 100px` and then add `vertical-align: middle`
* Use table layout. You need to add a parent div with `display: table` and the content div should have `display: table-cell`. See linked example for exact CSS.
* Use flex box layout
