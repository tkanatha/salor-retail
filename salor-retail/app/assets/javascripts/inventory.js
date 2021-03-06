$(function () {
  $("#inventory_sku").on('click', function() {
    $(this).select();
  });
  $("#inventory_sku").keyup(function(e) {
    if (e.which == 13) {
      inventory.fetch_json($(this).val());
    }
  });
  $("#inventory_quantity").keyup(function(e) {
    if (e.which == 13) {
      inventory.update_real_quantity($('#inventory_item_sku').html(), $(this).val());
    }
  });
});

var inventory = {
  
  fetch_json: function(sku) {
    $.ajax({
      url: "/items/inventory_json?sku=" + $("#inventory_sku").val(),
      dataType: 'json',
      success: inventory.fetch_json_success
    });
    
  },
  
  fetch_json_success: function(data, status) {
    if (data != null) {
      $('#inventory_sku').val('');
      $('#inventory_item_name').html(data.name);
      $('#inventory_item_sku').html(data.sku);
      $('#inventory_item_name').effect('highlight');
      $('#inventory_item_sku').effect('highlight');
      $('#inventory_quantity').val(data.quantity)
      $('#inventory_quantity').select();
    } else {
      $('#inventory_item_name').html("---");
      $('#inventory_sku').focus();
    }
  },
  
  update_real_quantity: function(sku, quantity) {
    $.ajax({
      url: "/items/update_real_quantity?sku=" + sku + "&real_quantity=" + quantity,
      dataType: 'json',
      success: inventory.update_real_quantity_success
    });
  },
  
  update_real_quantity_success: function(data, status) {
    if (data.status == 'success') {
      $('#inventory_quantity').val('');
      $('#inventory_sku').val('');
      $('#inventory_item_name').html('&nbsp;');
      $('#inventory_item_sku').html('&nbsp;');
      $('#inventory_sku').focus();
      $('#inventory_msg').html('✓');
      $('#inventory_msg').fadeIn(1000, function() {
        $('#inventory_msg').fadeOut(3000);
      });
    }
  },
  
  create_inventory_report_confirm_dialog: function() {
    var contents = i18n.are_you_sure;
    var dialog = shared.draw.dialog('','create_inventory_report_dialog', contents);
    var loader = shared.draw.loading(true,null,dialog);
    var okbutton = shared.create.dialog_button(i18n.menu.ok, function() {
      loader.show();
      ajax_log({
        action_taken:'confirmed_create_inventory_report_dialog'
      });
      window.location = '/items/create_inventory_report';
    });
    dialog.append(okbutton);
  }
}
  