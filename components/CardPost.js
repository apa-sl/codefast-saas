import ButtonVote from "./ButtonVote";

const CardPost = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-start">
      <div>
        <div className="font-bold text-lg mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxted max-h-32 overflow-scroll">
          {post.description}
        </div>
      </div>
      <ButtonVote
        postId={post._id.toString()}
        initialVotesCounter={post.votesCounter}
      />
    </li>
  );
};

export default CardPost;
