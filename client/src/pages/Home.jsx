import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Mission from '../components/Mission'
import BlogList from '../components/BlogList'
import QuoteSection from '../components/QuoteSection'
import FeaturedAuthors from '../components/FeaturedAuthors'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
        <Navbar></Navbar>
        <Header></Header>
        <Mission></Mission>
        <QuoteSection></QuoteSection>
        <BlogList></BlogList>
        <FeaturedAuthors></FeaturedAuthors>
        <NewsLetter></NewsLetter>
        <Footer></Footer>
    </>
  )
}

export default Home