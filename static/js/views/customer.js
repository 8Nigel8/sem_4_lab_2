'use strict'

const customerModel = new Customer() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#customer-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    
    const formData = new FormData(e.target)
    const customerData = {}
    formData.forEach((value, key) => {
      customerData[key] = value
    })

    customerModel.Create(customerData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#customer-list').DataTable({
    data: customerModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Budget', data: 'budget' },
      {data: null, render: function(data, type, row) {
        return '<button class="btn btn-danger btn-sm delete-btn">Delete</button>';
      }}
    ]
  })
}
$('#customer-list').on('click', '.delete-btn', function() {
  console.log("hello kitty")
  var row = $(this).closest('tr');
  var data = $('#customer-list').DataTable().row(row).data();
  customerModel.Delete(data['id']);
});
function initListEvents () {
  document.addEventListener('customerListDataChanged', function (e) {
    const dataTable = window.jQuery('#customer-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
  }, false)
}

function initAddForm () {
  const form = window.document.querySelector('#customer-list')
  form.addEventListener('delete', function (e) {
    e.preventDefault()
    e.target.reset()
  })
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})