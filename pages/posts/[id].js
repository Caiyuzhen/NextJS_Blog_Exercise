import {GraphQLClient, gql} from 'graphql-request'
import Menu from '../components/menu'



const client = new GraphQLClient('https://api-ap-northeast-1.hygraph.com/v2/cl88xvy281qi801tafuguf6v4/master')

// 获取已有的博客 id
const IDLIST = gql`
{
	posts{
		id
	}
}
`

// 获取博客内容, 传入 id
const QUERY = gql`
query ($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      cover {
        url
      }
      content {
        html
      }
    }
  }
`


// 🌟使用 next.js 自带的 getStaticPaths() getStaticProps() 跟方法，来区分博客详情页
export async function getStaticPaths() {
	const { posts } = await client.request(IDLIST) //传入 ID 结果
	return {
	  paths: posts.map((post) => ({ params: { id: post.id } })),
	  fallback: false,
	};
  }



// 获取页面参数的 id 
export async function getStaticProps({ params }) {
	const data = await client.request(QUERY, { id: params.id });//传递页面参数
  
	return {
	  props: {
		post: data.post,//实际 return 的就是 post，拿到 post，把 post 作为 props，传递给👇的组件
	  },
	}
  }



//渲染博客详情页要展示的数据
export default function Post({post}){

	console.log('post',post)

	return(
		<div className="blog-wrapper">
			{/* 博客详情页 */}
			<div className="blog">
				<Menu />
				<div className="blog-content">
					<div className="title">{post.title}</div>

					<div className="blog-author">
					<img src={post.author.avatar.url} alt="" />
					<div>
						<div className="date">{post.datePublished}</div>
						<div>By {post.author.name}</div>
					</div>
					</div>

					{/* 获取 html 内容 */}
					<p dangerouslySetInnerHTML={{ __html: post.content.html }}></p>
					{/* <Editor content={'console.log("hello world")'} /> */}
				</div>
			</div>
		</div>
	)
}