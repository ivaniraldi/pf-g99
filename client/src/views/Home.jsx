import React, { useContext } from 'react'
import Hero from '../components/Hero'
import HomeResume from '../components/HomeResume'
import About from '../components/About'
import { ProductContext } from '../context/ProductContext'
import CTA from '../components/CTA'

export default function Home() {
    const { products } = useContext(ProductContext)
    console.log(products)
  return (
    <>
      <Hero></Hero>  
      <HomeResume products={products}></HomeResume>
      <About></About>
      <CTA></CTA>
    </>
  )
}
