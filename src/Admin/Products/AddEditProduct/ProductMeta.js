import React from 'react'

export default function ProductMeta(props) {
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="card border-light">
                    <div className="card-body">

                        <h4 className="card-title mb-3">Meta Data</h4>

                        <form>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="metatitle">Meta title</label>
                                        <input defaultValue={props.product && props.product.metatitle} id="metatitle" name="metatitle" type="text" className="form-control" onChange={props.setFields} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="metakeywords">Meta Keywords</label>
                                        <input defaultValue={props.product && props.product.metakeywords} id="metakeywords" name="metakeywords" type="text" className="form-control" onChange={props.setFields} />
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="metadescription">Meta Description</label>
                                        <textarea defaultValue={props.product && props.product.metadescription} className="form-control" name="metadescription" rows="5" onChange={props.setFields} ></textarea>
                                    </div>
                                </div>
                            </div>


                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
