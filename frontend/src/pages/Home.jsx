// eslint-disable-next-line no-unused-vars
import React from 'react'
import CategoryProduct from '../components/CategoryProductList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/horizontalCardProduct'
import VerticalCardProduct from '../components/verticalCardProduct'

export default function Home() {
  return (
    <div>
      <CategoryProduct/>
      <BannerProduct/>
      <HorizontalCardProduct category={"earphones"} heading={"Top's Ears Phone"}/>
      <HorizontalCardProduct category={"airpodes"} heading={"Populars Airpordes"}/>

      <VerticalCardProduct  category={"camera"} heading={"Populars Camera"}/>

      <HorizontalCardProduct category={"watches"} heading={"Populars Watch"}/>
      <HorizontalCardProduct category={"speakers"} heading={"Most demanding Speakers"}/>

      <VerticalCardProduct  category={"mouses"} heading={"Best Mouses"}/>

      <HorizontalCardProduct category={"mobiles"} heading={"Top Selling Phone"}/>
      <HorizontalCardProduct category={"televisions"} heading={"Populars Telivisions"}/>

      <VerticalCardProduct  category={"refrigerator"} heading={"Top's Refrigerator"}/>

      <HorizontalCardProduct category={"processor"} heading={"Populars Processor"}/>
      <HorizontalCardProduct category={"printers"} heading={"Best Printers"}/>

      <VerticalCardProduct  category={"trimmers"} heading={"Top's Trimmers"}/>



    </div>
  )
}
