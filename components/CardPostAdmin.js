import ButtonPostDelete from "./ButtonPostDelete";

const CardPostAdmin = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-start">
      <div className="bg-base-100 p6 rounded-3xl">
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </div>
      </div>
      <ButtonPostDelete postId={post._id.toString()} />
    </li>
  );
};

export default CardPostAdmin;
