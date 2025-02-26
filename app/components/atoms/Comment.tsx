import { TComment } from "globals";
import { getInitials, getTimeAgo } from "~/util";
import Likes from "./Likes";
import { useUserStore } from "~/stores/userDetailsStore";

const Comment = ({ comment }: { comment: TComment }) => {
  const username = useUserStore((state) => state.username);

  return (
    <div className={'text-sm'}>
      <div className="w-full mb-2 flex justify-between items-center">
        <div className={"flex items-center"}>
          <div
            className={
              "w-8 h-8 flex justify-center items-center border border-dark_pink rounded-full mr-2"
            }
          >
            {getInitials(comment?.user?.name ?? "")}
          </div>
          <p>{comment?.user?.name ?? "Anonymous"} </p>
        </div>
        <p>{getTimeAgo(comment?.createdAt.toLocaleDateString())}</p>
      </div>
      <p>{comment?.comment}</p>
      <div className={"flex justify-between items-center mb-2"}>
        <Likes likes={comment?.likes} />
        {username ? <button className={"text-sm font-extralight"}>Reply</button> : null}
      </div>
      <div className={"pl-4 border-l border-l-dark_pink"}>
        {comment?.replies
          ? comment?.replies?.map((reply) => <Reply reply={reply} />)
          : null}
      </div>
    </div>
  );
};

export default Comment;

function Reply({ reply }: { reply: TComment }) {
  return <Comment comment={reply} />;
}
