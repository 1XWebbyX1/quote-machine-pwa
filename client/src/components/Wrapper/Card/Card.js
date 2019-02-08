import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard  } from '@fortawesome/free-solid-svg-icons'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'


class Card extends React.Component{
   constructor(props){
     super(props);
     this.copyText = this.copyText.bind(this);
     this.handleClick = this.handleClick.bind(this);
     this.fetchQuotes = this.fetchQuotes.bind(this);
     this.tweet = this.tweet.bind(this);
     this.openURL = this.openURL.bind(this);
     this.inIframe = this.inIframe.bind(this);
     this.textarea = React.createRef();
     this.arr = [];
  }

  componentDidMount(){
     this.fetchQuotes();
  }

  fetchQuotes(){
    fetch("/api/getQuotes")
      .then(data => data.json())
      .then(res => {
        this.arr = res.data;
      })
      .catch(err => {
        console.log("FETCH FAILED WITH ERROR: " + err);
        this.props.setCardVisibility('hide');
        alert("Couldn't connect to database. Refresh the page and try again.");
      });
  }

  handleClick(){
      var  randomQuote = this.arr[Math.floor(Math.random() * this.arr.length)];
      this.props.setCardVisibility('hide');
      this.props.disableButton(true);
      setTimeout(function(){
        this.props.setCardVisibility('show');
        this.props.changeQuote(randomQuote.quote, randomQuote.author);
      }.bind(this), 2000);

    //re-enable the button after animation------------------------------
    setTimeout(function() {
      this.props.disableButton(false);
    }.bind(this), 3000);

  }


  //copy Quote-------------------------------------
  copyText(e){
     window.getSelection().selectAllChildren(this.textarea.current);
     document.execCommand('copy');
     this.props.setTooltipVisibility('show');
    setTimeout(function() {//hide tooltip after 1s
      this.props.setTooltipVisibility('hide');
    }.bind(this), 1000);
   }


   inIframe(){
     try {
       return window.self !== window.top;
     } catch (e) {
       return true;
     }
   }

   openURL(url){
     window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
   }


 tweet(){
   if(!this.inIframe()) {
      this.openURL('https://twitter.com/intent/tweet?hashtags=quotes&text=' + encodeURIComponent('"' + this.props.currentQuote + '"'));
    }
 }



  render(){
    return (
      <div className={"card "+ this.props.cardVisibility}>
        <div id='Q'>Q</div>
        <div ref={this.textarea} readOnly={true} id="text">{this.props.currentQuote}</div>
          <span className={"tooltiptext "+ this.props.tooltipVisibility}>Copied!</span>
          <div id='subs'>
            <div id='icons'>
             <FontAwesomeIcon id="copy-quote" icon={faClipboard} onClick={this.copyText} />
             <FontAwesomeIcon id='tweet-quote' icon={faTwitterSquare} onClick={this.tweet}/>
           </div>
           <div id='author'>{this.props.currentAuthor}</div>
        </div>
        <button disabled={this.props.disabled} id="new-quote" onClick={this.handleClick}>New  Quote</button>
      </div>
    )
  }
}


export default Card;
