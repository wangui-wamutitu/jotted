import { IBlog } from "globals"

const Blog = ({blog}: {blog: IBlog}) => {
    
  return (
    <section key={blog?.id}>
        <div className={'w-full flex justify-between items-end my-10'}>
            <p className="font-bold text-xl hover:underline">{blog?.title}</p>
            <p className="font-extralight text-xs">{blog?.createdAt.toLocaleDateString()}</p>
        </div>
        <p>{blog?.excerpt}</p>
        
        <p className={'my-4 px-2 py-1 border border-dark_pink text-center'}>{blog?.topicName}</p> 

    </section>
  )
}

export default Blog