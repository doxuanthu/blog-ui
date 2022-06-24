import Blogs from "../../components/Blogs";
import Header from "../..//components/Header";

function Home() {
  return (
    <div className="container">
      <Header disabled={true} />
      <Blogs />
    </div>
  );
}

export default Home;
