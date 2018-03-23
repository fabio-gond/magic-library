
/*
** Read the DOM and return it like a String
*
* @author Rob W <http://stackoverflow.com/users/938089/rob-w>
* @found https://stackoverflow.com/questions/11684454/getting-the-source-html-of-the-current-page-from-chrome-extension
*
* Example
*
* window.onload=function(){
*  var html= DOMtoString(document);
* };
*/
function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }
    return html;
}


/*
** Search a Parent of an element using a query selector
*
* @found https://vanillajstoolkit.com/helpers/getparents/
* @autor 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
*
* @param  {Node}   elem     The element
* @param  {String} selector Selector to match against [optional]
* @return {Array}           The parent elements
* 
* Example
* var container= findParentBySelector(currButton,".container");
*/
var findParentBySelector = function (elem, selector) {
	// Element.matches() polyfill
	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.mozMatchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.oMatchesSelector ||
	        Element.prototype.webkitMatchesSelector ||
	        function(s) {
	            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	                i = matches.length;
	            while (--i >= 0 && matches.item(i) !== this) {}
	            return i > -1;
	        };
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};



/*
 *  Loop Over querySelectorAll Matches
 *
 *  @found https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
 *  
 *  @param {Array} array - The result of querySelectorAll
 *  @param {function} callback - The function to be executed
 *  @param {} scope - optionally change the scope as final parameter too, like ECMA5
 *
 *  @example
 *  var myNodeList = document.querySelectorAll('li');
 *  forEach(myNodeList, function (index, value) {
 *  console.log(index, value); // passes index + value back!
 *  });
*/
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};


/*
 *  DOM Mutation Observer EXAMPLE
 *
 *  @found https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 *  @found https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
 *  
 *  @param {Array} array - The result of querySelectorAll
 *  @param {function} callback - The function to be executed
 *  @param {} scope - optionally change the scope as final parameter too, like ECMA5
 *
*/
// select the target node
var target = document.querySelector('#some-id');
 
// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation.type);
    });
});
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }
 
// pass in the target node, as well as the observer options
observer.observe(target, config);
 
// later, you can stop observing
observer.disconnect();

// ----------------------------------------------------------------