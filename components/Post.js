import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../firebase";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

function Post({ id, username, userImg, img, caption }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);
  console.log(`hasLiked`, hasLiked);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), async (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        async (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );

  const updateComments = async (e) => {
    e.preventDefault();

    const tempComment = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: tempComment,
      timestamp: serverTimestamp(),
      userImg: session.user.image,
      username: session.user.username,
    });
  };

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <div className="bg-white border my-4">
      <div className="flex items-center p-5">
        <img
          src={userImg}
          className="h-12 w-12 border object-contain mr-3 p-2 rounded-full"
          alt=""
        />
        <p className="flex-1 font-bold">{username}</p>
        <DotsHorizontalIcon className="h-5" />
      </div>

      <img src={img} className="object-cover w-full" alt="" />

      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                className="btn text-red-600"
                onClick={likePost}
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn" />
            )}
            <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn" />
          </div>
          <BookmarkIcon className="btn" />
        </div>
      )}

      <p className="truncate p-5">
        <span className="font-bold mr-1">{username} </span>
        {caption}
      </p>

      {comments.length > 0 && (
        <div className="overflow-y-scroll scrollbar-thumb-black scrollbar-thin ml-10 h-20">
          {comments.map((comment) => (
            <div className="flex space-x-2 mb-3 items-center" key={comment.id}>
              <img
                className="rounded-full h-7"
                src={comment.data().userImg}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username}</span>{" "}
                {comment.data().comment}
              </p>
              <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form onSubmit={updateComments} className="flex items-center p-4">
          <EmojiHappyIcon className="h-7" />
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border-none outline-none focus:ring-0"
          />
          <button type="submit" className="font-semibold text-blue-400">
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
