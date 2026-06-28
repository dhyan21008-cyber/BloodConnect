import { Circles } from "react-loader-spinner";

function Loader() {
return (
<div className="flex justify-center items-center h-screen">
<Circles
height="80"
width="80"
color="#dc2626"
ariaLabel="loading"
/>
</div>
);
}

export default Loader;