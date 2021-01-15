import Product from "../schemas/Product.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

const imageUpload = upload.fields([
    { name: 'main_image' },
    { name: 'detail_image' }
  ])

const regist = async (req, res) => {
    console.log("req.body=",req.body)
    try {
        const { pro_name, price, stock, main_category, sub_category, description, colors, sizes } = req.body
        const main_img = req.files['main_image'][0]
        const detail_img = req.files['detail_image']
        const main_imgUrl = main_img.filename
        const detail_imgUrls = []
        detail_img.forEach(file => {
            detail_imgUrls.push(file.filename)
        })
        const newProduct = await new Product({
            pro_name, price, stock, main_category, sub_category, description, main_imgUrl, detail_imgUrls, colors, sizes
        }).save()
        res.json(newProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send('제품 정보 등록에 실패하였습니다. 다시 진행해 주십시오.')
    }
}

const getToHome = async (res, req) => {
    try {
        const bestProduct = await Product.find({}).sort({ purchase: 1 }).limit(6)
        const newProduct = await Product.find({}).sort({ createdAt: -1 }).limit(6)
        console.log("best=",bestProduct)
        console.log("new=",newProduct)
        res.json(bestProduct, newProduct)
    } catch {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

const getlist=(req,res)=>{
    try {
        res.json(req.productslist)
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}


const categoryId = async (req, res, next, category) => {
    try {
        const productslist = await Product.find({main_category: category})
        if (!productslist) {
            res.status(404).send('상품을 찾을 수 없습니다.')
        }
        req.productslist = productslist
        next()
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

const subgetlist=(req,res)=>{
    try{
        res.json(req.subproductslist)
    }catch(error){
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}
const subcategoryId = async (req, res, next, subcategory) => {
    try {
        const subproductslist = await Product.find({sub_category:subcategory})
        if (!subproductslist) {
            res.status(404).send('상품을 찾을 수 없습니다.')
        }
        req.subproductslist = subproductslist
        next()
    } catch (error) {
        res.status(500).send('상품을 불러오지 못했습니다.')
    }
}

export default { imageUpload, regist, categoryId, getlist, subcategoryId, subgetlist }
