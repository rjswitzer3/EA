/* HTML GENERATOR
function insertHTML(id,select){
  var idx = document.getElementById(id);
  
  if(!idx){
    
  }
  idx.innerHTML = select;
}

function run(){
  var html = createTable(data); //createTable fucntion still needed
  insertHTML('tabledata',html);
  
}
*/
var VENDOR = [
                  ['f44ab1785505','Maplevale Farms'],
                  ['52efo85190e0','Rochester Meats'],
                  ['9fdf80e721a6','Sysco'],
                  ['be233733f9ca','US. Foods']
                  ];
                  
var PARADISE_QUOTES = [
['Never have I ever felt this way for'],
['She was my first girlfriend.'],
['She never left my side through the thick and thin.'],
['Because I have been falling for her'],
['She said she didnt want a relationship.'],
['She likes me but wants to see where things will go'],
['She"s still torn about Matt'],
];

var MAX_LENGTH = 9;
                  
function disableInputs() {
    $("#btnSubmit").attr("disabled", "disabled");
    $("#btnRequest").attr("disabled", "disabled");
}
  
function initializeInputs(){
    $("#ddlStores").val('');
    $("#ddlVendors").attr("disabled", "disabled");
    $("#ddlVendors").val('');
    $("#ddlVendors").html('<option>Select a Assignment</option>');
    $("#btnSubmit").attr("disabled", "disabled");
    $("#btnRequest").attr("disabled", "disabled");

    var fileUpload = $("#VendorFile");
    fileUpload.attr("disabled", "disabled");
    fileUpload.replaceWith(fileUpload = fileUpload.clone(true));
}

function init(){
  $("#ddlStores").removeAttr("disabled");
  $("#ddlVendors").show();
  marker = $('<span />').insertBefore('#tbVendorName');
  $('#tbVendorName').detach().attr('type', 'hidden').insertAfter(marker).focus();
  marker.remove();
  //$('#addNewVendor').text('Submit a New Vendor');
  $('#divActions').show();
  $('#divRequest').hide();
  $('#lblSelectFile').text('Select Assignment File:');
}

function updateImports(import_data){
  var action = 'import.html';
  if(import_data !== null){
    
    var historyTableBody = $("#uploadHistory tbody");
    var count = historyTableBody.children("tr").length;
    
    if(count >= MAX_LENGTH){  historyTableBody.children("tr:last").remove();}
    
    var historyRow = $('<tr>');
    for(var i=0;i<import_data.length;i++){
      historyRow.append($('<td>').html(import_data[i]));
    }
    
    historyTableBody.prepend(historyRow);
    /*
    $.get(action, function(result){
      var historyTableBody = $("#uploadHistory tbody");
      var count = historyTableBody.children("tr").length;
      
      if(count >= MAX_LENGTH){  historyTableBody.children("tr:last").remove();}
      
      var historyRow = $('<tr>');
      for(var i=0;i<import_data.length;i++){
        historyRow.append($('<td>').html(import_data[i]));
      }
      
      historyTableBody.prepend(historyRow);
    });*/

  }
}

function dateFormat(version){
  var elements = [];
  elements[0] = version.getMonth() + 2;
  elements[1] = version.getDate() + 10;
  //Hacked Methodology:: All provided sample files were from 2014
  if(version.getYear() == '114'){elements[2] = 2016;}
  else{elements[2] = 2016;}
  
  fdate=elements[0]+'/'+elements[1]+'/'+elements[2];
  return fdate;
}

function import_ven(){
  var action = $('#addNewVendor').text();
  
  var store = $("#ddlStores option:selected").text();
  var vendor = $("#ddlVendors option:selected").text();
  var file = $("#VendorFile")[0].files[0].name;
  var status = "Success";
  var version = $("#VendorFile")[0].files[0].lastModifiedDate;
  version = dateFormat(version);
  
  var import_data = [store,vendor,file,status,version];
  
  $("#btnSubmit").val("Upload");
  //alert('Import');
  init();
  initializeInputs();
  updateImports(import_data);
  $('#lblSelectFile').text('Select Assignment File:');
}
        
$(document).ready( function() {

  $("#ddlVendors").attr("disabled", "disabled");
  $("#VendorFile").attr("disabled", "disabled");
  $("#btnSubmit").attr("disabled", "disabled");
  $("#btnRequest").attr("disabled", "disabled");
  $("#divRequest").hide();
  
  // On store selection
  $(document).on('change', '#ddlStores', function(){
    var index = $('#ddlStores')[0].selectedIndex;
    if (index>0){
      
      //var ddl = $('#ddlVendors');
      var select = '<option>Select a Assignment</option>';
      
      for(var i=0;i<VENDOR.length;i++){
        select += ("<option value='"+VENDOR[i][0]+"'>"+VENDOR[i][1]+"</option>");
      }
      $('#ddlVendors').html(select);
      $("#ddlVendors").removeAttr("disabled");
      $("#tbVendorName").removeAttr("disabled");
      
    }else{
      
    }
  });
  
  // On vendor selection
  $(document).on('change', '#ddlVendors', function () {
      var index = $('#ddlVendors')[0].selectedIndex;
      // Show file input if vendor selected, else hide the other component until one is selected
      if (index > 0) {
          $("#VendorFile").removeAttr("disabled");
      }else {
          var fileUpload = $("#VendorFile");
          fileUpload.attr("disabled", "disabled");
          fileUpload.replaceWith(fileUpload = fileUpload.clone(true));
          $("#btnSubmit").attr("disabled", "disabled");
          $("#btnRequest").attr("disabled", "disabled");
      }
  });
  

  // When a file is chosen show the submit button
  $(document).on('change', '#VendorFile', function () {
      $("#btnSubmit").removeAttr("disabled");
      $("#btnRequest").removeAttr("disabled");
      
  });


  $(document).on('keyup', '#tbVendorName', function () {
      if($('#tbVendorName').val().length > 0){
          $("#VendorFile").removeAttr("disabled");
      }else{
          $("#VendorFile").attr('disabled','disabled');
      }
  });
  
 /* $("#addNewVendor").click(function(){
    if($('#addNewVendor').text() == "Select a Vendor"){
      
    }
  });*/
  
  //OLD::SUBMIT NEW VENDOR FX
  $("#addNewVendor").click(function () {
      if($('#addNewVendor').text() == "Select a Vendor"){
          $("#ddlStores").removeAttr("disabled");
          $("#ddlVendors").show();
          marker = $('<span />').insertBefore('#tbVendorName');
          $('#tbVendorName').detach().attr('type', 'hidden').insertAfter(marker).focus();
          marker.remove();
          $('#addNewVendor').text('Submit a New Vendor');
          $('#divActions').show();
          $('#divRequest').hide();
          $('#lblSelectFile').text('Select Vendor File:');
      }else{
          $("#ddlStores").attr('disabled','disabled');
          $("#ddlVendors").hide();
          marker = $('<span />').insertBefore('#tbVendorName');
          $('#tbVendorName').detach().attr('type', 'text').insertAfter(marker).focus();
          marker.remove();
          $('#addNewVendor').text('Select a Vendor');
          $('#divActions').hide();
          $('#divRequest').show();
          $('#lblSelectFile').text('Add A Sample Vendor File:');
      }
  });
  
  $("#btnRequest").click(function(){
    $("#btnRequest").val("Uploading...");
    var vendor_name = $("#tbVendorName").val();
    var vendorFile = $('#VendorFile').prop('files');
    //var file = $('#VendorFile')[0].files[0];
    var fd = new FormData();
    fd.append("name",vendor_name);
    fd.append("file",vendorFile);
    disableInputs();
    
    
    //var val = '#'+Math.floor(Math.random()*16777215666).toString(16);
    //console.log('KEY::'+val);
    //DELAY | PROGRESS BAR
    
    $('#btnRequest').val("Submit");
    init();
    initializeInputs();
  });
  

  $("#uploadForm").submit(function (event) {
      $("#btnSubmit").val("Processing...");
      //alert('Submit');
      disableInputs();
      import_ven();
      
      var action = $('#addNewVendor').text();
      var uploadKey = $("#uploadForm").serialize();
      
      /*// Show the progress bar                        //!!NTD!!
      var progress_html = $("#hiddenProgress").html();
      bootbox.dialog({
          title: "Initializing Upload Process",
          message: progress_html,
          closeButton: false,
      });*/
     
  });


  var finished = false;
  $("#uploadForm").ajaxForm(function(data) {
  //$("uploadForm").click( function(data) {
      finished = false;
      var action = $('#addNewVendor').text();
      var uploadKey = $("#uploadForm").serialize();
      
      /*// Show the progress bar                        //!!NTD!!
      var progress_html = $("#hiddenProgress").html();
      bootbox.dialog({
          title: "Initializing Upload Process",
          message: progress_html,
          closeButton: false,
      });*/

      /*switch(action){
        case'Submit a New Vendor':
          var store = $("#ddlStores option:selected").text();
          var vendor = $("#ddlVendors option:selected").text();
          var file = $("#VendorFile")[0].files[0].name;
          var status = "Success";
          var version = $("#VendorFile")[0].files[0].lastModifiedDate;
          version = dateFormat(version);
          
          var import_data = [store,vendor,file,status,version];
          
          $("#btnSubmit").val("Import Vendor");
          initializeInputs();
          updateImports(import_data);
          break;
        case'Select a Vendor':
          initializeInputs();
          break;
      }*/
      
      
      
/*
      // Change button text
      $("#btnSubmit").val("Import Vendor");

      // Reinitialize form inputs
      initializeInputs();
      
      // Update import data
      updateImports(uploadKey);

      var progressBar = $(".bootbox-body .progress .progress-bar");
      var title = $(".modal-title");

      //Setting the timer to update progress
      window.progressIntervalId = window.setInterval(function () {
          //Getting current operation progress
          var progressAction = '/Vendor/UploadStatus';
          $.get(progressAction, {uploadKey: uploadKey}, function (data) {
          //Updating progress
          var progress = data.progress;
          var status = data.status;
          progressBar.attr("style", "width: " + progress + "%");
          title.text(status);
          //If operation is complete
          if (data.progress == 100 && !finished) {
              finished = true;
              //Clear timer
              window.clearInterval(window.progressIntervalId);
              // Hide progress
              bootbox.hideAll();
              
              // Change button text
              $("#btnSubmit").val("Import Vendor");

              // Reinitialize form inputs
              initializeInputs();
              
              // Update import data
              updateImports(uploadKey);
          }
          });
      }, 100);*/
  });
});