import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import Wrapper from '../../Wrapper'
import BasicDetails from './BasicDetails'
import ProductMedia from './ProductMedia'
import ProductDimensions from "./ProductDimensions"
import ProductStock from "./ProductStock"
import ProductMeta from "./ProductMeta"
import Axios from 'axios'
import { useHistory, useParams } from "react-router-dom"
import { apiurl } from "../../../Globals"
import { connect } from "react-redux"
import { getAllCategories, getAllBrands } from '../../../Redux/Actions/ProductActions'
import { getAllVendors } from "../../../Redux/Actions/VendorActions"

function EditProduct(props) {
    let allbrands = [];
    let allcategories = [];
    let allvendors = [];

    const history = useHistory()

    const [selectedProduct, setSelectedProduct] = useState({
        additionalurls: [],
        additionalpreview: [],
        singlepreview: "",
        dimensions: {},
    })

    const { id } = useParams()

    useEffect(
        () => {
            Axios.get(`${apiurl}/products/${id}`)
                .then(res => {
                    setSelectedProduct({
                        ...res.data,
                        singlepreview: res.data.displayurl,
                        additionalpreview: res.data.additionalurls,
                        defaultcategories: res.data.category.toString()
                    })
                })
                .catch(err => console.log(err.response))
        }, []
    )

    useEffect(
        () => {
            if (props.brands.length == 0) {
                props.getAllBrands();
            }
            if (props.categories.length == 0) {
                props.getAllCategories()
            }
            if (props.vendors.length == 0) {
                props.getAllVendors()
            }
        }
    )

    props.brands.map(brand => {
        allbrands = [
            ...allbrands,
            { label: brand.name, value: brand.name }
        ]
    })
    props.categories.map(category => {
        allcategories = [
            ...allcategories,
            { value: category.name, label: category.name }
        ]
    })
    props.vendors.map(vendor => {

        allvendors = [
            ...allvendors,
            { value: vendor.name, label: vendor.name }
        ]
    })

    const setFields = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            [e.target.name]: e.target.value
        })
    }

    const setCost = (e) => {
        let margin = 0;
        let profit = 0;
        if (e.target.name === "price") {
            if (e.target.value === "" || e.target.value === "0") {
                profit = 0; margin = 0;
            } else {
                profit = e.target.value - selectedProduct.cost;
                margin = ((profit / e.target.value) * 100).toFixed(2);
            }
        } else {
            if (selectedProduct.price === "" || selectedProduct.price === "0") {
                profit = 0;
                margin = 0;
            } else {
                profit = selectedProduct.price - e.target.value;
                margin = ((profit / selectedProduct.price) * 100).toFixed()
            }
        }
        setSelectedProduct({
            ...selectedProduct,
            [e.target.name]: e.target.value,
            profit: profit,
            margin: margin
        })

    }

    const setBrand = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            brand: e.value
        })
    }

    const setVendor = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            vendor: e.value
        })
    }

    const setCategories = (e) => {
        let categoriesArray = e.map(category => {
            return category.value
        })
        setSelectedProduct({
            ...selectedProduct,
            category: categoriesArray
        })
    }

    const setDisplayUrl = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            displayurl: e.target.files[0],
            singlepreview: URL.createObjectURL(e.target.files[0])
        })
    }

    const removeDisplayUrl = () => {
        setSelectedProduct({
            ...selectedProduct,
            displayurl: "",
            singlepreview: ""
        })
    }

    const setMultipleImages = (e) => {
        if (e.target.files[0] !== undefined) {
            let imagesArray = [
                ...selectedProduct.additionalurls,
                e.target.files[0]
            ]
            let previewArray = [
                ...selectedProduct.additionalpreview,
                URL.createObjectURL(e.target.files[0])
            ]
            setSelectedProduct({
                ...selectedProduct,
                additionalurls: imagesArray,
                additionalpreview: previewArray
            })
        }
    }

    const removeOne = (item) => {
        let deletedImage = selectedProduct.additionalurls.splice(selectedProduct.additionalpreview.indexOf(item), 1)
        let newImages = selectedProduct.additionalurls.filter(images => images !== deletedImage)
        let newPreview = selectedProduct.additionalpreview.filter(elements => elements !== item)
        setSelectedProduct({
            ...selectedProduct,
            additionalurls: newImages,
            additionalpreview: newPreview
        })
    }

    const handleSubmit = () => {
        const data = new FormData()
        data.append('id', selectedProduct._id)
        data.append('sku', selectedProduct.sku);
        data.append('name', selectedProduct.name);
        data.append('brand', selectedProduct.brand);
        data.append('mrp', selectedProduct.mrp);
        data.append('price', selectedProduct.price);
        data.append('cost', selectedProduct.cost);
        data.append('profit', selectedProduct.profit);
        data.append('margin', selectedProduct.margin);
        selectedProduct.category.map(item => {
            data.append('category', item)
        })
        data.append('vendor', selectedProduct.vendor);
        data.append('shortdescription', selectedProduct.shortdescription);
        data.append('longdescription', selectedProduct.longdescription);
        data.append('displayurl', selectedProduct.displayurl);
        selectedProduct.additionalurls.map((item) => {
            data.append('additionalurls', item);
        })
        data.append('video', selectedProduct.video);

        selectedProduct.weight ? data.append('weight', selectedProduct.weight) : data.append('weight', selectedProduct.dimensions.weight)
        selectedProduct.height ? data.append('height', selectedProduct.height) : data.append('height', selectedProduct.dimensions.height)
        selectedProduct.length ? data.append('length', selectedProduct.length) : data.append('length', selectedProduct.dimensions.length)
        selectedProduct.width ? data.append('width', selectedProduct.width) : data.append('width', selectedProduct.dimensions.width)

        data.append('barcode', selectedProduct.barcode);
        data.append('stock', selectedProduct.stock);
        data.append('lowstock', selectedProduct.lowstock);
        data.append('minquantity', selectedProduct.minquantity);
        data.append('maxquantity', selectedProduct.maxquantity);
        data.append('metatitle', selectedProduct.metatitle);
        data.append('metakeywords', selectedProduct.metakeywords);
        data.append('metadescription', selectedProduct.metadescription);
        selectedProduct.published ? data.append('published', selectedProduct.published) : data.append('published', false)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        Axios.post(`${apiurl}/products/edit`, data, config)
            .then(res => {
                console.log(res.data)
                history.push(`/admin/product/single/${selectedProduct._id}`)
            }
            )
            .catch(err => console.log(err.response.data))
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="Edit Product" parent="Product" subtitle="Edit" />

                    <BasicDetails product={selectedProduct} setBrand={setBrand} setVendor={setVendor} setCategories={setCategories} setCost={setCost} setFields={setFields} allbrands={allbrands} allcategories={allcategories} allVendors={allvendors} />
                    <ProductMedia product={selectedProduct} setDisplayUrl={setDisplayUrl} removeDisplayUrl={removeDisplayUrl} setMultipleImages={setMultipleImages} removeOne={removeOne} setFields={setFields} />
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <ProductDimensions product={selectedProduct} setFields={setFields} />
                        </div>
                        <div className="col-md-6">
                            <ProductStock product={selectedProduct} setFields={setFields} />
                        </div>
                    </div>
                    <ProductMeta product={selectedProduct} setFields={setFields} />
                    <div className="row mt-4">
                        <div className="col text-right">
                            <button onClick={handleSubmit} className="btn btn-custom btn-sm waves-effect waves-light">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.products.categories,
        brands: state.products.brands,
        vendors: state.vendors.allVendors,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        getAllBrands: () => dispatch(getAllBrands()),
        getAllVendors: () => dispatch(getAllVendors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(EditProduct))