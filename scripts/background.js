
//function(){
var lastPage;
var fullList = [];

checkAll();

function updateList(newList){
  fullList = fullList.concat(newList);
}

function getList(){
  return fullList;
}
