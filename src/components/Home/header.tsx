import "@/styles/header-text.css"

export default function Header() {
  return (
    <div className="flex justify-center items-center w-full mt-72">
      <div className="text-center">
        <div className="main-text text-8xl">
          <p><span className="mind-word text-9xl">Minds</span> unchained,</p>
          <div><div className="inline-block align-top"><p className="code-word inline-block">code</p></div> unrestrained</div>
        </div>
        <div className="main-text">
          <p>
            Where Collaborative Coding Meets Effortless Harmony - a sleek,
            minimalist environment that unleashes the power of collective
            ingenuity.
          </p>
        </div>
      </div>
    </div>
  );
}
