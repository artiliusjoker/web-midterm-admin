function updateStatus(adminId) {
    $(`#${adminId}`).find(".status-display").text('Đã xoá');
    $(`#${adminId}`).find(".status-display").addClass('badge-dark');
}

function deleteAdmin(adminId) {
    var confirmation = confirm('Bạn có muốn xoá người dùng không ?');
    if (confirmation === true) {
        $.ajax({
            url: `/admin/delete/${adminId}`,
            type: 'DELETE',
        })
        .done(result => {
            if (result.status === true) {
                updateStatus(adminId);
            }
            else {
              alert(result.message);
            }
        })
    }
}