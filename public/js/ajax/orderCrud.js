function updateStatus(orderId, status) {
    const statusHash = {
        orderDeleted : '<span class="badge badge-danger">Đã hủy</span>',
        orderDeliver : '<span class="badge badge-warning">Đang giao</span>',
        orderComplete : '<span class="badge badge-success">Đã giao</span>',
    }
    $(`#${orderId}`).html(statusHash[status]);
}

function ajaxChange(orderId, thisA) {
    $.ajax({
        url: `/order/${orderId}`,
        type: 'POST',
        data: {status : thisA.className},
        dataType : 'text',
    })
    .done(result => {
        updateStatus(orderId, thisA.className);
    })
}