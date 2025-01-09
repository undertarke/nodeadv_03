'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function detail(props) {

    const { uid } = props.params;
    const { number } = props.searchParams;

    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://apistore.cybersoft.edu.vn/api/Product/getbyid?id=${uid}`).then(res => {

            setProduct(res.data.content)
        })
    }, [uid])

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <div className="max-w-sm mx-auto">
                {/* Product Card */}
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <img src={product?.image} alt="Product Image" className="w-full h-48 object-cover" />
                    {/* Content Section */}
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800">{product?.name}</h3>
                        <p className="text-gray-600 mt-2">Mô tả ngắn gọn về sản phẩm này để thu hút người mua.</p>
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-xl font-semibold text-green-500">{product?.price}</span>

                        </div>
                    </div>
                </div>
            </div>

            <br />

        </div>
    )
}

export default detail