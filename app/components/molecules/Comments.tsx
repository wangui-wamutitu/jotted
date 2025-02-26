import { TComment } from 'globals'
import Comment from '../atoms/Comment'
import WriteCommentForm from '../atoms/WriteCommentForm'
import { useUserStore } from '~/stores/userDetailsStore';

const Comments = ({comments}: {comments: TComment[]}) => {
  const username = useUserStore((state) => state.username);

  return (
    <div className={'w-full'}>
        {username ? <WriteCommentForm /> : null}
        <p className={'my-2 font-extralight text-sm'}>{comments?.length === 1 ? '1 comment' : `${comments?.length} comments`}</p>
        {comments?.map(comment => <Comment comment={comment}/>)}
    </div>
  )
}

export default Comments