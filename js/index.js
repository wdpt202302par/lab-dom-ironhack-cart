// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');

  // search for different element INSIDE product
  const $subtot = product.querySelector('.subtotal span');
  const $pu = product.querySelector('.price span');
  const $qty = product.querySelector('.quantity input');

  // retreive values
  const pu = Number($pu.textContent);
  const qty = Number($qty.value) || 0;
  const subtot = pu*qty;
  
  // update the product's total
  $subtot.textContent = subtot;

  return subtot;
}

const $bigtotal = document.querySelector('#total-value span');

function calculateAll() {
  let sum = 0;

  // ITERATION 2

  // find all the products
  const $products = Array.from(document.querySelectorAll('.product'));
  
  $products.forEach(function ($product) {
    const tot = updateSubtotal($product);

    sum += tot; // do the sum with the total returned by updateSubtotal
  });

  // ITERATION 3
  $bigtotal.textContent = sum; // udpate the big total
}

// ITERATION 4

const $tbody = document.querySelector('#cart tbody');

const $deleteButtons = Array.from(document.querySelectorAll('.btn-remove'));

function removeProduct(event) {
  const target = event.currentTarget; // event.currentTarget is the button clicked !!
  console.log('The target in remove is:', target);

  // delete the product
  const $tr = target.parentNode.parentNode; // tr product
  $tbody.removeChild($tr);
}

function bindDeleteButton($deleteButton) {
  $deleteButton.onclick = function (event) {
    removeProduct(event)

    calculateAll(); // once deleted, recalc all
  };
}
$deleteButtons.forEach(bindDeleteButton);

// ITERATION 5

const $createButton = document.getElementById('create');
const $name = document.querySelector('.create-product input[type="text"]');
const $pu = document.querySelector('.create-product input[type="number"]');

function createProduct() {
  const $tr = document.createElement('tr');
  $tr.className = 'product';
  $tr.innerHTML = `
  <tr class="product">
    <td class="name">
      <span>${$name.value}</span>
    </td>
    <td class="price">$<span>${$pu.value}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  </tr>
  `;
  $tbody.appendChild($tr);

  // don't forget to bind the .onclick handler
  bindDeleteButton($tr.querySelector('.btn-remove'));
}

$createButton.onclick = createProduct;

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);
});
