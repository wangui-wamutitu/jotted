import { useState } from "react"
import { BiLike, BiSolidLike } from "react-icons/bi"

const Likes = ({likes}: {likes: number}) => {
    const [isLiked, setIsLiked] = useState(false)


    function toggleLike(){
        setIsLiked(!isLiked)
        //on press add or remove like and send to backend for saving/updating
    }
  return (
      <button onClick={toggleLike} className={'w-full flex items-center justify-start my-3'}>
        {isLiked ? <BiSolidLike size={18} color={'red'}/> : <BiLike size={18}/>}
        <span className={'font-extralight text-sm ml-2'}>{isLiked ? likes + 1 : likes} likes</span>
    </button>
  )
}

export default Likes