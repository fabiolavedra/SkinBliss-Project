import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderThree from "@/layout/headers/header-3";
import BeautyBanner from "@/components/banner/beauty-banner";
import BeautyCategory from "@/components/categories/beauty-category";
import ProductArea from "@/components/products/beauty/product-area";
import ProductAreaTwo from "@/components/products/beauty/product-area-2";
import BeautyTestimonial from "@/components/testimonial/beauty-testimonial";
import FeatureAreaTwo from "@/components/features/feature-area-2";
import Footer from "@/layout/footers/footer";

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <HeaderThree />
      <BeautyBanner />
      <BeautyCategory />
      <ProductArea />
      {/* <BeautyOfferBanner /> */}
      <ProductAreaTwo />
      <BeautyTestimonial />
      <FeatureAreaTwo />
      <Footer style_3={true} />
    </Wrapper>
  );
}
