import BlogCard from './blogCard'


//ðæ³¨æï¼éè¦æ¥æ¶ç¶ç»ä»¶ç posts åé
export default function BlogContainer({posts}) {
	return(
		<div className="blog-header-container">
			{/* â¡ï¸éå posts å¯¹è±¡ä¸­çåå®¹ */}
			{posts.map((post)=>{
				return(	
					// â¡ï¸è®°å¾å¡«å keyï¼
					<BlogCard post={post} key={post.id}/>
				);
			})}
		</div>
	)
}