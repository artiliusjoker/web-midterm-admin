function updateList(productId) {
    $(`#${productId}`).hide();
}

function deleteProduct(productId) {
    var confirmation = confirm('Bạn có muốn xoá sản phẩm không ?');
    if (confirmation === true) {
        $.ajax({
            url: `/product/${productId}`,
            type: 'DELETE',
        })
        .done(result => {
            if (result.status === true) {
                updateList(productId);
            }
            else {
              alert(result.message);
            }
        })
    }
}