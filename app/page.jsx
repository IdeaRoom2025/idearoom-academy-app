import Blog from "./_components/Blog";
import Courses from "./_components/Courses";
import Feedback from "./_components/Feedback";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Information from "./_components/Information";

export default function Home() {
  return (
    <section>
      <Header />
      <Hero />
      <Courses />
      <Information />
      <Blog />
      <Feedback />
      <Footer />
    </section>
  );
}
