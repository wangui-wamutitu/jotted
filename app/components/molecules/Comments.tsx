import { TComment } from 'globals'
import Comment from '../atoms/Comment'
import WriteCommentForm from '../atoms/WriteCommentForm'

const Comments = ({comments}: {comments: TComment[]}) => {

  return (
    <div className={'w-full'}>
        <p className={'my-2 font-extralight text-xs'}>{comments?.length === 1 ? '1 comment' : `${comments?.length} comments`}</p>
        <WriteCommentForm />
        {comments?.map(comment => <Comment comment={comment}/>)}
    </div>
  )
}

export default Comments