let {app} = require('electron')
module.exports = [{
        label: '&Bài Hát', //(& = chữ f )alt + n ,enter
        submenu: [{
                label: 'new ',
                accelerator: 'ctrl+N', //thêm phím tắt
                click: (mi) => {
                    mi.visible = false;
                } //new cái là ko new đc nữa mất nút new
            },
            {
                label: 'load ',
                accelerator: 'ctrl+L',
                type: 'radio',
                click: (mi) => {
                    mi.enabled = false;
                } //click xong bị mờ ko click đc nữa 
                //nút tròn radio
            },
            {
                label: 'save ',
                accelerator: 'ctrl+S', //thêm phím tắt
                type: 'checkbox',
                checked: true,
                click: (mi) => {
                    if (mi.checked)
                        console.log('đang lưu bài hát');
                    else
                        console.log('đã bỏ tự động lưu');
                } // kích vào có dấu tích// click dấu tích
            },
            {
                type: 'separator' // xọc ngang
            },
            {
                label: 'exit app',
                accelerator: 'ctrl+E',
                click: () => {
                    app.quit()
                }
            }

        ]
    },
    //////////////////
    {
        label: 'chỉnh sửa',
        submenu: [{
                label: 'save edit'
            },
            {
                label: 'exit edit'
            }
        ]
    },
    ////////
    {
        label: '&exit all app',
        accelerator: 'ctrl+E',
        click: () => {
            app.quit()
        } //thoát app
    },
    {
        label: '&Thao Tác',
        submenu: [{
            role: 'copy'
        }, {
            role: 'paste'
        }, {
            role: 'selectall'
        }] //các phím tắt có sãn 
    }
]