import FeaturePage from "./FeaturePage";
import Footer from "./Footer";
import HeroPage from "./HeroPage";

const HomePage = () => {
  return (
    <div>
      <HeroPage />
      <hr className="my-10" />
      <FeaturePage />
      <Footer />
    </div>
  );
};

export default HomePage;
