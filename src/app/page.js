import Image from "next/image";
import styles from "./page.module.css";
import FacebookLogin from "./component/FacebookLogin";

export default function Home() {
  return (
   <>
   <main>
    <h1> Welocome to my site </h1>
    <FacebookLogin/>
   </main>
   </>
  );
}
