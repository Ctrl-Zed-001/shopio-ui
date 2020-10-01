import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../Components/Breadcrumb'
import Wrapper from '../../Wrapper'
import BasicDetails from './BasicDetails'
import ProductMedia from './ProductMedia'
import ProductMeta from './ProductMeta'
import ProductDimensions from './ProductDimensions'
import ProductStock from './ProductStock'
// import ProductVariations from './ProductVariations'
import { connect } from "react-redux"
import Axios from 'axios'
import { apiurl } from '../../../Globals'
import { getAllBrands, getAllCategories, addNewProduct } from "../../../Redux/Actions/ProductActions"
import { getAllVendors } from "../../../Redux/Actions/VendorActions"
import { useHistory } from "react-router-dom"


function AddProduct(props) {
    let allbrands = [];
    let allcategories = [];
    let allVendors = [];
    const [form, setForm] = useState({
        additionalurls: [],
        additionalpreview: [],
        lowstock: 2,
        cost: 0,
        price: 0,
        maxquantity: 0,
        shortdescription: "",
        longdescription: "",
        video: "",
        weight: 0,
        height: 0,
        length: 0,
        width: 0,
        minquantity: 1,
        metatitle: "",
        metakeywords: "",
        metadescription: ""
    })

    const history = useHistory()


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

        allVendors = [
            ...allVendors,
            { value: vendor.name, label: vendor.name }
        ]
    })

    const setFields = (e) => {
        setForm({
            ...form,
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
                profit = e.target.value - form.cost;
                margin = ((profit / e.target.value) * 100).toFixed(2);
            }
        } else {
            if (form.price === "" || form.price === "0") {
                profit = 0;
                margin = 0;
            } else {
                profit = form.price - e.target.value;
                margin = ((profit / form.price) * 100).toFixed()
            }
        }
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            profit: profit,
            margin: margin
        })

    }

    const setBrand = (e) => {
        setForm({
            ...form,
            brand: e.value
        })
    }

    const setVendor = (e) => {
        setForm({
            ...form,
            vendor: e.value
        })
    }

    const setCategories = (e) => {
        let categoriesArray = e.map(category => {
            return category.value
        })
        setForm({
            ...form,
            categories: categoriesArray
        })
    }

    const setDisplayUrl = (e) => {
        setForm({
            ...form,
            displayurl: e.target.files[0],
            singlepreview: URL.createObjectURL(e.target.files[0])
        })
    }

    const removeDisplayUrl = () => {
        setForm({
            ...form,
            displayurl: "",
            singlepreview: ""
        })
    }

    const setMultipleImages = (e) => {
        if (e.target.files[0] !== undefined) {
            let imagesArray = [
                ...form.additionalurls,
                e.target.files[0]
            ]
            let previewArray = [
                ...form.additionalpreview,
                URL.createObjectURL(e.target.files[0])
            ]
            setForm({
                ...form,
                additionalurls: imagesArray,
                additionalpreview: previewArray
            })
        }
    }

    const removeOne = (item) => {
        let deletedImage = form.additionalurls.splice(form.additionalpreview.indexOf(item), 1)
        let newImages = form.additionalurls.filter(images => images !== deletedImage)
        let newPreview = form.additionalpreview.filter(elements => elements !== item)
        setForm({
            ...form,
            additionalurls: newImages,
            additionalpreview: newPreview
        })
    }


    const handleSubmit = (status) => {
        setForm({
            ...form,
            published: status
        })
    }

    useEffect(
        () => {
            if (form.published !== undefined) {
                const data = new FormData()
                data.append('sku', form.sku);
                data.append('name', form.name);
                data.append('brand', form.brand);
                data.append('mrp', form.mrp);
                data.append('price', form.price);
                data.append('cost', form.cost);
                data.append('profit', form.profit);
                data.append('margin', form.margin);
                form.categories.map(item => {
                    data.append('category', item)
                })
                data.append('vendor', form.vendor);
                data.append('shortdescription', form.shortdescription);
                data.append('longdescription', form.longdescription);
                data.append('displayurl', form.displayurl);
                form.additionalurls.map((item) => {
                    data.append('additionalurls', item);
                })
                data.append('video', form.video);
                data.append('weight', form.weight);
                data.append('height', form.height);
                data.append('length', form.length);
                data.append('width', form.width);
                data.append('barcode', form.barcode);
                data.append('stock', form.stock);
                data.append('lowstock', form.lowstock);
                data.append('minquantity', form.minquantity);
                data.append('maxquantity', form.maxquantity);
                data.append('metatitle', form.metatitle);
                data.append('metakeywords', form.metakeywords);
                data.append('metadescription', form.metadescription);
                data.append('published', form.published)
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                Axios.post(`${apiurl}/products/addnew`, data, config)
                    .then(res => {
                        history.push("/admin/product/all")
                    }

                    )
                    .catch(err => console.log(err.response.data))
            }

        },
        [form.published]
    )

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumb title="Add Product" parent="Product" subtitle="Add" />
                    <BasicDetails allbrands={allbrands} allcategories={allcategories} allVendors={allVendors} setCost={setCost} setFields={setFields} setBrand={setBrand} setVendor={setVendor} setCategories={setCategories} profit={form.profit} margin={form.margin} />

                    <ProductMedia product={form} setDisplayUrl={setDisplayUrl} removeDisplayUrl={removeDisplayUrl} setMultipleImages={setMultipleImages} removeOne={removeOne} setFields={setFields} />

                    <div className="row mb-4">
                        <div className="col-md-6">
                            <ProductDimensions setFields={setFields} />
                        </div>
                        <div className="col-md-6">
                            <ProductStock setFields={setFields} />
                        </div>
                    </div>

                    <ProductMeta setFields={setFields} />

                    <div className="row mt-4">
                        <div className="col text-right">
                            <button onClick={() => handleSubmit(false)} className="btn btn-light btn-sm mr-3 waves-effect waves-light">Save to Draft</button>
                            <button onClick={() => handleSubmit(true)} className="btn btn-custom btn-sm waves-effect waves-light">Save & Publish</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        brands: state.products.brands,
        categories: state.products.categories,
        vendors: state.vendors.allVendors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBrands: dispatch(getAllBrands()),
        getAllCategories: dispatch(getAllCategories()),
        getAllVendors: dispatch(getAllVendors()),
        addNewProduct: (product) => dispatch(addNewProduct(product))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(AddProduct))