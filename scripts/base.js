
GAME_DIV = 's-result-item celwidget';
TITLE_DIV = 'a-size-medium a-color-null s-inline s-access-title a-text-normal';
ID_DIV = 'a-size-small a-color-secondary';
TIV_DIV = 'a-color-price a-text-bold';
ID_MARKER = 'ISBN-10:';
/*
tivs = key:
    {key:key,
    name:name,
    tiv:tiv,
    old_tiv:old_tiv}

*/


function checkAll(){
  tivs = {}
  getPage(int2Html(1),function(err,response){
    console.log(checkPage(response));
  });
}


function getPage(htmlStr,callback){
  $.get(htmlStr,function(result){
    callback(null,result);
  });
}

function checkPage(response){
  var bot = response.search("Robot Check");
  if(bot > -1){
    //robot check went off.  kill everything
    console.log('robot check went off');
    return [-1];
  }
  else{
    var el = document.createElement( 'html' );
    el.innerHTML = response;
    var gamesDiv = el.getElementsByClassName(GAME_DIV);

    if (gamesDiv.length > 0){
      var allPrices = []
      for (j=0;j<gamesDiv.length;j++){
        var indArr = []
        var title = gamesDiv[j].getElementsByClassName(TITLE_DIV)[0].innerText.trim();
        var ids = gamesDiv[j].getElementsByClassName(ID_DIV);

        for (k in ids){
          if (typeof ids[k] !== "undefined"){
            if (ids[k].innerText == ID_MARKER){
              var id = ids[parseFloat(k)+1].innerText;
            }
          }
        }
        var tiv = gamesDiv[j].getElementsByClassName(TIV_DIV)[0].innerText.trim();
        indArr=[id,title,tiv];
        allPrices.push(indArr);
      }
    }
    return allPrices;
  }
}

function getLastPage(result){
  var bot = result.search("Robot Check");
  if(bot > -1){
    //robot check went off.  kill everything
    console.log('robot check went off');
    return -1;
  }
  else{
    var el = document.createElement( 'html' );
    el.innerHTML = result;
    var lastPage = el.getElementsByClassName('pagnDisabled');
    return parseFloat(lastPage[0].innerHTML);
  }
}

function int2Html(i){
  tiStr_A = 'http://www.amazon.com/s/ref=sr_pg_'
  tiStr_B = '?srs=9187220011&rh=n%3A468642&page='
  tiStr_C = '&bbn=468642&ie=UTF8&qid=1454641315'

  return tiStr_A+i+tiStr_B+i+tiStr_C;
}
