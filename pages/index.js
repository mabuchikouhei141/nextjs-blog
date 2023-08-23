import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData();//id,title,desc,thumbnail
  console.log(allPostsData);

return {
  props:{
    allPostsData,
  },
};
}
//SSRの場合
/* export async function getServerSideProps(context){
  

return {
  props:{
    //コンポーネントに渡すためのプロップス
  },
};
} */

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          日進月歩のAI様の観察日記。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>
          📝生成AIプロンプト日記
        </h2>
          <div className={styles.grid}>
          {allPostsData.map(({id,title,date,thumbnail}) =>(
          <article key={id}>
            <Link href={`/posts/${id}`}><img src={`${thumbnail}`} className={styles.thumbnailImage}/></Link>
            <Link href={`/posts/${id}`}><t className={utilStyles.boldText}>{title}</t></Link><br />
            <small className={utilStyles.lightText}>{date}</small>
          </article>
        ))}
        
      </div>
      </section>
      
    </Layout>
  );
}
