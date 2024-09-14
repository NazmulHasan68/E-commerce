
const url = `https://api.cloudinary.com/v1_1/dpn0fjl8h/image/upload`

const uploadImage = async(image)=>{
    const fromData = new FormData()
    fromData.append("file",image)
    fromData.append("upload_preset","mern_product")
    const detaResponse = await fetch(url,{
        method : "post",
        body : fromData
    })
    return detaResponse.json()
}
export default uploadImage
