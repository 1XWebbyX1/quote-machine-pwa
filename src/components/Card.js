import React from 'react'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'


var arr = []; //to store response from URL


//HELPER FUNCTIONS____________________________________________________________
function logResult(result) {
    var quotesData = result.quotes;
    arr.push(...quotesData);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
  $('#subs, #Q, #new-quote').css({opacity: 0});
  var errorMsg = 'Oops! Looks like there was a problem. Please reload the page and try again.';
  $('#text').text(errorMsg);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponseAsJSON(response) {
  return response.json();
}


function fetchJSON() {
  fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);
}
//___________________________________---------------------------------------------------





class Card extends React.Component{
   constructor(props){
     super(props);
     this.copyText = this.copyText.bind(this);
     this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
     fetchJSON();
  }

  handleClick(){
      var  randomQuote = arr[Math.floor(Math.random() * arr.length)];
      var  currentQuote = randomQuote.quote;
      var  currentAuthor = randomQuote.author;
      $("#text, #author, #copy-quote, .card-wrapper").animate(
      { opacity: 0 },
      2000,
      function() {
           $(this).animate({ opacity: 1}, 2000);
           $('#text').text(currentQuote);
           $('#author').html(currentAuthor);

      }
    );
     document.getElementById('new-quote').disabled =  true;

    //reenable the button after animation------------------------------
    setTimeout(function() {
        document.getElementById('new-quote').disabled =  false;
      }, 4000);

  }

  //copy Quote-------------------------------------
  copyText(){
     var copyText = document.getElementById("text");
     var $temp = $("<input>");
     $("body").append($temp);
     $temp.val($(copyText).text()).select(); //copy the quote and append to input , then select the text
     document.execCommand("copy");//copy the selected text
     $temp.remove();
    $('.tooltiptext').css('opacity', 1); //display copied tooltip text

    //hide tooltip after 1s
    setTimeout(function() {
        $('.tooltiptext').css('opacity', 0);
      }, 1000);
   }





  render(){
    return (
      <div className="card">
        <div id='Q'>Q</div>
        <div id="text">Too many of us are not living our dreams because we are living our fears.
          </div>
         <div id='subs'>
            <FontAwesomeIcon id="copy-quote" icon={faClipboard} onClick={this.copyText} />
            <span class="tooltiptext">Copied!</span>
           <div id='author'>Les Brown</div>
        </div>
        <button id="new-quote" onClick={this.handleClick}>New  Quote</button>
      </div>
    )
  }
}


export default Card;
