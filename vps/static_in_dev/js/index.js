const SORT_BY_TIME = 1
const SORT_BY_TIME_REVERSE = 2
const SORT_BY_LOAD = 3
const SORT_BY_LOAD_REVERSE = 4

// Refresh and sort .table__records
function refreshTables(sortType=SORT_BY_TIME) {
  $.ajax({
    url: '/api/log/',
    method: 'get',
    dataType: 'json',
    success: function(data){
      let records = data.records 

      let lastRefresh = records[0].name
      $(".navbar_span__last_refresh").html('Last record: ' + lastRefresh);
      
      switch (sortType){
        case SORT_BY_TIME: 
          if (currentSortType != sortType){
            $(".table-th__record-time").html('time &#9660');
            $(".table-th__record-load").html('CPU load, %');
          }
          records.sort( (obj1, obj2) => {
            if (obj1.name < obj2.name) return -1;
            if (obj1.name > obj2.name) return 1;
            return 0;
          })
          break;

        case SORT_BY_TIME_REVERSE: 
          if (currentSortType != sortType){
            $(".table-th__record-time").html('time &#9650');
            $(".table-th__record-load").html('CPU load, %');
          }
          records.sort( (obj1, obj2) => {
            if (obj2.name < obj1.name) return -1;
            if (obj2.name > obj1.name) return 1;
            return 0;
          })  
          break;

        case SORT_BY_LOAD: 
          if (currentSortType != sortType){
            $(".table-th__record-time").html('time');
            $(".table-th__record-load").html('CPU load, % &#9660');
          }
          records.sort( (obj1, obj2) => obj1.load - obj2.load )   
          break;

        case SORT_BY_LOAD_REVERSE: 
          if (currentSortType != sortType){
            $(".table-th__record-time").html('time');
            $(".table-th__record-load").html('CPU load, % &#9650');
          }
          records.sort( (obj1, obj2) => obj2.load - obj1.load )   
      } 

      $(".table-tbody__records .table-tr__record, .table-tbody__minmaxavg .table-tr__minmaxavg").remove() // delete tbodys

      let min = 100.00, max = 0.00, sum = 0.00
      let recordsLength = records.length
      for (let i = 0; i < recordsLength; i++){
        loadCurrent = records[i].load
        $("<tr class='table-tr__record'><td>" + records[i].name + "</td><td>" + loadCurrent + "</td></tr>")            
          .appendTo('.table-tbody__records')
        sum += Number(loadCurrent)
        min = (Number(loadCurrent) < Number(min)) ? Number(loadCurrent) : Number(min);
        max = (Number(loadCurrent) > Number(max)) ? Number(loadCurrent) : Number(max);
      }
      let avg = sum / recordsLength 
      $("<tr class='table-tr__minmaxavg'><td>" + min + "</td><td>" + max + "</td><td>" + avg.toFixed(2) + "</td></tr>")            
        .appendTo('.table-tbody__minmaxavg')

      currentSortType = sortType

      console.log('do')
    }
  });
}   

let currentSortType = null

$(document).ready( () => {
  refreshTables()
})

$(".table-th__record-time").bind('click', () => {
  if (currentSortType == SORT_BY_TIME){
    refreshTables(SORT_BY_TIME_REVERSE)
  } else {
    refreshTables(SORT_BY_TIME)
  }
})

$(".table-th__record-load").bind('click', () => {
  if (currentSortType == SORT_BY_LOAD){
    refreshTables(SORT_BY_LOAD_REVERSE)
  } else {
    refreshTables(SORT_BY_LOAD)
  }
})

$(".navbar_button__refresh").bind('click', () => {
  refreshTables(currentSortType)
})

setInterval( () => {
  refreshTables(currentSortType)
}, 5000) // interval == 5 sec