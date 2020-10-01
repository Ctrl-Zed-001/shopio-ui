import React from 'react'

export default function ProductMedia(props) {

    const fileClick = (input) => {
        document.querySelector(`#${input}`).click()
    }


    return (
        <div className="row mb-4">
            <div className="col-md-4">
                <div className="card border-light">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Display Image</h4>

                        <div className="dropzone text-center">
                            {!props.product.singlepreview ?
                                <>
                                    <input type="file" className="form-control d-none" name="displayurl" id="displayurl" onChange={props.setDisplayUrl} />
                                    <div className="dz-message needsclick">
                                        <div className="mb-3">
                                            <i className="display-4 bx bx-image-alt pointer" onClick={() => fileClick("displayurl")}></i>
                                        </div>
                                        <h6>click to upload display image.</h6>
                                    </div>
                                </> :
                                <div className="placeholder">
                                    <img alt="product display preview" className="img-fluid" src={props.product.singlepreview} />
                                    <span onClick={props.removeDisplayUrl} className="badge bg-danger remove-product">X</span>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-light">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Additional Images</h4>

                        <div className="dropzone text-center">
                            <input type="file" name="additionalurls" className="form-control d-none" id="additionalurls" onChange={props.setMultipleImages} />
                            {props.product.additionalpreview.length === 0 ?
                                <>
                                    <div className="dz-message needsclick">
                                        <div className="mb-3">
                                            <i className="display-4 bx bx-image-add pointer" onClick={() => fileClick("additionalurls")}></i>
                                        </div>
                                        <h6>click to upload additional images.</h6>
                                    </div>
                                </> :
                                <>
                                    <div className="row mb-3">
                                        {
                                            props.product.additionalpreview.map(item => {
                                                return (
                                                    <div key={props.product.additionalpreview.indexOf(item)} className="col-4 placeholder">
                                                        <img alt="additional preview" className="img-fluid" src={item} />
                                                        <span onClick={() => props.removeOne(item)} className="badge bg-danger remove-product">X</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <br />
                                    <button className="btn btn-light text-center" onClick={() => fileClick("additionalurls")} >Add More</button>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-md-4">
                <div className="card border-light">
                    <div className="card-body">
                        <h4 className="card-title mb-3">Product Video</h4>
                        <div className="dropzone text-center border-transparent">
                            <div className="dz-message needsclick">
                                <div className="mb-3">
                                    <i className="display-4 bx bxs-videos pointer"></i>
                                </div>
                                <h6>Add product video link.</h6>
                            </div>
                            <input defaultValue={props.product && props.product.video} type="text" id="video" name="video" className="form-control mt-3" placeholder="Paste video link here" onChange={props.setFields} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
