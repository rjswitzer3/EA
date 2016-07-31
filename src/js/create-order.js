
var currentTab;   // The currently selected tab
var loadedTables; // Hash map of vendors that have been loaded.
                  // Prevents reloading of already loaded information on tab swap
var rowDragging;  // Contains the row currently being dragged

// Hide the components during load
$('#pnlFunctions').hide();
$('#pnlDataTable').hide();

// Initialize the components on the page (on reload or store swap)
function initializeComponents() {
    // Show the progress bar
    var progress_html = $("#hiddenProgress").html();
    /*PROGRESS BOX
    bootbox.dialog({
        title: "Generating Order Form",
        message: progress_html,
        closeButton: false,
    });*/

    // Set initial navigation
    initializeTabHandlers();
    currentTab = 'best';
    loadedTables = new Array(); // hashmap to check which tables have been loaded. Mapping between tab name and
    // table id

    // Set initial products
    displayBest();
}

// We hide some components until the table is ready to show.
function showHidden() {
    $('#pnlFunctions').show();
    $('#pnlDataTable').show();
}

// Variables for storing page data
var count = 0;
var total = 0;
var potentialSavings = 0;

var FAVORITES = [];
var VENDOR = [
                  ['f44ab1785505','Maplevale Farms'],
                  ['52efo85190e0','Rochester Meats'],
                  ['9fdf80e721a6','Sysco'],
                  ['be233733f9ca','US. Foods']
                  ];
var DD = [
            ['fefdd07f8445','APPLESAUCE SWEETENED CAN STY ($28.95)','Sysco','ALPN OR','7413180','6','102 oz.','$28.95','$0.05 per oz.'],
            ['e72f3d3a45a7','APPLESAUCE FCY ($33.41)','Sysco','SYS CLS','1502699','6','102 oz.','$33.41','$0.05 per oz.'],
            ['4f4297a2ecbd','Applesauce, Sweetened Choice Canned ($37.70)','US. Foods','Harvest Value','8328510','6','103 oz','$37.70','$0.06 per oz.'],
            ['8262e734305f','BACON BIT REAL CKD 3/8" GF   ^ ($56.57)','Sysco','SYS CLS','5757051','2','5 lb.','$56.57','$5.66 per lb.'],
            ['2007e6c2d219','BACON BIT REAL CKD FINE GF   ^ ($96.24)','Sysco','SYS CLS','5756931','6','2 lb.','$96.24','$8.02 per lb.'],
            ['d17e569f68de','ARTICHOKE HEART QUARTER IMP ($64.14)','Sysco','PACKER','4685285','6','3 kg.','$64.14','$3.56 per kg.'],
            ['1c9b0d07a5bb','ARTICHOKE HEART 30/40CT IMP ($67.80)','Sysco','PACKER','4384772','6','3 kg.','$67.80','$3.77 per kg.'],
            ['ef0dadc79e77','ARTICHOKE HEART QUARTER ($69.01)','Sysco','ROLAND','5471511','6','88 oz.','$69.01','$0.13 per oz.'],
            ['46ad66f36a45','BACON LAYFLAT C/C 14/18 APL G^ ($70.00)','Sysco','SYS CLS','5886381','2','10 lb.','$70.00','$3.50 per lb'],
            ['e672d8a94548','BACON LAYFLAT 14/18 SMOKED GF ($54.89)','Sysco','HATFLD','1894831','1','15 lb.','$54.89','$3.66 per lb.'],
            ['2cb0257db8e1','BACON PRECOOKED SLI  SANDWICH^ ($37.88)','Sysco','Hormel','2426070','3','100 ea.','$37.88','$0.13 ea.'],
            ['85b71751ac40','BACON PRECOOKED THICK SLICE  ^ ($45.70)','Sysco','SYS CLS','5857679','2','150 ea.','$45.70','$0.15 ea.'],
            ['02d514c9e932','BACON PRECOOKED XTRA THICK CHF ($197.68)','Sysco','SUGARDL','617735','8','150 ea.','$197.68','$0.16 ea.'],
            ['e58aea0191c8','BANANA CHIP DRIED ($17.75)','Sysco','TRANIA','3927704','1','5 lb.','$17.75','$3.55 per lb.'],
            ['60b815c429cf','BANANA CHIP DRIED ($27.00)','Sysco','INTLIMP','3637394','1','5 lb.','$27.00','$5.40 per lb.'],
            ['68c76c41bf3f','Base, Beef Paste Shelf Stable Soup ($76.51)','US. Foods','Masters Touch','107152','1','20 lb.','$76.51','$3.83 per lb.'],
            ['2e062f2385f5','SOUP BASE BEEF CF ($99.98)','Sysco','SYS CLS','7339641','1','25 lb.','$99.98','$4.00 per lb'],
            ['5c9b1f255951','Base, Chicken Flavor Paste Select Shelf Stable Plastic Soup ($73.46)','US. Foods','Masters Touch','9071747','1','20 lb.','$73.46','$3.67 per lb.'],
            ['b82c0d842bcf','SOUP BASE CHICKEN REAL ($99.10)','Sysco','SYS IMP','4944492','1','25 lb.','$99.10','$3.96 per lb.'],
            ['4cae784305f3','SOUP BASE CHICKEN REAL ($29.25)','Sysco','SYS IMP','4944450','6','1 lb.','$29.25','$4.88 per lb.'],
            ['9a6ea4f77be3','BEEF CORNED BTM RND FLAT CKD ^ ($96.41)','Sysco','BBRL','7136757','3','6.5 lb.','$96.41','$4.94 per lb.'],
            ['1cb279ff0870','BEEF PASTRAMI BTM RND PRCK   ^ ($100.19)','Sysco','BBRLIMP','2449205','3','6.5 lb.','$100.19','$5.14 per lb.'],
            ['228f63543b22','BEEF RIBEYE LIPON N/R ENHNCD ($250.73)','Sysco','TWORVRS','7141775','3','13 lb.','$250.73','$6.43 per lb.'],
            ['4bb846272a55','BEEF TENDERLOIN N\R MRB ENHNCD ($260.22)','Sysco','TWORVRS','1608530','6','5 lb.','$260.22','$6.67 per lb.'],
            ['e2895f43c3f5','Bean, Kidney Dark Red Brine Canned ($25.74)','US. Foods','Monarch-d','2329183','6','102 oz.','$25.74','$0.04 per oz.'],
            ['61b9499a5d1f','BEAN KIDNEY DK RED ($26.00)','Sysco','SYS REL','0149054','6','102 oz.','$26.00','$0.04 per oz.'],
            ['f60fc71aaf7e','BEAN KIDNEY DARK RED         ^ ($27.10)','Sysco','SYS CLS','4014973','6','102 oz.','$27.10','$0.04 per oz.'],
            ['6f1e641546db','BEEF STRIP BNLS 0X1 1/4" CH  ^ ($7.13)','Sysco','BCH BLK','4226809','3','11.5 lb.','$7.13','$0.21 per lb.'],
            ['91b710d5e694','Beef, Strip Loin Choice 180 0x1 Boneless Raw Ref ($425.88)','US. Foods','lpb-Iowa Beef Processors','2393734','6','13 lb.','$425.88','$5.46 per lb.'],
            ['3f18bf4ebb23','Beef, Steak Battered Breaded Fritter Chopped Western Style W/ Black Pepper ($28.04)','US. Foods','Cattlemans Selection','4559449','30','5.33 oz.','$28.04','$0.18 per oz'],
            ['ad3d924872d5','BEEF FRITTER CNTRY TX STYLE ($48.88)','Sysco','SYS IMP','6737191','30','5.33 oz.','$48.88','$0.31 per oz.'],
            ['fdda67dfb863','BREAD CRUMB JAP PANKO TOASTED ($23.46)','Sysco','KIKOMAN','4943296','1','25 lb.','$23.46','$0.94 per lb.'],
            ['574ed8cff5ce','Crumb, Bread Panko Japanese ($29.57)','US. Foods','Golden Dlpt','8068637','1','25 lb.','$29.57','$1.16 per lb.'],
            ['3899354e40b8','BEANS GARBANZO-CHICK PEAS ($17.77)','Maplevale Farms','KINGCL','25600','24','303 oz.','$17.77','$0.01 per oz.'],
            ['f109469f4528','BEANS GARBANZO-CHICK PEAS ($23.54)','Maplevale Farms','BUGBLK','25000','6','102 oz.','$23.54','$0.04 per oz.'],
            ['fd52956cbc8f','BREAD CINNAMON W/O SAUCE ($21.72)','Maplevale Farms','LaClnn','39376','4','13 ea.','$21.72','$0.42 ea.'],
            ['508d3eac5b89','BREAD CINNAMON W/SAUCE ($21.72)','Maplevale Farms','LaClnn','39378','3','13 ea.','$21.72','$0.55 ea.'],
            ['56ee2e9c3270','CHEESE CHED SHRD YEL FTHR ($54.68)','Maplevale Farms','MAPLEV','12770','6','4 lb.','$54.68','$2.28 per lb.'],
            ['9dcc3e052bf1','CHEESE CHED SHRD MLD YEL ($69.86)','Maplevale Farms','MAPLEV','12780','6','5 lb.','$69.86','$2.33 per lb.'],
            ['68974e2dc94c','CHIC BRST ITAL BRD CK SEL ($34.93)','Maplevale Farms','TYSON','7296','35','4.5 oz.','$35.93','$0.22 per oz.'],
            ['2cf4eede00b0','CHIC BRST FIL SKL/BNL IF ($43.82)','Maplevale Farms','KOCH','6654','48','4 oz.','$43.82','$0.23 per oz.'],
            ['2318628f82b1','CHIC WING-DING BNLS CKD B ($33.42)','Maplevale Farms','PIERCE','7068','2','5 lb.','$33.42','$3.34 per lb.'],
            ['1f4bcaba278b','CHIC BRST CHUNK BRD FC ($35.83)','Maplevale Farms','PERDUE','7066','2','5 lb.','$35.83','$3.58 per lb.'],
            ['65dde388fd4a','BACON LAYFLAT E/E 18/22 SMOKE^ ($50.58)','Sysco','SYS REL','1073402','1','15 lb.','$50.58','$3.37 per lb.'],
            ['0b83ea0f493f','BACON LAYFLAT E/E 18/22 SMK G^ ($51.85)','Sysco','Hormel','1894245','1','15 lb.','$51.85','$3.46 per lb.'],
            ['070f44da12a1','BACON LAYFLAT E/E 18/22 SMK G^ ($55.16)','Sysco','SYS REL','2400778','1','15 lb.','$55.16','$3.68 per lb.'],
];

// Return true if this list item contains the filter
function containsFilter(filter, li) {
    return $('span[id=VendorDisplay]', li).text().toLowerCase().indexOf(filter) > -1 ||
           $('span[id=DescriptionDisplay]', li).text().toLowerCase().indexOf(filter) > -1 ||
           $('select[name=ProductSelect] option:selected', li).text().toLowerCase().indexOf(filter) > -1 ||
           $('span[id=BrandDisplay]', li).text().toLowerCase().indexOf(filter) > -1 ||
           $('span[id=SKUDisplay]', li).text().toLowerCase().indexOf(filter) > -1;
}

// Filters the list by removing products that don't match the filter
function filterList(filter, list) {

    var unmatched = $("li", list).filter(function () {
        var li = $(this);
        return !containsFilter(filter, li);
    });

    var matched = $("li", list).filter(function () {
        var li = $(this);
        return containsFilter(filter, li);
    });

    unmatched.hide();
    matched.show();
}


// When a checkbox is selected, or quantity changed, we need to update the data on the bottom of the page.
function updateSelectedData() {
    count = 0;
    total = 0;
    potentialSavings = 0;

    // Get all the list items with  a checked box
    $("#BestProductsList li").filter(':has(:checkbox:checked)').each(function () {
        count++;
        var li = $(this);

        var price = $('span[id=PriceDisplay]', li).text().replace('$', '').replace(',', '').trim();
        var quantity = $('span > input[name=item\\.Quantity][type=number]', li).val();

        if (quantity > 0) {
            var worstPricePerBaseUnit = $('input[name=item\\.WorstPricePerBaseUnit]', li).val();
            var bestCountAndSizeBaseUnits = $('input[name=item\\.BestSizeAndCountBaseUnits]', li).val();

            var bestTotal = price * quantity;
            var worstTotal = (worstPricePerBaseUnit * bestCountAndSizeBaseUnits * quantity);

            total += bestTotal;
            potentialSavings += worstTotal.toFixed(2) - bestTotal.toFixed(2);
        }
    });
    $('#SelectedData').fadeOut(function () {
        $('#pnlItemsSelected').text(count);
        $('#pnlTotal').text(total.toFixed(2));
        $('#pnlSavings').text(potentialSavings.toFixed(2));
    }).fadeIn();
}

function updateFavoriteSpan(favoriteSpan, value) {

    if(favoriteSpan.hasClass("favorite-empty")){
      favoriteSpan.removeClass("glyphicon-star-empty");
      favoriteSpan.removeClass("favorite-empty");
      favoriteSpan.addClass("glyphicon-star");
      favoriteSpan.addClass("favorite-starred");
    }else{
      favoriteSpan.removeClass("glyphicon-star");
      favoriteSpan.removeClass("favorite-starred");
      favoriteSpan.addClass("glyphicon-star-empty");
      favoriteSpan.addClass("favorite-empty");
    }
    
    if (value) {
    }else {
    }
}

// Refactor: If moving to lists for all tables this needs to remove the "tr" update
function updateLoadedTabFavorites(productKey, favorite) {
    // get all the li rows with this product id
    
    var rows = $("li").has("input[type=hidden][name=item\\.ProductKey][value=" + productKey + "]");

    // Update all the icons loaded
    $("span.favorite", rows).each(function () {
        updateFavoriteSpan($(this), favorite);
    });

    // get all the tr  with this product id
    rows = $("tr").has("input[type=hidden][name=item\\.ProductKey][value=" + productKey + "]");

    // Update all the icons loaded
    $("span.favorite", rows).each(function () {
        updateFavoriteSpan($(this), favorite);
    });
}

// Refactor: If we move to lists for all the tabular data, this needs to change.
// Right now it needs to check if this span has a parent tr or li
function favoriteProduct(favoriteSpan){
    // Get the product for this span
    var li = $(favoriteSpan).closest('li');
    var productKey;
    
    // Span was in a tr if this is true
    if (li.length <= 0) {
        var tr = $(favoriteSpan).closest('tr');
        productKey = $('input[type=hidden][name=item\\.ProductKey]', tr).val();
    }
    else {
        productKey = $('input[type=hidden][name=item\\.ProductKey]', li).val();
    }

    var params = {
        "storeKey": storeId,
        "productKey": productKey
    };
    updateLoadedTabFavorites(productKey,storeId);
    // Get the data and update the table row
    //ONLINE
    /*$.getJSON(favoriteAction, params)
        .success(function (data) {
          console.log(data.favorite);
          
                updateLoadedTabFavorites(productKey, data.favorite);
        });*/
}

function updateSelectedProduct(productSelect) {
    var productId = productSelect.val();
    var li = $(productSelect).closest('li');
    var uploadKey = $('input[type=hidden][name=item\\.UploadKey]', li).val();
    var vendorId,ven,brand,sku,count,size,price,uprice;
    
    var params = {
        "storeKey": storeId,
        "productKey": productId,
        "uploadKey": uploadKey,
    };
    // Get the data and update the table row
    for(var i=0;i<DD.length;i++){
      ven = DD[i][2];
      
      switch(ven){
        case'Sysco':
          vendorId = VENDOR[2][0];
          break;
        case'US. Foods':
          vendorId = VENDOR[3][0];
          break;
      }
      console.log(vendorId);
      
      if(DD[i][0] == productId){
        brand = DD[i][3];
        sku = DD[i][4];
        count = DD[i][5];
        size = DD[i][6];
        price = DD[i][7];
        uprice = DD[i][8];
        
        $('input[name=item\\.ProductKey][type=hidden]', li).val(productId);
        $('input[name=item\\.VendorKey][type=hidden]', li).val(vendorId);
        $('input[name=item\\.BestSizeAndCountBaseUnits]', li).val(count);
        $('input[name=item\\.Description][type=hidden]', li).val($("option:selected", productSelect).text());
        
        li.fadeOut(function () {
                $('span[id=VendorDisplay]', li).text(ven);
                $('span[id=BrandDisplay]', li).text(brand);
                $('span[id=SKUDisplay]', li).text(sku);
                $('span[id=CountDisplay]', li).text(count);
                $('span[id=SizeDisplay]', li).text(size);
                $('span[id=PriceDisplay]', li).text(price);
                $('span[id=UnitPriceDisplay]', li).text(uprice);
                //updateFavoriteSpan($('span.favorite', li), data.favorite);
            }).fadeIn(function () {
                updateSelectedData();
            });
        break;
      }
    }
   
    /*
    $.getJSON(updateSelectedAction, params)
        .success(function (data) {
            $('input[name=item\\.ProductKey][type=hidden]', li).val(data.id);
            $('input[name=item\\.VendorKey][type=hidden]', li).val(data.vendorId);
            $('input[name=item\\.BestSizeAndCountBaseUnits]', li).val(data.bestCoefficient);
            $('input[name=item\\.Description][type=hidden]', li).val($("option:selected", productSelect).text());

            li.fadeOut(function () {
                $('span[id=VendorDisplay]', li).text(data.vendor);
                $('span[id=BrandDisplay]', li).text(data.brand);
                $('span[id=SKUDisplay]', li).text(data.sku);
                $('span[id=CountDisplay]', li).text(data.count);
                $('span[id=SizeDisplay]', li).text(data.size);
                $('span[id=PriceDisplay]', li).text(data.price);
                $('span[id=UnitPriceDisplay]', li).text(data.unitPrice);
                updateFavoriteSpan($('span.favorite', li), data.favorite);
            }).fadeIn(function () {
                updateSelectedData();
            });
        });*/
}

function buildSelectedProductData(pdfChecked, csvChecked, email) {
    var selectedProductQuantities = [];

    // Build the selected products JSON string
    $('#BestProductsList li').filter(':has(:checkbox:checked)').each(function () {
        var li = $(this);
        var key = $('input[name=item\\.ProductKey][type=hidden]', li).val();
        var quantity = $('span > input[name=item\\.Quantity][type=number]', li).val();
        selectedProductQuantities.push({
            ProductKey: key,
            ProductQuantity: quantity
        });
    });

    var data = {
        storeKey: storeId,
        products: selectedProductQuantities
    };

    data['formatPDF'] = pdfChecked;
    data['formatCSV'] = csvChecked;
    data['emailAddress'] = email;
    return data;
}

var processingPrint = false;
var processingExport = false;

// Posts the selected best products for printing
function printSelected() {
    if (count != 0) {
        if (!processingPrint) {
            processingPrint = true;
            $("#btnPrint").attr('disabled', 'disabled');
            $("#btnPrint").val('Printing Order...');
            $('#PrintAll').css({ 'cursor': 'wait' });

            // Update the database in the background
            setTimeout(function () {
                var data = buildSelectedProductData('print');
      /*//ONLINE
                $.ajax({
                    url: printAction,
                    type: 'POST',
                    cache: false,
                    data: JSON.stringify(data),
                    dataType: 'text',
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {
                        console.log('Updated database successfully.');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log('Status: ', textStatus);
                        console.log('Error: ', errorThrown);
                    }
                });
            }, 1000);*/

            generatePrintResults();
            window.print();
            processingPrint = false;

            $("#btnPrint").removeAttr('disabled');
            $("#btnPrint").val('Print Selected');
        })
    }
    else {
        bootbox.alert('You must select products to print.');
    }}
}

// We will attempt to generate the printable form in javascript to improve speed (in progress)
function generatePrintResults() {
    // Clear the hidden print
    $("#hiddenPrint").empty();

    var checkedRows = $('#BestProductsList li').filter(':has(:checkbox:checked)');
    var vendors = $("input[type=hidden][name=vendorUpload\\.VendorKey]");
    var vendorAdded = false;

    // For each vendor...
    vendors.each(function () {
        var vendorKey = $(this).val();
        // Retrieve this vendor's data rows
        var data = checkedRows.filter(":has(input[type=hidden][name=item\\.VendorKey][value=" + vendorKey + "])");
        console.log("Data size: " + data.length);
        if (data.length > 0) {
            // If a vendor's data has been added already, we need to put a new page before adding this
            // vendor's data
            if (vendorAdded) {
                $("#hiddenPrint").append('<div class="break"></div>');
            }
            else {
                vendorAdded = true;
            }


            // Create the table from template
            var table = $('#printTableTemplate').clone().removeAttr('style').removeAttr('id');


            var tbody = $('tbody', table);

            // Process data retrieved and populate table
            var totalPrice = 0;
            var vendorName = "";
            data.each(function () {
                if (vendorName == "") {
                    vendorName = $('#VendorDisplay', $(this)).text().trim();
                }

                var sku = $('#SKUDisplay', $(this)).text().trim();
                var description = $('input[name=item\\.Description][type=hidden]', $(this)).val().trim();
                var brand = $('#BrandDisplay', $(this)).text().trim();
                var count = $('#CountDisplay', $(this)).text().trim();
                var size = $('#SizeDisplay', $(this)).text().trim();
                var price = $('#PriceDisplay', $(this)).text().trim();
                var quantity = $('input[name=item\\.Quantity][type=number]', $(this)).val();

                // Create row
                var tr = $('<tr>');
                tr.append('<td>' + sku + '</td>');
                tr.append('<td>' + description + '</td>');
                tr.append('<td>' + brand + '</td>');
                tr.append('<td>' + count + '</td>');
                tr.append('<td>' + size + '</td>');
                tr.append('<td>' + price + '</td>');
                if (quantity > 0) {
                    tr.append('<td>' + quantity + '</td>');
                }
                else {
                    tr.append('<td></td>');
                }

                // Insert row
                tbody.append(tr);

                // Update shopping list total
                if (quantity > 0) {
                    var rPrice = parseFloat(price.replace('$', '').replace(',', '').trim());
                    totalPrice += rPrice * quantity;
                }
            });

            // Add vendor name
            $('#lblVendorName', table).text(vendorName);

            // Insert the total price
            if (!isNaN(totalPrice)) {
                $("#lblTotal", table).text(totalPrice.toFixed(2));
            }
            else {
                $("#lblTotal", table).text('0.0');
            }

            // Add table to printable DOM
            $("#hiddenPrint").append(table);
        }
    });
}

// Posts the selected best products for exporting
function exportSelected() {
    if (count != 0) {
        var modal = bootbox.dialog({
            message: $(".hiddenEmail").html(),
            title: "Email Settings",
            buttons: [
              {
                  label: "Send",
                  className: "btn btn-primary pull-left",
                  callback: function () {
                      var title = $(".modal-title");
                      title.text("Generating email attachments.");

                      var form = modal.find(".form");

                      if ($('#cbCSV', form).is(":checked") ||
                          $('#cbPDF', form).is(":checked")) {

                          var data =
                              buildSelectedProductData
                                  ($('#cbPDF', form).is(":checked"),
                                      $('#cbCSV', form).is(":checked"),
                                      $('#lblEmails', form).val());

                          title.text("Sending email.");
                  /*ONLINE
                          $.ajax({
                              url: exportAction,
                              type: 'POST',
                              cache: false,
                              data: JSON.stringify(data),
                              dataType: 'json',
                              contentType: 'application/json; charset=utf-8',
                              error: function (jqXHR, textStatus, errorThrown) {
                                  alert('Status: ', textStatus);
                                  alert('Error: ', errorThrown);

                              }
                          });*/
                          modal.modal("hide");
                          bootbox.alert("Email sent.");
                      }
                      else {
                          bootbox.alert('You must select an export format');
                      }

                      return false;
                  }
              },
              {
                  label: "Close",
                  className: "btn btn-default pull-left",
                  callback: function () {
                  }
              }
            ],
            show: false,
            onEscape: function () {
                modal.modal("hide");
            }
        });

        modal.modal("show");

    }
    else {
        bootbox.alert('You must select products to export.');
    }

}

// Updates product ranks when reordered
function updateProductRanks() {
    var productRanks = [];
    $("#BestProductsList li").each(function () {
        var li = $(this);
        var productKey = $("input[name=item\\.ProductKey]", li).val();
        var rank = li.index();

        // Check if this row contains a select
        var select = $("select[name=ProductSelect]", li);
        if (select.length > 0) {
            // If so, every product in it needs the same rank
            $("option", select).each(function () {
                var option = $(this);
                productRanks.push({
                    ProductKey: option.val(),
                    ProductRank: rank
                });
            });
        }
        else {
            // just add this product to the rank list
            productRanks.push({
                ProductKey: productKey,
                ProductRank: rank
            });
        }
    });

    var data = {
        storeKey: storeId,
        products: productRanks
    };
/*ONLINE
    $.ajax({
        url: updateRanksAction,
        type: 'POST',
        cache: false,
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Status: ', textStatus);
            alert('Error: ', errorThrown);
        }
    });*/
}

function setDragging(li, drag) {
    if (drag) {
        li.addClass("row-dragging");
        li.append('<span class="glyphicon glyphicon-triangle-left row-dragging-icon" />');
    }
    else {
        li.removeClass("row-dragging");
        $(".row-dragging-icon", li).remove();
    }
}

// Handlers for select box choices, quantity changes, and export button press
function initializeTableHandlers() {
    // Enable sortable
    var bestList = document.getElementById("BestProductsList");
    
    Sortable.create(bestList, {
        handle: '.drag-icon',
        animation: 0,
        scroll: true, // or HTMLElement
        scrollSensitivity: 300, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 10, // px
        onStart: function (evt) {
            // On start add selected style
            rowDragging = $("#BestProductsList li").eq(evt.oldIndex);
        },
        onEnd: function (evt) {
            $("li.row-dragging").each(function () {
                var li = $(this);
                setDragging(li, false);
                
            });
            updateProductRanks();
        }
    });

    // Handle styling on mouse down for sortable
    $(".drag-icon").on('mousedown touchstart', function () {
        var li = $(this).closest("li");
        setDragging(li, true);
    });

    $(".drag-icon").on('mouseup touchend', function () {
        $("li.row-dragging").each(function () {
            var li = $(this);
            setDragging(li, false);
        });
    });

    $('#cbBestSelectAll').change(function () {
        $("input[name=cbProduct][type=checkbox]").prop('checked', $(this).is(":checked"));
        updateSelectedData();
    });

    $('input[name=cbProduct][type=checkbox]').change(function () {
        updateSelectedData();
    });

    $('input[name=item\\.Quantity]').change(function () {
        var quantity = $(this);

        if (quantity.val() < 0) {
            quantity.val(0);
            bootbox.alert('Quantities cannot be negative values.');
        }
        else if (quantity.val() > 5000) {
            quantity.val(5000);
            bootbox.alert('Quantities cannot exceed 5000 units.');
        }

        var cb = $('#cbProduct', quantity.parents('tr'));
        // Set its row to checked if the quantity is greater than 0.
        if (quantity.val() > 0) {
            cb.attr('checked', 'checked');
        }
        else {
            cb.removeAttr('checked');
        }
        updateSelectedData();
    });

    $('select[name=ProductSelect]').change(function () {
        updateSelectedProduct($(this));
    });

    // Export handler
    $("#btnExport").click(function () { exportSelected(); });

    // Print handler
    $("#btnPrint").click(function () { printSelected(); });

    // Search handler
    $('input.searchInput').on('input', function () {
        var search = $(this);
        filterList(search.val().toLowerCase(), $("#BestProductsList"));
    });

    setFavoriteClickHandlers();
}

function setFavoriteClickHandlers() {
    // Favorite click handler
    $("span.favorite").off("click").click(function () {
        favoriteProduct($(this));
    });
}

//Depicts which tables exists and hides them
function styleDisplay(){
  
  if(document.getElementById('f7ecd152beaa_wrapper') !== null){
    document.getElementById('f7ecd152beaa_wrapper').style.display = 'none';
    $('f7ecd152beaa_wrapper').hide();
    $('f7ecd152beaa_wrapper').hide();
  }else if(document.getElementById('7b9673224cdd_wrapper') !== null){
    document.getElementById('7b9673224cdd_wrapper').style.display = 'none';
    $('7b9673224cdd_wrapper').hide();
    $('7b9673224cdd_wrapper').hide();
  }else if(document.getElementById('b47c786566cd_wrapper') !== null){
    document.getElementById('b47c786566cd_wrapper').style.display = 'none';
    $('b47c786566cd_wrapper').hide();
    $('b47c786566cd_wrapper').hide();
  }else if(document.getElementById('favorites_wrapper') !== null){
    document.getElementById('favorites_wrapper').style.display = 'none';
    $('favorites_wrapper').hide();
    $('favorites_wrapper').hide();
    
  }
  
}

// Switches the displayed data table based on selected tab
// Refactor: If we move the other tabs to lists, we will need to refactor this
function displayProductList(tabName) {
    
    // Show the selected table
    styleDisplay();
    
    if (tabName == 'best') {
        $('#BestProductsPanel').show();
        document.getElementById('BestProductsPanel').style.display = 'block';
    }
    else {
        $('#' + loadedTables[tabName] + '_wrapper').show()
        //var tab = loadedTables[tabName]+'_wrapper';
        //document.getElementById(tab).style.display = 'block';
    }

    // Hide the current table
    if (currentTab == 'best') {
        $('#BestProductsPanel').hide();
        //document.getElementById('BestProductsPanel').style.display = 'block';
    }
    else {
      $('#' + loadedTables[currentTab] + '_wrapper').hide();
      //var ctab = loadedTables[currentTab]+'_wrapper';
      //document.getElementById(ctab).style.display = 'block';
      //document.getElementById('favorites_wrapper').style.display = 'none';
      
    }
    // set the current tab
    console.log(tabName);
    currentTab = tabName;
}

// initializeTabHandlers: Initialize the handlers for tab switching
function initializeTabHandlers() {
    // Links that start with a # are our tabs
    $('#vendorMenu > li > a[href^=#]').click(function () {
        // Update active tab

        // Remove the # to get the tab name
        var tabName = $(this).attr('href').replace('#', '');
        // if this isn't the current tab we need to display the new tab
        if (tabName != currentTab) {
            // If we haven't loaded this tab's data,  it is a vendor to create and show the tab
            if (tabName != "favorites" && !loadedTables[tabName]) {
                // The vendor key is stored in the data-name attribute
                var vendorKey = $(this).attr('data-name');
                loadVendorList(vendorKey, tabName);
            }
            // We always refresh the favorites list
            else if (tabName == "favorites") {
                loadFavoritesList();
            }
            // We only need to display the data otherwise
            else {
                displayProductList(tabName);
            }
        }
    });
}


// displayBest: Populates and displays the best products data table for the selected store
function displayBest() {
    var progressBar = $(".bootbox-body .progress .progress-bar");
    var title = $(".modal-title");

    progressBar.attr("style", "width: 20%");
    title.text("Retrieving Uploaded Products");
    
    displayProductList('best');
    
    document.getElementById('BestProductsPanel').style.display = 'block';
    document.getElementById('favorites_wrapper').style.display = 'none';
/*ONLINE
    $.ajax({
        url: getBestProductsAction,
        type: 'POST',
        cache: false,
        dataType: 'text',
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            progressBar.attr("style", "width: 40%");
            title.text("Building Products Table");
            
            // Insert the table
            $('#pnlDataTable').html(result);
            showHidden();

            progressBar.attr("style", "width: 80%");
            title.text("Initializing Table Interface");
            initializeTableHandlers();

            // The best table is now created and is the current tab with its data loaded in the table with
            // id = BestProductsTable
            currentTab = 'best';
            loadedTables['best'] = 'BestProductsList';

            updateSelectedData(); // If the best changes we need to update the data
            progressBar.attr("style", "width: 100%");
            title.text("Complete");
            bootbox.hideAll();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Status: ', textStatus);
            console.log('Error: ', errorThrown);
        }
    });*/
}


// Loads the vendor product list into a data table for the specified vendor
function loadVendorList(vendorKey, vendorName) {
    /*var progress_html = $("#hiddenProgress").html();
    /*PROGRESS BAR
    bootbox.dialog({
        title: "Generating Vendor List",
        message: progress_html,
        closeButton: false,
    });
    var progressBar = $(".bootbox-body .progress .progress-bar");
    var title = $(".modal-title");


    var params = {
        "vendorUploadID": vendorKey
    };
    progressBar.attr("style", "width: 33%");
    title.text("Retrieving Vendor products");
    console.log(vendorName);*/
    styleDisplay();
    
    loadedTables[vendorName] = vendorKey;
    displayProductList(vendorName);
    
    switch(vendorKey){
      case'US Foods':         //USF  ::be233733f9ca
        //$('#BestProductsPanel').hide();
        //$('#favorites_wrapper').hide();
        //$('b47c786566cd_wrapper').show();
        
        document.getElementById('BestProductsPanel').style.display = 'none';
        document.getElementById('favorites_wrapper').style.display = 'none';
        document.getElementById('b47c786566cd_wrapper').style.display = 'block';
        break;
      case'Sysco':            //Sysco X9fdf80e721a6 ::24858fc04e77
        //$('#BestProductsPanel').hide();
        //$('#favorites_wrapper').hide();
        //$('f7ecd152beaa_wrapper').show();
        
        document.getElementById('BestProductsPanel').style.display = 'none';
        document.getElementById('favorites_wrapper').style.display = 'none';
        document.getElementById('f7ecd152beaa_wrapper').style.display = 'block';
        break;
      case'Maplevale Farms': //Maplevale Farms: Xf44ab1785505 ::7b9673224cdd
        //$('#BestProductsPanel').hide();
        //$('#favorites_wrapper').hide();
        //$('7b9673224cdd_wrapper').show();
        
        document.getElementById('BestProductsPanel').style.display = 'none';
        document.getElementById('favorites_wrapper').style.display = 'none';
        document.getElementById('7b9673224cdd_wrapper').style.display = 'block';
        break;
      default:
        document.getElementById('favorites_wrapper').style.display = 'none';
        break;
    }
    
    
    
    
    /*
    // Get the data and create the table
    $.get(getVendorProductsAction, params, function (data) {

        // append the current table, update the currentTab and loadedTables
        $('#pnlDataTable').append(data);

        progressBar.attr("style", "width: 66%");
        title.text("Formatting Table");

        // Stylize the table
        $('#' + vendorKey).dataTable({
            "sScrollY": "100%",
            "bPaginate": false,
            "bScrollCollapse": true,
            "bInfo": false,
            "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [1, 2, 3, 4] },
                    { "sWidth": "8%", "aTargets": [-1] },
                    { "sType": "currency", "aTargets": [5, 6] }
            ]

        });
        $('.dataTables_filter input').attr("placeholder", " Search...");

        loadedTables[vendorName] = vendorKey;
        displayProductList(vendorName);

        progressBar.attr("style", "width: 100%");
        title.text("Complete");
        setFavoriteClickHandlers();
        bootbox.hideAll();
    });*/
}



// Loads the favorite list for each vendor
function loadFavoritesList() {
    // Remove the previous favorite, if any
    //$("#favorites_wrapper").remove();

    //var progress_html = $("#hiddenProgress").html();
    /*PROGRESS BAR
    bootbox.dialog({
        title: "Retrieving Favorites",
        message: progress_html,
        closeButton: false,
    });*/
    //var progressBar = $(".bootbox-body .progress .progress-bar");
    //var title = $(".modal-title");

    //progressBar.attr("style", "width: 33%");
    //title.text("Retrieving Favorite products");
        
    styleDisplay();
    displayProductList('fav');
    //$('BestProductsPanel').hide();
    //$('favorites_wrapper').show();
    document.getElementById('BestProductsPanel').style.display = 'none';
    document.getElementById('favorites_wrapper').style.display = 'block';
    
    
    /*
    // Get the data and create the table
    $.get(getFavorites, function (data) {

        // append the current table, update the currentTab and loadedTables
        $('#pnlDataTable').append(data);

        progressBar.attr("style", "width: 66%");
        title.text("Formatting Table");

        // Stylize the table
        $('#' + "favorites").dataTable({
            "sScrollY": "100%",
            "bPaginate": false,
            "bScrollCollapse": true,
            "bInfo": false,
            "aoColumnDefs": [
                    { "bSortable": false, "aTargets": [1, 2, 3, 4] },
                    { "sWidth": "8%", "aTargets": [-1] },
                    { "sType": "currency", "aTargets": [5, 6] }
            ]

        });
        $('.dataTables_filter input').attr("placeholder", " Search...");

        loadedTables['favorites'] = 'favorites';
        displayProductList('favorites');

        progressBar.attr("style", "width: 100%");
        title.text("Complete");
        setFavoriteClickHandlers();

        bootbox.hideAll();
    });*/
}

$(document).ready(function () {
    // Initialize the page components
    initializeComponents();
    showHidden();
    initializeTableHandlers();
    initializeTabHandlers();
    
});

// Apply bootstrap styles to all datatables
/* ONLINE
$.extend(true, $.fn.dataTable.defaults, {
    "sDom": "<'row'<'col-lg-6'f><'col-lg-6'l>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>",
    "oLanguage": {
        "sSearch": ""
    }
});*/
/*
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "currency-pre": function (a) {
        a = (a === "-") ? 0 : a.replace(/[^\d\-\.]/g, "");
        return parseFloat(a);
    },

    "currency-asc": function (a, b) {
        return a - b;
    },

    "currency-desc": function (a, b) {
        return b - a;
    }
});*/
