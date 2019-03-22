import { devHost as host } from '../http/config'

const unloadImg = (maxcount,counts,type) => {

            if(counts<maxcount){
                wx.chooseImage({
                    count: maxcount-counts,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success(res) {
                        var uploadImgCount = 0;
                        for (var i = 0,length = res.tempFilePaths.length; i < length; i++) {
                        wx.uploadFile({
                            url: `${host}/upload/image`, 
                            filePath: res.tempFilePaths[0],
                            name: 'file',
                            header:{
                                'Authorization':store.state.token,
                            },
                            formData:{
                                'type': type
                            },
                            success: (res) => {
                                console.log(res)
                                uploadImgCount++;
                                var result = JSON.parse(res.data)
                                if(result.code == 0){
                                    if (uploadImgCount == length) {  
                                        wx.showToast({
                                            title: '图片上传成功',
                                            icon: 'success',
                                            duration: 2000
                                        })
                                        return result.data;
                                    }
                                }else{
                                    wx.showToast({
                                        title: '上传图片失败',
                                        icon: 'none',
                                        duration: 2000
                                    }) 
                                }
                                
                            },
                        })
                        }
                    }
                 })
            }else{
                wx.showToast({
                    title: `限制只能上传${maxcount}张图片!`,
                    icon: 'none',
                    duration: 2000
                })
            }
}
export default uploadImg
