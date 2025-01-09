
'use client'
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [lstProduct, setLstProduct] = useState([]);
  const router = useRouter()
  useEffect(() => {
    axios.get("https://apistore.cybersoft.edu.vn/api/Product").then(res => {

      setLstProduct(res.data.content)
    })
  }, [])

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      {lstProduct.map(item => {
        return <div className="max-w-sm mx-auto">
          {/* Product Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Image Section */}
            <img src={item.image} alt="Product Image" className="w-full h-48 object-cover" />
            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-gray-600 mt-2">Mô tả ngắn gọn về sản phẩm này để thu hút người mua.</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xl font-semibold text-green-500">{item.price}</span>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 transition duration-300" onClick={() => {
                  router.push(`/detail/${item.id}`)
                }}>
                  chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>

      })}

    </div>
  );
}
