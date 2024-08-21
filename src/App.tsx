// import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

// import Loading from "../src/components/Loading";
import Products from "./components/Products";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";

function App() {


  return (
    < >
   <div className="dark:bg-[#19191a] bg-white text-black dark:text-white">

    <SideBar/>
    <Hero/>
    <Products/>
    <Footer/>
   </div>

</>
  )
}

export default App
