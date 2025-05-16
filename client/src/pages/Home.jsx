import React from "react";
import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSelling from "../components/BestSelling";
import Bottombanner from "../components/Bottombanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories />
      <BestSelling />
      <Bottombanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
