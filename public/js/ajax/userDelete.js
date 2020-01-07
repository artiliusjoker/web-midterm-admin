function updateStatus(userId) {
    $(`#${userId}`).find("span").text('Đã xoá');
    $(`#${userId}`).find("span").addClass('badge-dark');
}

function deleteUser(userId) {
    var confirmation = confirm('Bạn có muốn xoá người dùng không ?');
    if (confirmation === true) {
        $.ajax({
            url: `/user/${userId}`,
            type: 'DELETE',
        })
        .done(result => {
            if (result.status === true) {
                updateStatus(userId);
            }
            else {
              alert(result.message);
            }
        })
    }
}