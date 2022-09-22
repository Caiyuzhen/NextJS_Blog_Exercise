import BlogCard from './blogCard'


//👇注意，需要接收父组件的 posts 变量
export default function BlogContainer({posts}) {
	return(
		<div className="blog-header-container">
			{/* ⚡️遍历 posts 对象中的内容 */}
			{posts.map((post)=>{
				return(	
					// ⚡️记得填写 key！
					<BlogCard post={post} key={post.id}/>
				);
			})}
		</div>
	)
}